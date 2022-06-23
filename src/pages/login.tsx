import CenterBox from "@/components/Common/CenterBox";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import LoginForm from "@/components/Form/LoginForm";
import { Box } from "@mui/material";
import NextImage from "next/image";

export default function login() {
  return (
    <CenterBox sx={{ width: "100%", my: "auto" }}>
      <CenterBox mb={2}>
        <NextImage
          src={"/logo.svg"}
          alt="icare logo"
          width={484}
          height={188}
        />
      </CenterBox>
      <Box
        mx="auto"
        sx={{
          width: { xs: "100%", sm: "100%", md: "75%" },
        }}
      >
        <SectionHeader mb={1.5}>Sign in</SectionHeader>
        <SectionSubtitle mb={3}>Sign in to iCare</SectionSubtitle>
        <LoginForm />
      </Box>
    </CenterBox>
  );
}
