export enum State {
    WAIT_SECTION_START,
    WAIT_SECTION_END,
    WAIT_SECTION_END_NEWLINE,
    WAIT_KEY_START,
    WAIT_KEY_END,
    CONSUME_VALUE,
    NEW_LINE_START,
}



export type SectionEntry = {
    keyStartOffset: number,
    keyEndOffset: number,
    valueStartOffset: number,
    valueEndOffset: number,
    key: string,
    value: string,
}


export type Section = {
    startOffset: number,
    endOffset: number,
    name: string,
    entries: SectionEntry[],
}


export type Configuration = {
    sections: Section[],
}