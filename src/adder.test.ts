import { parseIniFromString } from "./parser";
import { addConfigurationSectionKey } from "./adder";

describe('testing adding new key/value', () => {
    /*
    * TEST
    */
    test('Add new key 1', () => {
        const configStr = `\
[General]
appName = SampleApp
version = 1.0.0
author = John Doe`;

        const expectedStr = `\
[General]
appName = SampleApp
version = 1.0.0
author = John Doe
newKey = newValue`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('Add new key 2', () => {
        const configStr = `\
[s]
k = v
`;

        const expectedStr = `\
[s]
k = v
newKey = newValue
`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "s", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Add new key 3', () => {
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
author = John Doe
newKey = newValue
`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Add new key 4', () => {
        const configStr = `\
[s]
k = v

; Comment

`;

        const expectedStr = `\
[s]
k = v
newKey = newValue

; Comment

`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "s", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('No value key 1', () => {
        const configStr = `\
[General]
appName =`;

        const expectedStr = `\
[General]
appName =
newKey = newValue`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('No value key 2', () => {
        const configStr = `\
[General]
appName =
`;

        const expectedStr = `\
[General]
appName =
newKey = newValue
`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('No value key 3', () => {
        const configStr = `\
[General]
appName`;

        const expectedStr = `\
[General]
appName
newKey = newValue`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('No value key 4', () => {
        const configStr = `\
[General]
appName
`;

        const expectedStr = `\
[General]
appName
newKey = newValue
`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Just a section 1', () => {
        const configStr = `\
[General]`;

        const expectedStr = `\
[General]
newKey = newValue`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('Just a section 2', () => {
        const configStr = `\
[General]
`;

        const expectedStr = `\
[General]
newKey = newValue
`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Just a section 3', () => {
        const configStr = `\
[General] ; Comment`;

        const expectedStr = `\
[General] ; Comment
newKey = newValue`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('Just a section 4', () => {
        const configStr = `\
[General] ; Comment
`;

        const expectedStr = `\
[General] ; Comment
newKey = newValue
`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Just a section 5', () => {
        const configStr = `\
[General] ; Comment



`;

        const expectedStr = `\
[General] ; Comment
newKey = newValue



`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('Add just a key 1', () => {
        const configStr = `\
[General]
key = value`;

        const expectedStr = `\
[General]
key = value
newKey`;

        const config = parseIniFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "")).toStrictEqual(expectedStr);
    });
});
