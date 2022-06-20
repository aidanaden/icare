import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import StepForm from "@/components/Forms/StepForm";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";
import Unauthorized from "@/components/UnauthorizedAccess";
import { UserRole } from "@/enums";

const Nomination: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

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

  if (!user?.role.includes(UserRole.COMMITTEE)) {
    return (
      <Box>
        <Box mb={4}>
          <SectionHeader mb={2}>Edit Nomination</SectionHeader>
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
            <NextMuiLink color="#212B36" href="/dashboard" fontSize="14px">
              Dashboard
            </NextMuiLink>
            <NextMuiLink color="#919EAB" href="#" fontSize="14px">
              Edit
            </NextMuiLink>
          </Breadcrumbs>
        </Box>
        {id && (
          <ShadowBox p={{ xs: 4, md: 8 }}>
            <StepForm
              recoilFormState={editNominationFormState}
              case_id={id as string}
              isEdit={true}
            />
          </ShadowBox>
        )}
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
};

export default Nomination;
