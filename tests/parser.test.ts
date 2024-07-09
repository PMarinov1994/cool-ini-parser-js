import { parseInitFromString } from "../src/parser";
import { Configuration } from "../src/types";

describe('testing parser file', () => {
    /*
    * TEST
    */
    test('normal single section 1', () => {
        expect(parseInitFromString(
            `\
[section]
key = value`
        )).toStrictEqual<Configuration>({
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 21,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value",
                            valueStartOffset: 16,
                        }
                    ]
                }
            ]
        })
    })

    /*
    * TEST
    */
    test('normal single section 2', () => {
        expect(parseInitFromString(
            `\
[section]
key = value
key2 = value2`
        )).toStrictEqual<Configuration>({
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 35,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value",
                            valueStartOffset: 16,
                        },
                        {
                            key: "key2",
                            keyStartOffset: 22,
                            value: "value2",
                            valueStartOffset: 29,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('normal single section 3', () => {
        expect(parseInitFromString(
            `\
[section]
key = value


`
        )).toStrictEqual<Configuration>({
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 24,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value",
                            valueStartOffset: 16,
                        }
                    ]
                }
            ]
        })
    })


        /*
    * TEST
    */
        test('normal single section 4', () => {
            expect(parseInitFromString(
                `\
[section]
key = value   

`
            )).toStrictEqual<Configuration>({
                sections: [
                    {
                        name: "section",
                        startOffset: 0,
                        endOffset: 26,
                        entries: [
                            {
                                key: "key",
                                keyStartOffset: 10,
                                value: "value",
                                valueStartOffset: 16,
                            }
                        ]
                    }
                ]
            })
        })



    /*
    * TEST
    */
    test('normal double section 1', () => {
        expect(parseInitFromString(
            `\
[section]
key = value

[section2]
key = value`
        )).toStrictEqual<Configuration>({
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 22,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value",
                            valueStartOffset: 16,
                        }
                    ]
                },
                {
                    name: "section2",
                    startOffset: 23,
                    endOffset: 45,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 34,
                            value: "value",
                            valueStartOffset: 40,
                        }
                    ]
                },
            ]
        })
    })

    /*
    * TEST
    */
    test('normal triple section 1', () => {
        expect(parseInitFromString(
            `\
[section]
key = value

[section2]
key1 = value1

[section3]
key2 = value2`
        )).toStrictEqual<Configuration>({
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 22,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value",
                            valueStartOffset: 16,
                        }
                    ]
                },
                {
                    name: "section2",
                    startOffset: 23,
                    endOffset: 48,
                    entries: [
                        {
                            key: "key1",
                            keyStartOffset: 34,
                            value: "value1",
                            valueStartOffset: 41,
                        }
                    ]
                },
                {
                    name: "section3",
                    startOffset: 49,
                    endOffset: 73,
                    entries: [
                        {
                            key: "key2",
                            keyStartOffset: 60,
                            value: "value2",
                            valueStartOffset: 67,
                        }
                    ]
                },
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline single section 1', () => {
        expect(parseInitFromString(
            `\
[section]
key = value
      value2
      value3`
        )).toStrictEqual<Configuration>({
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 47,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value\nvalue2\nvalue3",
                            valueStartOffset: 16,
                        }
                    ]
                }
            ]
        })
    })
});