import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { DepartmentType, NominationFormStatus } from "@/enums";
import { createData } from "@/utils";
import CommitteeTable from "@/components/Table/CommitteeTable";
import theme from "@/styles/theme";
import useNominations from "@/hooks/useNominations";
import useAuth from "@/hooks/useAuth";
import { DataTableSampleData } from "@/constants";

// ALL nominations (endorsed, submitted/not endorsed,
// service level award shortlisted, service level award winners,
// top winner shortlisted, top winners)

const Nominations: NextPage = () => {
  const { user } = useAuth();
  const { committeeNominations, fetchCommitteeNominations } = useNominations();

  if (committeeNominations === undefined && user) {
    fetchCommitteeNominations(user.staff_id);
  }

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
          <NextMuiLink color="#919EAB" href="/committee" fontSize="14px">
            Committee
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      <ShadowBox borderRadius="20px">
        <CommitteeTable data={DataTableSampleData} />
      </ShadowBox>
    </Box>
  );
};

export default Nominations;
