import { parseInitFromString } from "../src/parser";
import { Configuration } from "../src/types";

describe('testing parser file', () => {
    /*
    * TEST
    */
    test('normal single section 1', () => {
        const content = `\
[section]
key = value`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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
        const content = `\
[section]
key = value
key2 = value2`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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
        const content = `\
[section]
key = value


`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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
        const content = `\
[section]
key = value   

`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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
        const content = `\
[section]
key = value

[section2]
key = value`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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
        const content = `\
[section]
key = value

[section2]
key1 = value1

[section3]
key2 = value2`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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
        const content = `\
[section]
key = value
      value2
      value3`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
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


    /*
    * TEST
    */
    test('multiline single section 2', () => {
        const content = `\
[section]
key = value
 value2
`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 30,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value\nvalue2",
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
    test('multiline single section 3', () => {
        const content = `\
[section]
key = value
value2
`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 29,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value",
                            valueStartOffset: 16,
                        },
                        {
                            key: "value2",
                            keyStartOffset: 22,
                            value: "",
                            valueStartOffset: -1,
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 36,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val",
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
    test('multiline single section 5', () => {
        const content = `\
[section]
key = value
 value2 = val
    key = lll
`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 50,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val\nkey = lll",
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 36,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val",
                            valueStartOffset: 16,
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
                            keyStartOffset: 51,
                            value: "val",
                            valueStartOffset: 55,
                        },
                        {
                            key: "key2",
                            keyStartOffset: 62,
                            value: "value",
                            valueStartOffset: 69,
                        },
                        {
                            key: "key3",
                            keyStartOffset: 77,
                            value: "sss",
                            valueStartOffset: 84,
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 36,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "value\nvalue2 = val",
                            valueStartOffset: 16,
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
                            keyStartOffset: 51,
                            value: "val",
                            valueStartOffset: 55,
                        },
                        {
                            key: "key2",
                            keyStartOffset: 62,
                            value: "value",
                            valueStartOffset: 69,
                        },
                        {
                            key: "key3",
                            keyStartOffset: 77,
                            value: "sss",
                            valueStartOffset: 84,
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
                            keyStartOffset: 112,
                            value: "val",
                            valueStartOffset: 116,
                        },
                        {
                            key: "key2",
                            keyStartOffset: 120,
                            value: "value\nkey3=vvvv",
                            valueStartOffset: 125,
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 26,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "",
                            valueStartOffset: -1,
                        },
                        {
                            key: "key1",
                            keyStartOffset: 14,
                            value: "value",
                            valueStartOffset: 21,
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "section",
                    startOffset: 0,
                    endOffset: 28,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 10,
                            value: "",
                            valueStartOffset: -1,
                        },
                        {
                            key: "key1",
                            keyStartOffset: 16,
                            value: "value",
                            valueStartOffset: 23,
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
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
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: [
                {
                    name: "Simple Values",
                    startOffset: 0,
                    endOffset: 169,
                    entries: [
                        {
                            key: "key",
                            keyStartOffset: 16,
                            value: "value",
                            valueStartOffset: 20
                        },
                        {
                            key: "spaces in keys",
                            keyStartOffset: 26,
                            value: "allowed",
                            valueStartOffset: 41
                        },
                        {
                            key: "spaces in values",
                            keyStartOffset: 49,
                            value: "allowed as well",
                            valueStartOffset: 66
                        },
                        {
                            key: "spaces around the delimiter",
                            keyStartOffset: 82,
                            value: "obviously",
                            valueStartOffset: 112
                        },
                        {
                            key: "you can also use",
                            keyStartOffset: 122,
                            value: "to delimit keys from values",
                            valueStartOffset: 141
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
                            keyStartOffset: 195,
                            value: "1000000",
                            valueStartOffset: 213
                        },
                        {
                            key: "or this",
                            keyStartOffset: 221,
                            value: "3.14159265359",
                            valueStartOffset: 230
                        },
                        {
                            key: "are they treated as numbers?",
                            keyStartOffset: 244,
                            value: "no",
                            valueStartOffset: 275
                        },
                        {
                            key: "integers, floats and booleans are held as",
                            keyStartOffset: 278,
                            value: "strings",
                            valueStartOffset: 321
                        },
                        {
                            key: "can use the API to get converted values directly",
                            keyStartOffset: 329,
                            value: "true",
                            valueStartOffset: 379
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
                            keyStartOffset: 404,
                            value: "I'm a lumberjack, and I'm okay\nI sleep all night and I work all day",
                            valueStartOffset: 412
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
                            keyStartOffset: 497,
                            value: "",
                            valueStartOffset: -1
                        },
                        {
                            key: "empty string value here",
                            keyStartOffset: 515,
                            value: "",
                            valueStartOffset: -1
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
                            keyStartOffset: 826,
                            value: "True",
                            valueStartOffset: 850
                        },
                        {
                            key: "does_that_mean_anything_special",
                            keyStartOffset: 863,
                            value: "False",
                            valueStartOffset: 897
                        },
                        {
                            key: "purpose",
                            keyStartOffset: 911,
                            value: "formatting for readability",
                            valueStartOffset: 921
                        },
                        {
                            key: "multiline_values",
                            keyStartOffset: 956,
                            value: "are\nhandled just fine as\nlong as they are indented\ndeeper than the first line\nof a value",
                            valueStartOffset: 975
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
        expect(() => parseInitFromString(
            `[sect
            ion]`
        )).toThrow(Error("Error: Section cannot be multiline"));
    })


    /*
    * TEST
    */
    test('Verify error: sections invalid symbols 2', () => {
        expect(() => parseInitFromString(
            `[sect\rion]`
        )).toThrow(Error("Error: Section name cannot contain '\r' symbol!"));
    })


    /*
    * TEST
    */
    test('Verify error: sections invalid end', () => {
        expect(() => parseInitFromString(
            `[section] test ; Comment`
        )).toThrow(Error("Error: After section end, no symbols are allowed"));
    })


    /*
    * TEST
    */
    test('Verify error: no section start', () => {
        expect(() => parseInitFromString(
            `key=value`
        )).toThrow(Error("Error: key detected outside a section!"));
    })

    /*
    * TEST
    */
    test('Verify error: no section end', () => {
        expect(() => parseInitFromString(
            `[secti`
        )).toThrow(Error(`Cannot end the parsing in '1' state`));
    })

    /*
    * TEST
    */
    test('Verify no error: only comment 1', () => {
        const content = `; Comment`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: only comment 2', () => {
        const content = `   ; Comment`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: only comment 3', () => {
        const content = `\n   \n; Comment`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: empty string', () => {
        const content = ``;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
            content: content,
            sections: []
        });
    });


    /*
    * TEST
    */
    test('Verify no error: comment after sections end', () => {
        const content = `[section]      ; Comment`;
        expect(parseInitFromString(content)).toStrictEqual<Configuration>({
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

});