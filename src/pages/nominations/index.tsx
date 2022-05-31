import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs, CircularProgress } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import NominationTable from "@/components/Table/NominationTable";
import { useFetchNominations } from "@/lib/nominations";
import { NominationFilter } from "@/enums";
import useAuth from "@/hooks/useAuth";
import { getStatusFromData } from "@/utils";
import { Suspense } from "react";

// ALL nominations made by staff (draft AND completed)

const Nominations: NextPage = () => {
  const { user } = useAuth();
  const { nominationData, isLoading, isError } = useFetchNominations(
    user?.staff_id,
    NominationFilter.USER
  );
  return (
    <Box>
      <Box mb={4}>
        <SectionHeader mb={2}>Nominations</SectionHeader>
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
          <NextMuiLink color="#919EAB" href="/nominations" fontSize="14px">
            Nominations
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      <ShadowBox borderRadius="20px">
        <Suspense fallback={<CircularProgress />}>
          <NominationTable
            data={nominationData?.map((data: any) => getStatusFromData(data))}
          />
        </Suspense>
      </ShadowBox>
    </Box>
  );
};

export default Nominations;
