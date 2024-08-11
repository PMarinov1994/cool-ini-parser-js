import { Configuration } from "./types";

/**
 * Removes a key-value pair from a specified section in the configuration.
 * If the section or key does not exist, it returns `undefined`.
 *
 * @param config - The configuration object from which the key-value pair will be removed.
 * @param section - The name of the section where the key-value pair should be removed.
 * @param key - The key to be removed from the specified section.
 * @returns The updated content of the configuration as a string, or `undefined` if the section or key was not found.
 */
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

/**
 * Removes a key-value pair from a specified section in the configuration using section and key indices.
 * If the section or key index is out of bounds, the method returns `undefined`.
 *
 * @param config - The configuration object from which the key-value pair will be removed.
 * @param sectionIdx - The index of the section where the key-value pair should be removed.
 * @param keyIdx - The index of the key within the section to be removed.
 * @returns The updated content of the configuration as a string, or `undefined` if the section or key index is invalid.
 */
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













