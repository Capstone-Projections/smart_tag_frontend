import styled from "styled-components/native";
import { AppTextProps } from "./AppText.prop";
import {
      appBlue,
      coursesdBlue,
      coursesdBlue2,
      coursesdGreen,
      coursesdYellow,
} from "../../../resources/colors/colors";

//getting colors of the application from the colors file

export const Text = styled.Text<AppTextProps>`
      color: ${(props) =>
            props.color === "white"
                  ? "white"
                  : props.color === "appblue"
                  ? appBlue
                  : props.color === "coursesdblue"
                  ? coursesdBlue
                  : props.color === "courseslblue"
                  ? coursesdBlue2
                  : props.color === "courseslgreen"
                  ? coursesdGreen
                  : props.color === "coursesyellow"
                  ? coursesdYellow
                  : "black"};
      fontfamily: ${(props) =>
            props.font === "inter"
                  ? "Inter"
                  : props.weight === "bold"
                  ? "Poppins-Medium"
                  : "Poppins"};
      fontsize: ${(props) =>
            props.type === "linksnheadings"
                  ? "15px"
                  : props.type === "welcome"
                  ? "28px"
                  : props.type === "pages"
                  ? "10px"
                  : props.type === "ustudent"
                  ? "21px"
                  : props.type === "people"
                  ? "16px"
                  : "18px"};
      textalign: ${(props) =>
            props.type === "pages"
                  ? "center"
                  : props.type === "ustudent"
                  ? "center"
                  : "left"};
`;
