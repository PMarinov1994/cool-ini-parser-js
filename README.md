# TypeScript parser for *.ini files

A parser for INI files

## API
TODO

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
- Comments are single line only. There is not comment block symbol.
```
    ; Comment line 1
    ; Comment line 2
    \# Comment line 3
    [section] ; Comment line 4
    key = value \# Comment line 5
    \# Comment ; line 6
    key2 = value
    ; Comment \# line 7
    key3 = value
```
- Every symbol after the comment symbol is ignored by the parser.
- The TypeScript objects DO NOT hold any comments.
- Comments are "*invisible*" to the parser and can not be retrieved.
- The modification API will preserve any comments that are not intertwine in a value. This means that any comment that is
on the same line as a value, which is going to change, will be lost. Values that spawn multiple lines and have comments
inbetween their lines will also lose their comments.