import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs, IconButton } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { NominationFilter, UserRole } from "@/enums";
import CommitteeTable from "@/components/Table/CommitteeTable";
import useAuth from "@/hooks/useAuth";
import { useNominations } from "@/lib/nominations";
import Unauthorized from "@/components/Common/UnauthorizedAccess";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { nominationYearState } from "@/atoms/nominationYearAtom";
import { useRecoilState } from "recoil";
import { Refresh } from "@mui/icons-material";

// ALL nominations (endorsed, submitted/not endorsed,
// service level award shortlisted, service level award winners,
// top winner shortlisted, top winners)

const Nominations: NextPage = () => {
  const { user } = useAuth();
  const [getNominationYearState, setNominationYearState] =
    useRecoilState(nominationYearState);
  const { data, error, loading, mutate } = useNominations(
    user?.staff_id,
    NominationFilter.ALL,
    getNominationYearState
  );

  if (user?.role.includes(UserRole.COMMITTEE)) {
    return (
      <Box>
        <Box mb={4}>
          <SectionHeader mb={2}>Nominations</SectionHeader>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
              <NextMuiLink color="#919EAB" href="/committee" fontSize="14px">
                Committee
              </NextMuiLink>
            </Breadcrumbs>
            <IconButton onClick={() => mutate()}>
              <Refresh />
            </IconButton>
          </Box>
        </Box>
        <ShadowBox borderRadius="20px">
          {data ? <CommitteeTable data={data} /> : <FallbackSpinner />}
        </ShadowBox>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
};

export default Nominations;
