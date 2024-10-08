# TypeScript parser for *.ini files
Yet another parser for INI files. This parser supports multiline values without escaping the new line symbol. Sections and key/values can be indented. Comes with API for content modifications. Currently the following modifications are supported:
- Adding keys with/without values
- Removing keys
- Changing the value of a key

Each modification generates a string which holds the new configuration. Modifications respect the original content's formatting and comments.

## Installation
To Install run:
```
npm install cool-ini-parser
```

## API
### Parse API
Parse the configuration.ini file using the function *parseIniFromString(...)*. It will return a *Configuration* object.
```
import { parseIniFromString } from 'cool-ini-parser'
import { Configuration } from "cool-ini-parser/dist/types";

const content = "..."; // The ini file content
const config: Configuration = parseIniFromString(content);
```

#### Configuration
- *indentSymbol: string* - The last key's indentation symbol (' ' or '\t'). This symbol will be used when new key/values are added and they need to be indented.
- *content: string* - The string content of the configuration.
- *sections: Section[]* - Array of parsed sections

#### Section
- *startOffset: number* - Index in the *Configuration.content* string where this section starts. Used internally for modifications.
- *endOffset: number* - Index in the *Configuration.content* string where this section ends. Used internally for modifications.
- *name: string* - The name of the section
- *entries: SectionEntry[]* - Array of parsed key/values

#### SectionEntry
- *key* - The name of the key
- *value* - The parsed value, trimmed of whitespaces. Multiline values will be separated by '\n'. Keys without a value will return empty string.
- *rawValue* - The value with all whitespaces and indentations.
- *keyStartOffset* - The start index of the key
- *valueStartOffset* - The start index of the value. If no value is pressent, the index will be -1.
- *rawValueEndOffset* - The index of the last symbol in the *rawValue*. Usually this will be a new line or the EOF. If no value is pressent, the index will be -1.
- *delimiterOffset* - The index of the key/value delimiter. If no delimiter is pressent, the index will be -1.

### Modification API
#### Adding a key with value
```
import { parseIniFromString, addConfigurationSectionKey } from 'cool-ini-parser';
import { Configuration } from "cool-ini-parser/dist/types";

const content: string = '...';
const config: Configuration = parseIniFromString(content);

const newContent: string = addConfigurationSectionKey(config, "section", "newKey", "newValue");
```
- *addConfigurationSectionKey(config: Configuration, section: string, key: string, value: string): string | undefined* - adds a key with value at the end of the section to the configuration. If there are multiple sections with the same name, the key will be added to the first section.  
**input parameters**:  
*config* - The configuration object to modify  
*section* - The name of the section to which the key should be added.  
*key* - The name of the new key  
*value* - The value string. If a multilined value needs to be added, you can concatenate it with just new lines ('\n'). The API will format and indent it as necessary. If you want to add just a key without a value, pass an empty string for value. A key without a delimiter will be added.  
**return value** - A string with the modified content. The original content's comment and indentation is preserved. Returns *undefined* if any error is detected, like invalid section name.

- *addConfigurationSectionKeyByIndex(config: Configuration, sectionIdx: number, key: string, value: string): string | undefined* - If the configuration file has multiple sections with the same name, this method will let you specify the section's index for better control of where to add the new key.

#### Removing a key
```
import { parseIniFromString, removeConfigurationSectionKey } from 'cool-ini-parser'
import { Configuration } from "cool-ini-parser/dist/types";

const content: string = '...';
const config: Configuration = parseIniFromString(content);

const newContent: string = removeConfigurationSectionKey(config, "section", "key");
```
- *removeConfigurationSectionKey(config: Configuration, section: string, key: string): string | undefined* - removes a key from the section. If there are multiple sections with the same name, the first found section will be selected. Same goes for the key.  
**input parameters**:  
*config* - The configuration object to modify  
*section* - The name of the section from which the key should be removed.  
*key* - The name of the key to remove  
**return value** - A string with the modified content. The original content's comment and indentation is preserved. Returns *undefined* if any error is detected, like invalid section name.

- *removeConfigurationSectionKeyByIndex(config: Configuration, sectionIdx: number, keyIdx: number): string | undefined* - If the configuration file has multiple sections with the same name and keys this method will let you specify the section and key indexes for better control of where to remove the key.

#### Modifing the value of a key
```
import { parseIniFromString, modifyConfigurationSectionKey } from 'cool-ini-parser'
import { Configuration } from "cool-ini-parser/dist/types";

const content: string = '...';
const config: Configuration = parseIniFromString(content);

const newContent: string = modifyConfigurationSectionKey(config, "section", "newKey", "newValue");
```

- *modifyConfigurationSectionKey(config: Configuration, section: string, key: string, newValue: string): string | undefined* - modifies the value of a key. If there are multiple sections with the same name, the first found section will be selected. Same goes for the key.  
**input parameters**:  
*config* - The configuration object to modify  
*section* - The name of the section in which the key should be modified.  
*key* - The name of the key to modify  
*value* - The new value to set  
**return value** - A string with the modified content. The original content's comment and indentation is preserved. Returns *undefined* if any error is detected, like invalid section name.

- *modifyConfigurationSectionKeyByIndex(config: Configuration, sectionIdx: number, keyIdx: number, newValue: string): string | undefined* - If the configuration file has multiple sections with the same name and keys this method will let you specify the section and key indexes for better control of where to modify the key.

## Basic rules
This parser follows the native Python 3 configparser rules (https://docs.python.org/3/library/configparser.html) which in turn follows the Microsoft Windows INI files structure.

#### Sections
- Section headers are mandatory. If a key is declared before a section, the parser will throw an exception.
- Sections must always be on a single line
- No non-whitespace charecters are allowed on the same line outside the section's perimeter ('[' and ']'). Comments are allowed.  
✅ [section name]  
✅ [section name] ; Comment  
❌ [section] name  
❌ [section] name ; Comment  
- Sections can be indented  
✅ |[section name]  
✅ |     [section name]  

#### Keys and Values
- A key/value pair is delimited by the symbols ':' and '='  
✅ key : value  
✅ key = value  
- Keys can have empty values:  
✅ key  
✅ key =
- A value can spawn multiple lines. For a new line to be considered as a value line, it needs to be more indented than the key it belongs to.  
```
key = value
 value
```

This will give us a single key *key* with value *value\nvalue*
```
key = value
value
```

This will give us two keys: *key* with value *value* and *value* with empty value

-  Key's indentationis not linked to the section's indentation. The following are all valid cases:
```
[section]
    key = value
```
```
    [section]
key = value
```

- The keys in the same section are restricted to the same indentation. Multiple keys in the same section can have different indentation,
but only in a decreasing amount.
```
[section]
        key1 = value1
    key2 = value2
key3 = value3
```

This example will give us 3 keys with their respective values.
```
[section]
    key1 = value1
        key2 = value2
key3 = value3
```

This example however will give us 2 keys:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*key1* with value: *value1\nkey2 = value2*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*key3* with value: *value3*

- The key's value can have multiple blank lines. The indentation restriction of the value still applies
```
key =


    value
```

This will produce a key with value *value*

- The key's delimiter MUST BE on the same line as the key's definition. The following are **invalid** examples  

❌ Invalid example
```
    key
        = value
```
❌ Invalid example
```
    key
        =
        value
```
❌ Invalid example
```
    key
    =
     value
```

#### Comments
- Comments start with the symbols ';' and/or '#' and end at the end of the line.
- Once a comment is started, it always ends at the end of the line.
- Comments are single line only. There is't a comment block symbol.
```
    ; Comment line 1
    ; Comment line 2
    # Comment line 3
    [section] ; Comment line 4
    key = value # Comment line 5
    # Comment ; line 6
    key2 = value
    ; Comment # line 7
    key3 = value
```
- Every symbol after the comment symbol is ignored by the parser.
- The TypeScript objects DO NOT hold any comments.
- Comments are "*invisible*" to the parser and can not be retrieved.
- The modification API will preserve any comments that are not intertwine in a value. This means that any comment that is
on the same line as a value, which is going to change, will be lost. Values that spawn multiple lines and have comments
inbetween their lines will also lose their comments.

## Changelog
#### v1.1.2
- Bugfix: Adding new key would always be inserted into the first section, instead of the target section.

#### v1.1.1
- Update README.md

#### v1.1.0
- Rename method *parseInitFromString* to *parseIniFromString*
- Reorganize repository structure
- Move tests next to sources
- Build only with *NodeNext* flag
- Update documentation

#### v1.0.0
- Initial version
