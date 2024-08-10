import { parseInitFromString } from "../src/parser";
import { removeConfigurationSectionKey } from "../src/remover";

describe('testing removing key', () => {
    /*
    * TEST
    */
    test('Remove key 1', () => {
        const configStr = `\
[General]
appName = SampleApp
version = 1.0.0
author = John Doe`;

        const expectedStr = `\
[General]
appName = SampleApp
author = John Doe`;

        const config = parseInitFromString(configStr);
        expect(removeConfigurationSectionKey(config, "General", "version")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Remove key 2', () => {
        const configStr = `\
[General]
appName = SampleApp
version = 1.0.0
author = John Doe`;

        const expectedStr = `\
[General]
appName = SampleApp
version = 1.0.0
`;

        const config = parseInitFromString(configStr);
        expect(removeConfigurationSectionKey(config, "General", "author")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('Remove key 3', () => {
        const configStr = `\
[General]
appName = SampleApp
version = 1.0.0
author = John Doe
`;

        const expectedStr = `\
[General]
appName = SampleApp
version = 1.0.0
`;

        const config = parseInitFromString(configStr);
        expect(removeConfigurationSectionKey(config, "General", "author")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Remove key 4', () => {
        const configStr = `\
[General]
    appName = SampleApp
    version = 1.0.0
    author = John Doe
`;

        const expectedStr = `\
[General]
    appName = SampleApp
    version = 1.0.0
`;

        const config = parseInitFromString(configStr);
        expect(removeConfigurationSectionKey(config, "General", "author")).toStrictEqual(expectedStr);
    });



    /*
    * TEST
    */
    test('Remove key 5', () => {
        const configStr = `\
[General]
    appName = SampleApp

    version = 
        1.0.0
        2.0.0
        3.0.0

    author = John Doe
`;

        const expectedStr = `\
[General]
    appName = SampleApp


    author = John Doe
`;

        const config = parseInitFromString(configStr);
        expect(removeConfigurationSectionKey(config, "General", "version")).toStrictEqual(expectedStr);
    });
});

