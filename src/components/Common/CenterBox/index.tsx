import Box from "@mui/material/Box";

export default function index({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 auto",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
