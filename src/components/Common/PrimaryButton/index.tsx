import { LoadingButton, LoadingButtonProps } from "@mui/lab";

export default function index({ children, ...other }: LoadingButtonProps) {
  return (
    <LoadingButton
      variant={"contained"}
      color={"secondary"}
      disableElevation
      {...other}
    >
      {children}
    </LoadingButton>
  );
}
