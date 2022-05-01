import { Button, ButtonProps } from "@mui/material";

export default function index({ children, ...other }: ButtonProps) {
  return (
    <Button
      variant={"contained"}
      color={"secondary"}
      disableElevation
      {...other}
    >
      {children}
    </Button>
  );
}
