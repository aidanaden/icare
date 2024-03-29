import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import NextMuiLink from "@/components/Common/NextMuiLink";
import EndorsementTable from "@/components/Table/EndorsementTable";
import useAuth from "@/hooks/useAuth";
import { NominationFilter, UserRole } from "@/enums";
import { useNominations } from "@/lib/nominations";
import Unauthorized from "@/components/Common/UnauthorizedAccess";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { Refresh } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

// ALL nominations made by staff of department of HOD
// (pending, submitted/not endorsed, endorsed)

const Endorsements: NextPage = () => {
  const { user } = useAuth();
  const { data, error, loading, mutate } = useNominations(
    user?.staff_id,
    NominationFilter.SUBMITTED,
    user?.year ?? new Date().getFullYear().toString()
  );

  if (!user) {
    return <FallbackSpinner />;
  }

  if (user && user?.role.includes(UserRole.HOD)) {
    return (
      <Box>
        <Box mb={4}>
          <SectionHeader mb={2}>Endorsements</SectionHeader>
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
              <NextMuiLink color="#212B36" href="/endorsements" fontSize="14px">
                Endorsements
              </NextMuiLink>
            </Breadcrumbs>
            <Stack
              direction="row"
              spacing={1}
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
          {data ? <EndorsementTable data={data} /> : <FallbackSpinner />}
        </ShadowBox>
      </Box>
    );
  }

  return <Unauthorized />;
};

export default Endorsements;
