import { TextFieldElement, TextFieldElementProps } from "react-hook-form-mui";
import styled from "@emotion/styled";

const StyledTextField = styled(TextFieldElement)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
  },
  color: "secondary",
  backgroundColor: "white",
});

export default function index({
  name,
  children,
  ...other
}: TextFieldElementProps) {
  return <StyledTextField name={name} {...other}>{children}</StyledTextField>;
}
