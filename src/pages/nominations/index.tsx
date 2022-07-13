import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import NextMuiLink from "@/components/Common/NextMuiLink";
import NominationTable from "@/components/Table/NominationTable";
import { useNominations } from "@/lib/nominations";
import { NominationFilter, UserRole } from "@/enums";
import useAuth from "@/hooks/useAuth";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import Unauthorized from "@/components/Common/UnauthorizedAccess";
import { useRecoilState } from "recoil";
import { nominationYearState } from "@/atoms/nominationYearAtom";
import { Refresh } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

// ALL nominations made by staff (draft AND completed)

const Nominations: NextPage = () => {
  const { user } = useAuth();
  const [getNominationYearState, setNominationYearState] =
    useRecoilState(nominationYearState);
  const { data, error, loading, mutate } = useNominations(
    user?.staff_id,
    NominationFilter.USER,
    getNominationYearState
  );

  if (user && !user?.role.includes(UserRole.COMMITTEE)) {
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
              <NextMuiLink color="#919EAB" href="/dashboard" fontSize="14px">
                Dashboard
              </NextMuiLink>
              <NextMuiLink color="#212B36" href="/nominations" fontSize="14px">
                Nominations
              </NextMuiLink>
            </Breadcrumbs>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", display: { xs: "none", sm: "block" } }}
              >
                Refresh
              </Typography>
              <IconButton onClick={() => mutate()}>
                <Refresh />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <ShadowBox borderRadius="20px">
          {data ? <NominationTable data={data} /> : <FallbackSpinner />}
        </ShadowBox>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
};

export default Nominations;
