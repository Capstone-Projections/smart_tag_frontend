import { TextWeightOptions, TextTypeOptions } from "../Text/AppText.prop";
export interface AppEntryProps {
      type?: EntryTypeOptions;
      text?: string; //this stands for the text that would be ontop of the entry field
      placeholder?: string;
      textWeight?: TextWeightOptions;
      textType?: TextTypeOptions;
}

export type EntryTypeOptions = "otp" | "popup";
