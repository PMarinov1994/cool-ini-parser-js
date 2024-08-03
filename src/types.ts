export type SectionEntry = {
    keyStartOffset: number,
    valueStartOffset: number,
    valueEndOffset: number,
    key: string,
    value: string,
    rawValue: string,
    delimiterOffset: number,
}


export type Section = {
    startOffset: number,
    endOffset: number,
    name: string,
    entries: SectionEntry[],
}


export type Configuration = {
    indentSymbol: string,
    content: string,
    sections: Section[],
}