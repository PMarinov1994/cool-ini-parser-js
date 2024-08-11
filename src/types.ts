/**
 * Represents an individual entry within a configuration section.
 */
export type SectionEntry = {
    /**
     * The offset in the file where the key starts.
     */
    keyStartOffset: number,

    /**
     * The offset in the file where the value starts.
     */
    valueStartOffset: number,

    /**
     * The offset in the file where the raw value's last symbol is.
     */
    rawValueEndOffset: number,

    /**
     * The key for the configuration entry.
     */
    key: string,

    /**
     * The processed value for the configuration entry.
     */
    value: string,

    /**
     * The raw, unprocessed value from the configuration file.
     */
    rawValue: string,

    /**
     * The offset in the file where the delimiter ('=', ':') is located.
     */
    delimiterOffset: number,
}

/**
 * Represents a section in the configuration file, which contains multiple entries.
 */
export type Section = {
    /**
     * The offset in the file where the section starts.
     */
    startOffset: number,

    /**
     * The offset in the file where the section ends.
     */
    endOffset: number,

    /**
     * The name of the section.
     */
    name: string,

    /**
     * An array of entries within this section.
     */
    entries: SectionEntry[],
}

/**
 * Represents the overall configuration, containing multiple sections and metadata.
 */
export type Configuration = {
    /**
     * The symbol used for indentation in the configuration file (e.g., a tab or spaces). If the file has a mixture
     * of spaces and tabs, the last key's indentation will be used.
     */
    indentSymbol: string,

    /**
     * The raw content of the configuration file.
     */
    content: string,

    /**
     * An array of sections parsed from the configuration file.
     */
    sections: Section[],
}
