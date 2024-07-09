import { parseInitFromString } from "./parser";
import { Section } from "./types";

const testString =
`[ss]
k=v


[test:section] ; Comment
param=val
param=value
param2 = value ; Example comment

; Example comment
param3 =
   value
   ; Example comment
   value2 ; Example comment
   value3


   value4

[section2] ; Emptry Section
         ; Empty Section 22
; Empty Section 22

       
[section3]
key  =       value

   

ke = 
  val
`;

const config = parseInitFromString(testString);
for (var section of config.sections) {
    console.log(`[${section.name}]`);

    for (var entry of section.entries) {
        console.log(`-> ${entry.key} = ${entry.value.replaceAll('\n', "\\n")}`);
    }
}