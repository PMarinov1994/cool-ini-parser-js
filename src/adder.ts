import { Configuration } from "./types";


export const addConfigurationSectionKey = (config: Configuration, section: string,
    key: string, value: string): string | undefined => {

    const sections = config.sections.filter(s => s.name === section);
    if (sections.length === 0) {
        return undefined;
    }

    return addConfigurationSectionKeyByIndex(config, config.sections.indexOf(sections[0]), key, value);
}


export const addConfigurationSectionKeyByIndex = (config: Configuration, sectionIdx: number,
    key: string, value: string): string | undefined => {

    const content = config.content;

    const section = config.sections.at(sectionIdx);
    if (section === undefined) {
        return undefined;
    }

    let newEntryStartIndex = section.endOffset;

    let keyNewLinesPrefix = "";
    let keyIndentation = 0;
    let valueIndentation = 2;

    if (section.entries.length !== 0) {
        const entriesLen = section.entries.length;
        const lastKeyEntry = section.entries[entriesLen - 1];

        newEntryStartIndex = lastKeyEntry.valueEndOffset + 1;
        keyNewLinesPrefix = "\n";

        // if (!lastKeyEntry.rawValue.endsWith("\n")) {
        //     // Add one new line before we append the new key/value
        //     // if the last value is at the end of the file
        //     keyNewLinesPrefix = "\n";
        // }
        
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
        // No keys in section and section does not contain any new lines.
        // Usually this is when the section is at the end of the file
        for (let i = section.endOffset; i <= content.length; i++) {
            const currChar = content.at(i);

            if (currChar === '\n') {
                newEntryStartIndex = i + 1;
                break;
            }

            if (currChar === undefined) {
                newEntryStartIndex = i - 1;
                keyNewLinesPrefix = "\n";
                break;
            }
        }
    }

    // construct the new value
    const valueLines: string[] = value.split("\n");
    let newValue: string = valueLines.length === 1 ? value : valueLines.map(v => " ".repeat(valueIndentation) + v).join("\n");
    if (valueLines.length > 1) {
        newValue = "\n" + newValue;
    }

    let newKeyValue: string = `${keyNewLinesPrefix}${" ".repeat(keyIndentation)}${key} = ${newValue}`;

    const before = content.substring(0, newEntryStartIndex - 1);
    const after = content.substring(newEntryStartIndex - 1);

    return before + newKeyValue + after;
}
















