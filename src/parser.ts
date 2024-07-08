import { State, Section, SectionEntry, Configuration } from "./types"


const SYMBOL_SECTION_START = '[';
const SYMBOL_SECTION_END = ']';
const SYMBOL_KEY_VALUE_SEPARATOR = '=';
const SYMBOL_COMMENT = ';';

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

    return {
        sections: sections
    };
    
}

const _parseInitFromString = (content: string): Section[] => {

    const sections: Section[] = [];

    let currState: State = State.NEW_LINE_START;

    let currSection: Section | undefined = undefined;
    let currSectionEntry: SectionEntry | undefined = undefined;

    console.log("<Starting ini parser>")
    for (let i = 0; i < content.length; i++) {

        let currChar = content[i];

        // For debugging
        // console.log(currChar)

        // While we are in a comment, we ignore any other symbols until we exit the comment parsing
        if (currChar === SYMBOL_COMMENT) {
            do {
                // Trap everything untill a new line (end of comment)
                // Once a new line is reached, pass it the parser
                currChar = content[++i];
            } while (currChar !== '\n');
        }

        switch (currState as State) {
            case State.WAIT_SECTION_START:
                if (currChar !== SYMBOL_SECTION_START)
                    throw new Error(`Error: Invalid section start symbol '${currChar}'!`);

                if (currSection !== undefined) {
                    if (currSectionEntry !== undefined) {
                        currSectionEntry.valueEndOffset = i - 1;
                        currSection.entries.push(currSectionEntry);
                        currSectionEntry = undefined;
                    }

                    currSection.endOffset = i - 1;
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

            case State.WAIT_SECTION_END:
                if (currSection === undefined)
                    throw new Error("WrongStateError");

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

            case State.WAIT_SECTION_END_NEWLINE:
                if (currChar === '\n') {
                    currState = State.NEW_LINE_START;
                } else if (!/\s/.test(currChar)) {
                    throw new Error("Error: After section end, no symbols are allowed")
                }
                break;

            case State.WAIT_KEY_START:
                if (currSection === undefined)
                    throw new Error("WrongStateError");

                if (currSectionEntry !== undefined) {
                    currSectionEntry.valueEndOffset = i - 1;
                    currSection.entries.push(currSectionEntry);
                    currSectionEntry = undefined;
                }

                currSectionEntry = {
                    keyStartOffset: i,
                    keyEndOffset: -1,
                    valueStartOffset: -1,
                    valueEndOffset: -1,
                    key: String(currChar),
                    value: "",
                };
                currState = State.WAIT_KEY_END;

                break;

            case State.WAIT_KEY_END:
                if (currSectionEntry === undefined)
                    throw new Error("WrongStateError");

                if (currChar === SYMBOL_KEY_VALUE_SEPARATOR) {
                    currSectionEntry.key = currSectionEntry.key.trimEnd();
                    currSectionEntry.keyEndOffset = i - 1;

                    currState = State.CONSUME_VALUE;
                } else {
                    currSectionEntry.key += currChar;
                }
                break;

            case State.CONSUME_VALUE:
                if (currSectionEntry === undefined)
                    throw new Error("WrongStateError");

                if (currSectionEntry.valueStartOffset === -1) {
                    currSectionEntry.valueStartOffset = i;
                }

                if (currChar === '\n') {
                    currState = State.NEW_LINE_START;
                } else {
                    currSectionEntry.value += currChar;
                }
                break;

            case State.NEW_LINE_START:
                if (currChar === SYMBOL_SECTION_START) {
                    i--; // Rowback the current symbol
                    currState = State.WAIT_SECTION_START;

                } else if (/\S/.test(currChar)) {
                    i--; // Rowback the current symbol

                    if (currSection === undefined) {
                        throw new Error("WrongStateError");
                    }

                    currState = State.WAIT_KEY_START;

                } else if (currSectionEntry !== undefined && (currChar === ' ' || currChar === '\t')) {
                    currSectionEntry.value += '\n';
                    currState = State.CONSUME_VALUE;
                } else if (currChar === '\n') {
                    // Loop back to here
                } else {
                    // throw new Error(`Error: Unexpected value after value new line: ${currChar}`);
                }

                break;
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

        sections.push(currSection);
    }

    for (var section of sections) {
        for (var entry of section.entries) {
            const values = entry.value.split('\n');
            // Cleanup the values
            entry.value = values.filter(v => v.trim().length > 0).map(v => v.trim()).join('\n');
        }
    }

    console.log("\n<Process FINISHED>");
    return sections;
}