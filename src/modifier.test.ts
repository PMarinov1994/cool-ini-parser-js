import { modifyConfigurationSectionKey } from "./modifier";
import { parseIniFromString } from "./parser";

describe('testing modifing key\'s value', () => {
    /*
    * TEST
    */
    test('Simple Replace Test', () => {
        const configStr = `\
[General]
appName = SampleApp
version = 1.0.0
author = John Doe

[Settings]
theme = dark
language = en-US
autoSaveInterval = 10`;

        const expectedStr = `\
[General]
appName = SampleApp
version = 2.2.2
author = John Doe

[Settings]
theme = dark
language = en-US
autoSaveInterval = 10`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "version", "2.2.2")).toStrictEqual(expectedStr);
    });


    /*
    * TEST 2
    */
    test('Modify Existing Key with Multiline Value Test', () => {
        const configStr = `\
[Description]
text = This is a sample application.
    It demonstrates how to use an INI file
    for configuration purposes.

[Settings]
theme = dark
language = en-US`;

        const expectedStr = `\
[Description]
text = This is an updated description.
    It has multiple lines.

[Settings]
theme = dark
language = en-US`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "Description", "text", "This is an updated description.\nIt has multiple lines.")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Different Indentation Styles Test 1', () => {
        const configStr = `\
[General]
  appName = SampleApp
  version= 1.0.0
author  = John Doe

[Settings]
theme=dark
  language  = en-US
autoSaveInterval  = 10`;

        const expectedStr = `\
[General]
  appName = SampleApp
  version= 2.2.2
author  = John Doe

[Settings]
theme=dark
  language  = en-US
autoSaveInterval  = 10`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "version", "2.2.2")).toStrictEqual(expectedStr);
    });



    /*
    * TEST
    */
    test('Multiline value test 1', () => {
        const configStr = `\
[General]
appName = SampleApp`;

        const expectedStr = `\
[General]
appName = SampleApp
          SampleApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "SampleApp\nSampleApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Multiline value test 2', () => {
        const configStr = `\
[General]
appName = SampleApp
               SampleApp`;

        const expectedStr = `\
[General]
appName = ComplexApp
               ComplexApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp\nComplexApp")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('Multiline value test 3', () => {
        const configStr = `\
[General]
appName = SampleApp
\t\tSampleApp`;

        const expectedStr = `\
[General]
appName = ComplexApp
\t\tComplexApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp\nComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('No value 1', () => {
        const configStr = `\
[General]
appName =`;

        const expectedStr = `\
[General]
appName = ComplexApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });

    /*
    * TEST
    */
    test('No value 2', () => {
        const configStr = `\
[General]
appName =
other = test`;

        const expectedStr = `\
[General]
appName = ComplexApp
other = test`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('No value 3', () => {
        const configStr = `\
[General]
appName=
other=test`;

        const expectedStr = `\
[General]
appName= ComplexApp
other=test`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Multiline with empty lines test 1', () => {
        const configStr = `\
[General]
appName =


     SimpleApp



other = test`;

        const expectedStr = `\
[General]
appName =


     ComplexApp



other = test`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });



    /*
    * TEST
    */
    test('Padding test 1', () => {
        const configStr = `\
[General]
appName =          SampleApp`;

        const expectedStr = `\
[General]
appName =          ComplexApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Padding test 2', () => {
        const configStr = `\
[General]
appName            =          SampleApp`;

        const expectedStr = `\
[General]
appName            =          ComplexApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Padding test 3', () => {
        const configStr = `\
[General]
appName            =          SampleApp


`;

        const expectedStr = `\
[General]
appName            =          ComplexApp


`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Padding test 4', () => {
        const configStr = `\
[General]
appName            =          SampleApp
    SampleApp
    SampleApp
    SampleApp
    SampleApp


    
`;

        const expectedStr = `\
[General]
appName            =          ComplexApp
    ComplexApp
    ComplexApp
    ComplexApp
    ComplexApp


    
`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp\nComplexApp\nComplexApp\nComplexApp\nComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Padding test 5', () => {
        const configStr = `\
[General]
appName            =          SimpleApp
    SimpleApp
    SimpleApp


     

other = value`;

        const expectedStr = `\
[General]
appName            =          ComplexApp
    ComplexApp
    ComplexApp


     

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp\nComplexApp\nComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Padding test 6', () => {
        const configStr = `\
[General]
appName            =          SimpleApp
    SimpleApp
    SimpleApp


    

other = value`;

        const expectedStr = `\
[General]
appName            =          ComplexApp


    

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Comment test 1', () => {
        const configStr = `\
[General]
appName = SimpleApp ; Comment

other = value`;

        const expectedStr = `\
[General]
appName = ComplexApp

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "appName", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Comment test 2', () => {
        const configStr = `\
[General]
key = 
    ; Comment
    value # Comment

other = value`;

        const expectedStr = `\
[General]
key = 
    ; Comment
    ComplexApp

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "key", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Comment test 3', () => {
        const configStr = `\
[General]
key = 
    ; Comment
    value # Comment
    ; Different Comment

other = value`;

        const expectedStr = `\
[General]
key = 
    ; Comment
    ComplexApp
    ; Different Comment

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "key", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Comment test 4', () => {
        const configStr = `\
[General]
key = 
    ; Comment
    value # Comment
    ; Different Comment
    value2

other = value`;

        const expectedStr = `\
[General]
key = 
    ; Comment
    ComplexApp

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "key", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Comment test 5', () => {
        const configStr = `\
[General]
key = 
    ; Comment
    value # Comment
    ; Different Comment
    value2

other = value`;

        const expectedStr = `\
[General]
key = 
    ; Comment
    ComplexApp
    ComplexApp2

other = value`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "key", "ComplexApp\nComplexApp2")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Values with new lines 1', () => {
        const configStr = `\
[General]
key = value2

other = value


key2 = value2`;

        const expectedStr = `\
[General]
key = value2

other = ComplexApp


key2 = value2`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "other", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Values with new lines 2', () => {
        const configStr = `\
[General]
key = value2`;

        const expectedStr = `\
[General]
key = ComplexApp`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "key", "ComplexApp")).toStrictEqual(expectedStr);
    });


    /*
    * TEST
    */
    test('Values with new lines 3', () => {
        const configStr = `\
[General]
key = value2
`;

        const expectedStr = `\
[General]
key = ComplexApp
`;

        const config = parseIniFromString(configStr);
        expect(modifyConfigurationSectionKey(config, "General", "key", "ComplexApp")).toStrictEqual(expectedStr);
    });
});