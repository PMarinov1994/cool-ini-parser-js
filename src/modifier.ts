import { Configuration } from "./types";



export const modifyConfigurationSectionKey = (config: Configuration, section: string,
    key: string, newValue: string): string | undefined => {

    const sections = config.sections.filter(s => s.name === section);
    if (sections.length === 0) {
        return undefined;
    }

    const keys = sections[0].entries.filter(k => k.key === key);
    if (keys.length === 0) {
        return undefined;
    }

    return modifyConfigurationSectionKeyByIndex(
        config, config.sections.indexOf(sections[0]), sections[0].entries.indexOf(keys[0]), newValue);
};



export const modifyConfigurationSectionKeyByIndex = (config: Configuration, sectionIdx: number,
    keyIdx: number, newValue: string): string | undefined => {

    const content = config.content;
    const section = config.sections.at(sectionIdx);

    const NO_VALUE_PADDING = " = ";

    if (section === undefined) {
        return undefined;
    }

    const key = section.entries.at(keyIdx);
    if (key === undefined) {
        return undefined;
    }

    let valueStartOffset = -1;
    let valuePrefix = "";
    if (key.valueStartOffset !== -1) {
        valueStartOffset = key.valueStartOffset;
    } else if (key.delimiterOffset !== -1) {
        valueStartOffset = key.delimiterOffset + 1;
        valuePrefix = " ";
    } else {
        valueStartOffset = key.keyStartOffset + key.key.length + NO_VALUE_PADDING.length;
        valuePrefix = NO_VALUE_PADDING;
    }

    let valueEndOffset = key.valueEndOffset;
    if (valueEndOffset === -1) {
        valueEndOffset = valueStartOffset; // We DO NOT need +1 because it is already added in the startOffset
    } else {
        valueEndOffset += 1; // +1 since the substring includes the characters up to, but not including
    }

    const newValueLinesArr = newValue.split('\n');
    if (newValueLinesArr.length > 1) {

        // Check if old value is multilined.
        // If it is, we will format the new multiline value with indentation,
        // equal to the second value line indentation.
        const oldValueLinesArr = key.value.split('\n');
        if (oldValueLinesArr.length > 1) {
            const oldRawValuesLinesArr = key.rawValue.split('\n');
            const regex = /(?<indent>\s+).*/.exec(oldRawValuesLinesArr[1]);
            if (regex === null || regex.groups === undefined) {
                throw new Error("Panic! Second line of value will must always be indented.");
            }

            const indentation = regex.groups['indent'];
            newValue = newValueLinesArr.map((nv, index) => index === 0 ? nv : indentation + nv).join('\n');
        } else {
            // If the old value is not multiline,
            // we will align the new lines to the start of the value
            // Might not work well with tabs. ??
            let startOfLineIndex = valueStartOffset;
            let currChar: string | undefined = content.at(startOfLineIndex);
            while (currChar !== '\n') {
                currChar = content.at(startOfLineIndex--);

                if (currChar === undefined) {
                    // Sanity check. A key/value in a valid config should always be after [section]\n.
                    // If we reach the start of the string, this means that no new line was found at the section
                    // declaration, which should never happen.
                    throw new Error("Panic! Start of string reached while searching for key/value line start.")
                }
            }

            // -1 for the new line
            // -1 for the start of the value
            let indentation = valueStartOffset - startOfLineIndex - 2;
            if (config.indentSymbol === '\t') {
                indentation /= 2;
            }

            newValue = newValueLinesArr.map((nv, index) => index === 0 ? nv : config.indentSymbol.repeat(indentation) + nv).join('\n');
        }
    }

    const before = content.substring(0, valueStartOffset);
    const after = content.substring(valueEndOffset);

    if (key.rawValue.endsWith('\n') && !newValue.endsWith('\n')) {
        newValue += '\n';
    }

    return before + valuePrefix + newValue + after;
};