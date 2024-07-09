import { parseInitFromString } from "./parser";
import { Section } from "./types";

const testString =
`;Comment`;

const config = parseInitFromString(testString);
for (var section of config.sections) {
    console.log(`[${section.name}]`);

    for (var entry of section.entries) {
        console.log(`-> ${entry.key} = ${entry.value.replaceAll('\n', "\\n")}`);
    }
}