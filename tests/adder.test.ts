import { parseInitFromString } from "../src/parser";
import { addConfigurationSectionKey } from "../src/adder";

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

        const config = parseInitFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Add new key 2', () => {
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

        const config = parseInitFromString(configStr);
        expect(addConfigurationSectionKey(config, "General", "newKey", "newValue")).toStrictEqual(expectedStr);
    });
});
