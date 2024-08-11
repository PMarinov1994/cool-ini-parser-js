import { parseIniFromString } from "./parser";
import { Configuration } from "./types";

describe('testing parser file', () => {
    /*
    * TEST
    */
    test('Tab indentation 1', () => {
        const content = `\
[section]
key = value
\t\tvalue2`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: "\t",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 30,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2",
                            rawValue: "value\n\t\tvalue2",
                            valueStartOffset: 16,
                            rawValueEndOffset: 29,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('Tab indentation 2', () => {
        const content = `\
[section]
\tkey = value
\tkey2 = value2`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: "\t",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 37,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 15,
                            keyStartOffset: 11,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 17,
                            rawValueEndOffset: 22,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 29,
                            keyStartOffset: 24,
                            value: "value2",
                            rawValue: "value2",
                            valueStartOffset: 31,
                            rawValueEndOffset: 36,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('Tab indentation 3', () => {
        const content = `\
[section]
  key = value
\tkey2 = value2`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: "\t",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 38,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 16,
                            keyStartOffset: 12,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 18,
                            rawValueEndOffset: 23,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 30,
                            keyStartOffset: 25,
                            value: "value2",
                            rawValue: "value2",
                            valueStartOffset: 32,
                            rawValueEndOffset: 37,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('Tab indentation 4', () => {
        const content = `\
[section]
\tkey = value
  key2 = value2`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 38,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 15,
                            keyStartOffset: 11,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 17,
                            rawValueEndOffset: 22,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 30,
                            keyStartOffset: 25,
                            value: "value2",
                            rawValue: "value2",
                            valueStartOffset: 32,
                            rawValueEndOffset: 37,
                        }
                    ]
                }
            ]
        })
    })

    /*
    * TEST
    */
    test('normal single section 1', () => {
        const content = `\
[section]
key = value`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 21,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value",
                            valueStartOffset: 16,
                            rawValueEndOffset: 20,
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
        const content = `\
[section]
key = value
key2 = value2`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 35,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 27,
                            keyStartOffset: 22,
                            value: "value2",
                            rawValue: "value2",
                            valueStartOffset: 29,
                            rawValueEndOffset: 34,
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
        const content = `\
[section]
key = value


`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 24,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
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
        const content = `\
[section]
key = value   

`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 26,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value   \n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 24,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('normal single section 5', () => {
        const content = `\
[section]
    key1 = value1
        key2 = value2
key3 = value3`;

        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 63,
                    entries: [
                        {
                            key: "key1",
                            delimiterOffset: 19,
                            keyStartOffset: 14,
                            value: "value1\nkey2 = value2",
                            rawValue: "value1\n        key2 = value2\n",
                            valueStartOffset: 21,
                            rawValueEndOffset: 49,
                        },
                        {
                            key: "key3",
                            delimiterOffset: 55,
                            keyStartOffset: 50,
                            value: "value3",
                            rawValue: "value3",
                            valueStartOffset: 57,
                            rawValueEndOffset: 62,
                        }
                    ]
                }
            ]
        })
    })



    /*
    * TEST
    */
    test('Value with comment 1', () => {
        const content = `\
[section]
key = value # Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 31,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value ",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
                        }
                    ]
                }
            ]
        })
    })



    /*
    * TEST
    */
    test('Value with comment 2', () => {
        const content = `\
[section]
key = value ; Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 31,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value ",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
                        }
                    ]
                }
            ]
        })
    })



    /*
    * TEST
    */
    test('Value with comment 3', () => {
        const content = `\
[section]
key = value ; Comment # Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 41,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value ",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('Value with comment 4', () => {
        const content = `\
[section]
key = 
    ; Comment
    value # Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 50,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value ",
                            valueStartOffset: 35,
                            rawValueEndOffset: 40,
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
        const content = `\
[section]
key = value

[section2]
key = value`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 22,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
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
                            delimiterOffset: 38,
                            keyStartOffset: 34,
                            value: "value",
                            rawValue: "value",
                            valueStartOffset: 40,
                            rawValueEndOffset: 44,
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
        const content = `\
[section]
key = value

[section2]
key1 = value1

[section3]
key2 = value2`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 22,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
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
                            delimiterOffset: 39,
                            keyStartOffset: 34,
                            value: "value1",
                            rawValue: "value1\n",
                            valueStartOffset: 41,
                            rawValueEndOffset: 47,
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
                            delimiterOffset: 65,
                            keyStartOffset: 60,
                            value: "value2",
                            rawValue: "value2",
                            valueStartOffset: 67,
                            rawValueEndOffset: 72,
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
        const content = `\
[section]
key = value
      value2
      value3`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 47,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2\nvalue3",
                            rawValue: "value\n      value2\n      value3",
                            valueStartOffset: 16,
                            rawValueEndOffset: 46,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline single section 2', () => {
        const content = `\
[section]
key = value
 value2
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 30,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2",
                            rawValue: "value\n value2\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 29,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline single section 3', () => {
        const content = `\
[section]
key = value
value2
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 29,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 21,
                        },
                        {
                            key: "value2",
                            delimiterOffset: -1,
                            keyStartOffset: 22,
                            value: "",
                            rawValue: "",
                            valueStartOffset: -1,
                            rawValueEndOffset: -1,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline single section 4', () => {
        const content = `\
[section]
key = value
 value2 = val
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 36,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val",
                            rawValue: "value\n value2 = val\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 35,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline single section 5', () => {
        const content = `\
[section]
key = value
 value2 = val
    key = lll
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 50,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val\nkey = lll",
                            rawValue: "value\n value2 = val\n    key = lll\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 49,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline double selection 1', () => {
        const content = `\
[section]
key = value
 value2 = val

[section2]
   key=val
   key2 = value
  key3 = sss
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 36,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val",
                            rawValue: "value\n value2 = val\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 35,
                        }
                    ]
                },
                {
                    name: "section2",
                    startOffset: 37,
                    endOffset: 88,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 54,
                            keyStartOffset: 51,
                            value: "val",
                            rawValue: "val\n",
                            valueStartOffset: 55,
                            rawValueEndOffset: 58,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 67,
                            keyStartOffset: 62,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 69,
                            rawValueEndOffset: 74,
                        },
                        {
                            key: "key3",
                            delimiterOffset: 82,
                            keyStartOffset: 77,
                            value: "sss",
                            rawValue: "sss\n",
                            valueStartOffset: 84,
                            rawValueEndOffset: 87,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('multiline double selection 2', () => {
        const content = `\
[section]
key = value
 value2 = val

[section2]
   key=val
   key2 = value
  key3 = sss

        [section3]
    key=val
key2=value
  key3=vvvv
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 36,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val",
                            rawValue: "value\n value2 = val\n",
                            valueStartOffset: 16,
                            rawValueEndOffset: 35,
                        }
                    ]
                },
                {
                    name: "section2",
                    startOffset: 37,
                    endOffset: 88,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 54,
                            keyStartOffset: 51,
                            value: "val",
                            rawValue: "val\n",
                            valueStartOffset: 55,
                            rawValueEndOffset: 58,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 67,
                            keyStartOffset: 62,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 69,
                            rawValueEndOffset: 74,
                        },
                        {
                            key: "key3",
                            delimiterOffset: 82,
                            keyStartOffset: 77,
                            value: "sss",
                            rawValue: "sss\n",
                            valueStartOffset: 84,
                            rawValueEndOffset: 87,
                        }
                    ]
                },
                {
                    name: "section3",
                    startOffset: 97,
                    endOffset: 143,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 115,
                            keyStartOffset: 112,
                            value: "val",
                            rawValue: "val\n",
                            valueStartOffset: 116,
                            rawValueEndOffset: 119,
                        },
                        {
                            key: "key2",
                            delimiterOffset: 124,
                            keyStartOffset: 120,
                            value: "value\nkey3=vvvv",
                            rawValue: "value\n  key3=vvvv\n",
                            valueStartOffset: 125,
                            rawValueEndOffset: 142,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('empty value 1', () => {
        const content = `\
[section]
key
key1 = value`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 26,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: -1,
                            keyStartOffset: 10,
                            value: "",
                            rawValue: "",
                            valueStartOffset: -1,
                            rawValueEndOffset: -1,
                        },
                        {
                            key: "key1",
                            delimiterOffset: 19,
                            keyStartOffset: 14,
                            value: "value",
                            rawValue: "value",
                            valueStartOffset: 21,
                            rawValueEndOffset: 25,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('empty value 2', () => {
        const content = `\
[section]
key =
key1 = value`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 28,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 14,
                            keyStartOffset: 10,
                            value: "",
                            rawValue: "",
                            valueStartOffset: -1,
                            rawValueEndOffset: -1,
                        },
                        {
                            key: "key1",
                            delimiterOffset: 21,
                            keyStartOffset: 16,
                            value: "value",
                            rawValue: "value",
                            valueStartOffset: 23,
                            rawValueEndOffset: 27,
                        }
                    ]
                }
            ]
        })
    })


    /*
    * TEST
    */
    test('EOF at comment 1', () => {
        const content = `\
[section]
; Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 19,
                    entries: []
                }
            ]
        })
    })



    /*
    * TEST
    */
    test('THE BIG ONE', () => {
        const content = `\
[Simple Values]
key=value
spaces in keys=allowed
spaces in values=allowed as well
spaces around the delimiter = obviously
you can also use : to delimit keys from values

[All Values Are Strings]
values like this: 1000000
or this: 3.14159265359
are they treated as numbers? : no
integers, floats and booleans are held as: strings
can use the API to get converted values directly: true

[Multiline Values]
chorus: I'm a lumberjack, and I'm okay
    I sleep all night and I work all day

[No Values]
key_without_value
empty string value here =

[You can use comments]
# like this
; or this

# By default only in an empty line.
# Inline comments can be harmful because they prevent users
# from using the delimiting characters as parts of values.
# That being said, this can be customized.

    [Sections Can Be Indented]
        can_values_be_as_well = True
        does_that_mean_anything_special = False
        purpose = formatting for readability
        multiline_values = are
            handled just fine as
            long as they are indented
            deeper than the first line
            of a value
        # Did I mention we can indent comments, too?`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "Simple Values",
                    startOffset: 0,
                    endOffset: 169,
                    entries: [
                        {
                            key: "key",
                            delimiterOffset: 19,
                            keyStartOffset: 16,
                            value: "value",
                            rawValue: "value\n",
                            valueStartOffset: 20,
                            rawValueEndOffset: 25,
                        },
                        {
                            key: "spaces in keys",
                            delimiterOffset: 40,
                            keyStartOffset: 26,
                            value: "allowed",
                            rawValue: "allowed\n",
                            valueStartOffset: 41,
                            rawValueEndOffset: 48,
                        },
                        {
                            key: "spaces in values",
                            delimiterOffset: 65,
                            keyStartOffset: 49,
                            value: "allowed as well",
                            rawValue: "allowed as well\n",
                            valueStartOffset: 66,
                            rawValueEndOffset: 81,
                        },
                        {
                            key: "spaces around the delimiter",
                            delimiterOffset: 110,
                            keyStartOffset: 82,
                            value: "obviously",
                            rawValue: "obviously\n",
                            valueStartOffset: 112,
                            rawValueEndOffset: 121,
                        },
                        {
                            key: "you can also use",
                            delimiterOffset: 139,
                            keyStartOffset: 122,
                            value: "to delimit keys from values",
                            rawValue: "to delimit keys from values\n",
                            valueStartOffset: 141,
                            rawValueEndOffset: 168,
                        }
                    ]
                },
                {
                    name: "All Values Are Strings",
                    startOffset: 170,
                    endOffset: 384,
                    entries: [
                        {
                            key: "values like this",
                            delimiterOffset: 211,
                            keyStartOffset: 195,
                            value: "1000000",
                            rawValue: "1000000\n",
                            valueStartOffset: 213,
                            rawValueEndOffset: 220,
                        },
                        {
                            key: "or this",
                            delimiterOffset: 228,
                            keyStartOffset: 221,
                            value: "3.14159265359",
                            rawValue: "3.14159265359\n",
                            valueStartOffset: 230,
                            rawValueEndOffset: 243,
                        },
                        {
                            key: "are they treated as numbers?",
                            delimiterOffset: 273,
                            keyStartOffset: 244,
                            value: "no",
                            rawValue: "no\n",
                            valueStartOffset: 275,
                            rawValueEndOffset: 277,
                        },
                        {
                            key: "integers, floats and booleans are held as",
                            delimiterOffset: 319,
                            keyStartOffset: 278,
                            value: "strings",
                            rawValue: "strings\n",
                            valueStartOffset: 321,
                            rawValueEndOffset: 328,
                        },
                        {
                            key: "can use the API to get converted values directly",
                            delimiterOffset: 377,
                            keyStartOffset: 329,
                            value: "true",
                            rawValue: "true\n",
                            valueStartOffset: 379,
                            rawValueEndOffset: 383,
                        }
                    ]
                },
                {
                    name: "Multiline Values",
                    startOffset: 385,
                    endOffset: 484,
                    entries: [
                        {
                            key: "chorus",
                            delimiterOffset: 410,
                            keyStartOffset: 404,
                            value: "I'm a lumberjack, and I'm okay\nI sleep all night and I work all day",
                            rawValue: "I'm a lumberjack, and I'm okay\n    I sleep all night and I work all day\n",
                            valueStartOffset: 412,
                            rawValueEndOffset: 483,
                        }
                    ]
                },
                {
                    name: "No Values",
                    startOffset: 485,
                    endOffset: 541,
                    entries: [
                        {
                            key: "key_without_value",
                            delimiterOffset: -1,
                            keyStartOffset: 497,
                            value: "",
                            rawValue: "",
                            valueStartOffset: -1,
                            rawValueEndOffset: -1,
                        },
                        {
                            key: "empty string value here",
                            delimiterOffset: 539,
                            keyStartOffset: 515,
                            value: "",
                            rawValue: "",
                            valueStartOffset: -1,
                            rawValueEndOffset: -1,
                        }
                    ]
                },
                {
                    name: "You can use comments",
                    startOffset: 542,
                    endOffset: 786,
                    entries: []
                },
                {
                    name: "Sections Can Be Indented",
                    startOffset: 791,
                    endOffset: 1164,
                    entries: [
                        {
                            key: "can_values_be_as_well",
                            delimiterOffset: 848,
                            keyStartOffset: 826,
                            value: "True",
                            rawValue: "True\n",
                            valueStartOffset: 850,
                            rawValueEndOffset: 854,
                        },
                        {
                            key: "does_that_mean_anything_special",
                            delimiterOffset: 895,
                            keyStartOffset: 863,
                            value: "False",
                            rawValue: "False\n",
                            valueStartOffset: 897,
                            rawValueEndOffset: 902,
                        },
                        {
                            key: "purpose",
                            delimiterOffset: 919,
                            keyStartOffset: 911,
                            value: "formatting for readability",
                            rawValue: "formatting for readability\n",
                            valueStartOffset: 921,
                            rawValueEndOffset: 947,
                        },
                        {
                            key: "multiline_values",
                            delimiterOffset: 973,
                            keyStartOffset: 956,
                            value: "are\nhandled just fine as\nlong as they are indented\ndeeper than the first line\nof a value",
                            rawValue: "are\n            handled just fine as\n            long as they are indented\n            deeper than the first line\n            of a value\n",
                            valueStartOffset: 975,
                            rawValueEndOffset: 1111,
                        }
                    ]
                }
            ]
        })
    })



    /*
    * TEST
    */
    test('Verify error: sections invalid symbols 1', () => {
        expect(() => parseIniFromString(
            `[sect
            ion]`
        )).toThrow(Error("Error: Section cannot be multiline"));
    })


    /*
    * TEST
    */
    test('Verify error: sections invalid symbols 2', () => {
        expect(() => parseIniFromString(
            `[sect\rion]`
        )).toThrow(Error("Error: Section name cannot contain '\r' symbol!"));
    })


    /*
    * TEST
    */
    test('Verify error: sections invalid end', () => {
        expect(() => parseIniFromString(
            `[section] test ; Comment`
        )).toThrow(Error("Error: After section end, no symbols are allowed"));
    })


    /*
    * TEST
    */
    test('Verify error: no section start', () => {
        expect(() => parseIniFromString(
            `key=value`
        )).toThrow(Error("Error: key detected outside a section!"));
    })

    /*
    * TEST
    */
    test('Verify error: no section end', () => {
        expect(() => parseIniFromString(
            `[secti`
        )).toThrow(Error(`Cannot end the parsing in '1' state`));
    })

    /*
    * TEST
    */
    test('Verify no error: only comment 1', () => {
        const content = `; Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: only comment 2', () => {
        const content = `   ; Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: only comment 3', () => {
        const content = `\n   \n; Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: empty string', () => {
        const content = ``;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: comment after sections end', () => {
        const content = `[section]      ; Comment`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 24,
                    entries: [],
                }
            ]
        });
    });



    /*
    * TEST
    */
    test('Verify error: key delimiter on new line 1', () => {
        const content = `\
[section]
key
 = value`;
        expect(() => parseIniFromString(content)).toThrow(Error("Error: Key delimiter must be on the same line as the key!"));
    });



    /*
    * TEST
    */
    test('Verify error: key delimiter on new line 2', () => {
        const content = `\
[section]
key
= value`;
        expect(() => parseIniFromString(content)).toThrow(Error("Error: Key delimiter must be on the same line as the key!"));
    });


    /*
    * TEST
    */
    test('Verify error: key delimiter on new line 3', () => {
        const content = `\
[section]
key
 =
  value`;
        expect(() => parseIniFromString(content)).toThrow(Error("Error: Key delimiter must be on the same line as the key!"));
    });

    /*
    * TEST
    */
    test('Empty value test 1', () => {
        const content = `\
[section]
key`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 13,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            delimiterOffset: -1,
                            rawValue: "",
                            value: "",
                            rawValueEndOffset: -1,
                            valueStartOffset: -1,
                        }
                    ],
                }
            ]
        });
    });

    /*
    * TEST
    */
    test('Empty value test 2', () => {
        const content = `\
[section]
key
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 14,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            delimiterOffset: -1,
                            rawValue: "",
                            value: "",
                            rawValueEndOffset: -1,
                            valueStartOffset: -1,
                        }
                    ],
                }
            ]
        });
    });


    /*
    * TEST
    */
    test('Empty section test 1', () => {
        const content = `\
[section]`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 9,
                    entries: [],
                }
            ]
        });
    });

    /*
    * TEST
    */
    test('Empty section test 1', () => {
        const content = `\
[section]
`;
        expect(parseIniFromString(content)).toStrictEqual<Configuration>({
            indentSymbol: " ",
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 10,
                    entries: [],
                }
            ]
        });
    });
});