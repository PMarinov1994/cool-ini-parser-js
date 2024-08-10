import { addConfigurationSectionKey, addConfigurationSectionKeyByIndex } from "./adder";
import { modifyConfigurationSectionKey, modifyConfigurationSectionKeyByIndex } from "./modifier";
import { parseInitFromString } from "./parser";
import { removeConfigurationSectionKey, removeConfigurationSectionKeyByIndex } from "./remover";
// import { Section, SectionEntry, Configuration } from "./types";

export {
    parseInitFromString,
    addConfigurationSectionKey, addConfigurationSectionKeyByIndex,
    modifyConfigurationSectionKey, modifyConfigurationSectionKeyByIndex,
    removeConfigurationSectionKey, removeConfigurationSectionKeyByIndex,
}
