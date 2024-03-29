import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { UserRole } from "@/enums";
import StepForm from "@/components/Form/StepForm";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { newNominationFormState } from "@/atoms/newNominationFormAtom";
import Unauthorized from "@/components/Common/UnauthorizedAccess";
import FallbackSpinner from "@/components/Common/FallbackSpinner";

const Nomination: NextPage = () => {
  const { user } = useAuth();

  // add check when user attempts to leave page
  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  if (user && !user?.role.includes(UserRole.COMMITTEE)) {
    return (
      <Box>
        <Box mb={4}>
          <SectionHeader mb={2}>New Nomination</SectionHeader>
          <Breadcrumbs
            separator="•"
            aria-label="breadcrumb"
            sx={{
              "& .MuiBreadcrumbs-separator": {
                color: "#637381",
                opacity: 0.8,
                px: 1,
              },
            }}
          >
            <NextMuiLink color="#919EAB" href="/dashboard" fontSize="14px">
              Dashboard
            </NextMuiLink>
            <NextMuiLink color="#212B36" href="/nomination" fontSize="14px">
              Nomination
            </NextMuiLink>
          </Breadcrumbs>
        </Box>
        {user && (
          <ShadowBox p={{ xs: 4, md: 8 }}>
            <StepForm recoilFormState={newNominationFormState} isEdit={false} />
          </ShadowBox>
        )}
      </Box>
    );
  } else if (user) {
    return <Unauthorized />;
  } else {
    return <FallbackSpinner />;
  }
};

export default Nomination;
