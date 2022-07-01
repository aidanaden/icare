import { Container, ContainerProps } from "@mui/material";

export default function index({ children, ...other }: ContainerProps) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        paddingX: 4,
      }}
      {...other}
    >
      {children}
    </Container>
  );
}
