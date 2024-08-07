import { addConfigurationSectionKey } from "./adder";
import { modifyConfigurationSectionKey } from "./modifier";
import { parseInitFromString } from "./parser";
import { Section } from "./types";

const testString = `\
[s]`;


const config = parseInitFromString(testString);
for (var section of config.sections) {
    console.log(`[${section.name}]`);

    for (var entry of section.entries) {
        console.log(`-> ${entry.key} = ${entry.value.replaceAll('\n', "\\n")}`);
    }
}


const newContent = addConfigurationSectionKey(config, "s", "newKey", "newValue");

console.log("--------");
console.log(newContent);
console.log("--------");