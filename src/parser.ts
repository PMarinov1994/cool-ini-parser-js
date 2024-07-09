import { State, Section, SectionEntry, Configuration } from "./types"


const SYMBOL_SECTION_START = '[';
const SYMBOL_SECTION_END = ']';
const SYMBOL_KEY_VALUE_SEPARATOR = ['=', ':'];
const SYMBOL_COMMENT = [';', '#'];

const TAB_TO_SPACE_SIZE = 2;
const MIN_VALUE_INDENTATION = 2;

const SECTION_NAME_INVALID_SYMBOLS = [
    '\n',
    '\r'
]


const INVALID_PARSE_END_STATE: State[] = [
    State.WAIT_KEY_END,
    State.WAIT_SECTION_END
]

export const parseInitFromString = (content: string): Configuration => {

    const sections = _parseInitFromString(content);

    return { sections: sections };
}

const _parseInitFromString = (content: string): Section[] => {

    const sections: Section[] = [];

    let currState: State = State.NEW_LINE_START;

    let currSection: Section | undefined = undefined;
    let currSectionEntry: SectionEntry | undefined = undefined;

    let hasValueStarted = false; // Skip the spaces and tabs before the value
    let isWaitingForValue = false;

    let newLineIndentation = 0; // Whitespaces used to indent the keys or values
    let currKeyIndentation = 0;
    let currSectionIndentation = 0;

    for (let i = 0; i < content.length; i++) {

        let currChar = content[i];

        // While we are in a comment, we ignore any other symbols until we exit the comment parsing
        if (SYMBOL_COMMENT.includes(currChar)) {
            do {
                // Trap everything untill a new line (end of comment)
                // Once a new line is reached, pass it the parser
                currChar = content[++i];
            } while (currChar !== '\n' && i < content.length);

            // EOF reached after processing a comment. Break the loop.
            if (i >= content.length) {
                break;
            }
        }

        switch (currState as State) {
            case State.WAIT_SECTION_START: {
                if (currChar !== SYMBOL_SECTION_START)
                    throw new Error(`Error: Invalid section start symbol '${currChar}'!`);

                if (currSection !== undefined) {
                    if (currSectionEntry !== undefined) {
                        currSection.entries.push(currSectionEntry);
                        currSectionEntry = undefined;
                    }

                    currSection.endOffset = i - 1 - currSectionIndentation;
                    sections.push(currSection);
                    currSection = undefined;
                }

                currSection = {
                    startOffset: i,
                    endOffset: -1,
                    entries: [],
                    name: "",
                };

                currState = State.WAIT_SECTION_END;
                break;
            }
            case State.WAIT_SECTION_END: {
                if (currSection === undefined)
                    throw new Error("WrongStateError");

                if (currChar === '\n') {
                    throw new Error(`Error: Section cannot be multiline`);
                }

                if (currChar === SYMBOL_SECTION_END) {
                    currSection.name = currSection.name.trim();
                    currState = State.WAIT_SECTION_END_NEWLINE;
                } else if (SECTION_NAME_INVALID_SYMBOLS.includes(currChar)) {
                    throw new Error(`Error: Section name cannot contain '${currChar}' symbol!`)
                }
                else {
                    currSection.name += currChar;
                }
                break;
            }
            case State.WAIT_SECTION_END_NEWLINE: {
                if (currChar === '\n') {
                    currState = State.NEW_LINE_START;
                } else if (!/\s/.test(currChar)) {
                    throw new Error("Error: After section end, no symbols are allowed")
                }
                break;
            }
            case State.WAIT_KEY_START: {
                if (currSection === undefined)
                    throw new Error("WrongStateError");

                if (currSectionEntry !== undefined) {
                    currSection.entries.push(currSectionEntry);
                    currSectionEntry = undefined;
                }

                hasValueStarted = false; // reset the value started flag
                currSectionEntry = {
                    keyStartOffset: i,
                    valueStartOffset: -1,
                    key: String(currChar),
                    value: "",
                };

                currState = State.WAIT_KEY_END;
                break;
            }
            case State.WAIT_KEY_END: {
                if (currSectionEntry === undefined)
                    throw new Error("WrongStateError");

                if (SYMBOL_KEY_VALUE_SEPARATOR.includes(currChar)) {
                    currSectionEntry.key = currSectionEntry.key.trimEnd();
                    currState = State.CONSUME_VALUE;

                } else if (currChar === '\n') {
                    currSectionEntry.key = currSectionEntry.key.trimEnd();
                    currState = State.NEW_LINE_START;

                } else {
                    currSectionEntry.key += currChar;
                }
                break;
            }
            case State.CONSUME_VALUE: {
                if (currSectionEntry === undefined)
                    throw new Error("WrongStateError");

                isWaitingForValue = true;

                // Ignore leading whitespaces
                if (!hasValueStarted && currChar !== ' ' && currChar !== '\t' && currChar !== '\n') {
                    currSectionEntry.valueStartOffset = i;
                    hasValueStarted = true;
                }

                if (hasValueStarted) {
                    currSectionEntry.value += currChar;
                }

                if (currChar === '\n') {
                    currState = State.NEW_LINE_START;
                }
                break;
            }
            case State.NEW_LINE_START: {
                // Count the indentation
                if (currChar === ' ' || currChar === '\t') {
                    newLineIndentation += currChar === ' ' ? 1 : TAB_TO_SPACE_SIZE;

                } else if (currChar === SYMBOL_SECTION_START) {
                    i--; // Rowback the current symbol

                    isWaitingForValue = false;
                    currSectionIndentation = newLineIndentation;
                    newLineIndentation = 0;
                    currState = State.WAIT_SECTION_START;

                } else if (isWaitingForValue && newLineIndentation > currKeyIndentation && /\S/.test(currChar)) {
                    i--; // Rowback the current symbol

                    isWaitingForValue = false;
                    newLineIndentation = 0;
                    currState = State.CONSUME_VALUE;

                } else if (/\S/.test(currChar)) {
                    i--; // Rowback the current symbol

                    if (currSection === undefined) {
                        throw new Error("Error: key detected outside a section!");
                    }

                    isWaitingForValue = false;
                    currKeyIndentation = newLineIndentation;
                    newLineIndentation = 0;
                    currState = State.WAIT_KEY_START;

                } else if (currChar === '\n') {
                    newLineIndentation = 0;
                }

                break;
            }
        } // switch
    } // for

    // EOF reached
    if (INVALID_PARSE_END_STATE.includes(currState)) {
        throw new Error(`Cannot end the parsing in '${currState}' state`);
    }

    if (currSection !== undefined) {
        if (currSectionEntry !== undefined) {
            currSection.entries.push(currSectionEntry);
        }

        currSection.endOffset = content.length;
        sections.push(currSection);
    }

    for (var section of sections) {
        for (var entry of section.entries) {
            const values = entry.value.split('\n');
            // Cleanup the values
            entry.value = values.filter(v => v.trim().length > 0).map(v => v.trim()).join('\n');
        }
    }

    return sections;
}