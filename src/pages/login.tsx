import CenterBox from "@/components/Common/CenterBox";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import LoginForm from "@/components/Form/LoginForm";
import { BASE_URL } from "@/constants";
import { Box } from "@mui/material";

export default function login() {
  return (
    <CenterBox sx={{ width: "100%", my: "auto" }}>
      <CenterBox
        mb={2}
        sx={{
          display: { xs: "none", sm: "block" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src={`${BASE_URL}/logo.svg`}
          alt="icare logo"
          width={484}
          height={188}
        />
      </CenterBox>
      <CenterBox
        mb={2}
        sx={{
          display: { xs: "block", sm: "none" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src={`${BASE_URL}/logo.svg`}
          alt="icare logo"
          width={242}
          height={94}
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
