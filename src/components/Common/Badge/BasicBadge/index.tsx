import Box, { BoxProps } from "@mui/material/Box";

export default function index({ children, ...other }: BoxProps) {
  return (
    <Box
      component={"span"}
      p={1}
      borderRadius={1.5}
      fontWeight={600}
      fontSize="12px"
      textTransform={"capitalize"}
      {...other}
    >
      {children}
    </Box>
  );
}
