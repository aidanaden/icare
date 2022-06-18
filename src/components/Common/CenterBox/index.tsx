import Box, { BoxProps } from "@mui/material/Box";

export default function index({ children, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 auto",
        flexDirection: "column",
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
