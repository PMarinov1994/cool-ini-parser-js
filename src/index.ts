import { addConfigurationSectionKey, addConfigurationSectionKeyByIndex } from "./adder";
import { modifyConfigurationSectionKey, modifyConfigurationSectionKeyByIndex } from "./modifier";
import { parseIniFromString } from "./parser";
import { removeConfigurationSectionKey, removeConfigurationSectionKeyByIndex } from "./remover";
// import { Section, SectionEntry, Configuration } from "./types";

export {
    parseIniFromString,
    addConfigurationSectionKey, addConfigurationSectionKeyByIndex,
    modifyConfigurationSectionKey, modifyConfigurationSectionKeyByIndex,
    removeConfigurationSectionKey, removeConfigurationSectionKeyByIndex,
}
