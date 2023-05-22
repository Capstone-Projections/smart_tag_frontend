export interface AppTextProps {
      type?: TextTypeOptions;
      color?: TextColorOptions;
      font?: TextFontOptions;
      weight?: TextWeightOptions;
}

export type TextTypeOptions =
      | "linksnheadings"
      | "welcome"
      | "pages"
      | "ustudent"
      | "people";
export type TextColorOptions =
      | "white"
      | "appblue"
      | "coursesdblue"
      | "courseslblue"
      | "courseslgreen"
      | "coursesyellow";
export type TextFontOptions = "inter";
export type TextWeightOptions = "bold";
