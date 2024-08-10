import { Configuration } from "./types";

export const removeConfigurationSectionKey = (config: Configuration, section: string, key: string): string | undefined => {

    const sections = config.sections.filter(s => s.name === section);
    if (sections.length === 0) {
        return undefined;
    }

    const currSection = sections[0];
    const keys = currSection.entries.filter(e => e.key === key);

    if (keys.length === 0) {
        return undefined;
    }

    const currKey = keys[0];

    return removeConfigurationSectionKeyByIndex(config, config.sections.indexOf(currSection), currSection.entries.indexOf(currKey));
}


export const removeConfigurationSectionKeyByIndex = (config: Configuration, sectionIdx: number, keyIdx: number): string | undefined => {

    const content = config.content;

    const section = config.sections.at(sectionIdx);
    if (section === undefined) {
        return undefined;
    }

    const key = section.entries.at(keyIdx);
    if (key === undefined) {
        return undefined;
    }

    let keyLineStart = key.keyStartOffset;

    // Find the beging of the line.
    for (let i = keyLineStart; i >= 0; i--) {
        const currChar = content.at(i);
        if (currChar === undefined) {
            // Should never get here. Make TypeScript compiler happy.
            throw new Error("Error: Key must always start at a new line");
        }

        if (currChar === '\n') {
            keyLineStart = i + 1;
            break;
        }
    }

    let keyEnd = key.rawValueEndOffset;

    // If key has no value, use the delimiter
    if (keyEnd === -1) {
        keyEnd = key.delimiterOffset;
    }

    // If key has no value and delimiter, calculate the end of the key itself
    if (keyEnd === -1) {
        keyEnd = key.valueStartOffset + key.key.length;
    }

    // Find the end of the line or end of file.
    for (; keyEnd < content.length; keyEnd++) {
        const currChar = content.at(keyEnd);
        if (currChar === undefined || currChar === '\n') {
            keyEnd++; // +1 to consume the newline, if we are undefined, it doesnt matter
            break;
        }
    }

    const before = content.substring(0, keyLineStart);
    const after = content.substring(keyEnd);

    return before + after;
}













