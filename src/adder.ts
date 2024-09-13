import { Configuration } from "./types";

/**
 * Adds a key-value pair to a specified section in the configuration.
 * If the section does not exist, it can create the section or return `undefined`.
 *
 * @param config - The configuration object to which the key-value pair will be added.
 * @param section - The name of the section where the key-value pair should be added.
 * @param key - The key to be added to the specified section.
 * @param value - The value associated with the key.
 * @returns The updated content of the configuration as a string, or `undefined` if the section was not found.
 */
export const addConfigurationSectionKey = (config: Configuration, section: string,
    key: string, value: string): string | undefined => {

    const sections = config.sections.filter(s => s.name === section);
    if (sections.length === 0) {
        return undefined;
    }

    return addConfigurationSectionKeyByIndex(config, config.sections.indexOf(sections[0]), key, value);
}

/**
 * Adds a key-value pair to a specified section in the configuration using the section's index.
 * If the index is out of bounds, the method returns `undefined`.
 *
 * @param config - The configuration object to which the key-value pair will be added.
 * @param sectionIdx - The index of the section where the key-value pair should be added.
 * @param key - The key to be added to the specified section.
 * @param value - The value associated with the key.
 * @returns The updated content of the configuration as a string, or `undefined` if the section index is invalid.
 */
export const addConfigurationSectionKeyByIndex = (config: Configuration, sectionIdx: number,
    key: string, value: string): string | undefined => {

    const content = config.content;

    const section = config.sections.at(sectionIdx);
    if (section === undefined) {
        return undefined;
    }

    let newEntryStartIndex = section.endOffset;

    let keyIndentation = 0;
    let valueIndentation = 2;

    // Check if the section has keys or is empty
    if (section.entries.length !== 0) {
        const entriesLen = section.entries.length;
        const lastKeyEntry = section.entries[entriesLen - 1];

        // Calculate where we need to insert the new value, based on the last key/value
        // 1. key has a value (single line or multiline)
        // 2. key has a delimiter ('=' or ':') but no value
        // 3. its just a key (without delimiter)
        if (lastKeyEntry.rawValueEndOffset !== -1) {
            // We need to see if the value is single or multi lined.
            const rawValueLines = lastKeyEntry.rawValue.split("\n");
            if (rawValueLines.length === 1) {
                // Single line value
                newEntryStartIndex = lastKeyEntry.rawValueEndOffset + 1;
            } else {
                // Multiline value. Insert the new value right after the last charater of the prev value.
                // This will preserve the new lines that where at the end of the prev value
                let i = rawValueLines.length - 1;
                for (; i >= 0; i--) {
                    if (/\S/.test(rawValueLines[i])) {
                        break;
                    }
                }

                newEntryStartIndex = lastKeyEntry.valueStartOffset + rawValueLines.slice(0, i + 1).join('').length;
            }
        } else if (lastKeyEntry.delimiterOffset !== -1) {
            // No value, only key with a delimiter. Place the new value after the delimiter
            newEntryStartIndex = lastKeyEntry.delimiterOffset + 1;
        } else {
            // Just the key
            newEntryStartIndex = lastKeyEntry.keyStartOffset + lastKeyEntry.key.length;
        }

        // Calculate indentation for the new key/value based on the last key entry
        for (let i = lastKeyEntry.keyStartOffset - 1; i > 0; i--) {
            const currChar = content.at(i);
            if (currChar === undefined) {
                // Sanity check. Should never get here. If we have a key,
                // we should have atleast one 'new line'
                throw new Error(`No new line found before the begining of a key "${lastKeyEntry.key}" in section "${section.name}"`);
            }

            if (currChar === "\n") {
                keyIndentation = lastKeyEntry.keyStartOffset - i - 1; // -1 Since we are currnly at the \n symbol offset
                valueIndentation += keyIndentation;
                break;
            }
        }
    } else {
        // No keys in section.
        // Find where the section's definition ends and insert the new key/value there
        for (let i = section.startOffset; i <= section.endOffset; i++) {
            const currChar = content.at(i);

            if (currChar === '\n' || currChar === undefined) {
                newEntryStartIndex = i;
                break;
            }
        }
    }

    // construct the new value
    let newValue: string = "";
    if (value !== "") {
        const valueLines: string[] = value.split("\n");
        newValue = valueLines.length === 1 ? value : valueLines.map(v => " ".repeat(valueIndentation) + v).join("\n");
        if (valueLines.length > 1) {
            newValue = "\n" + newValue;
        }

        newValue = " = " + newValue;
    }

    let newKeyValue: string = `\n${" ".repeat(keyIndentation)}${key}${newValue}`;

    const before = content.substring(0, newEntryStartIndex);
    const after = content.substring(newEntryStartIndex);

    return before + newKeyValue + after;
}
















