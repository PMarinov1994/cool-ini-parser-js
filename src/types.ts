export type SectionEntry = {
    keyStartOffset: number,
    valueStartOffset: number,
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
    content: string,
    sections: Section[],
}