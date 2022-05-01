import Box, { BoxProps } from "@mui/material/Box";

export default function index({ children, ...other }: BoxProps) {
  return (
    <Box boxShadow={25} bgcolor="white" borderRadius={"12px"} {...other}>
      {children}
    </Box>
  );
}
