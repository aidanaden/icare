import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { DataTableSampleData } from "@/constants";
import EndorsementTable from "@/components/Table/EndorsementTable";
import theme from "@/styles/theme";
import useNominations from "@/hooks/useNominations";
import useAuth from "@/hooks/useAuth";

// ALL nominations made by staff of department of HOD
// (pending, submitted/not endorsed, endorsed)

// export async function getInitialProps() {
//   // Return as props
//   return {
//     props: {
//       SampleNominationQueryData,
//     },
//   };
// }

const Endorsements: NextPage = () => {
  const { user } = useAuth();
  const { endorsements, fetchEndorsements } = useNominations();
  if (endorsements === undefined && user) {
    fetchEndorsements(user.staff_id);
  }
  return (
    <Box>
      <Box mb={4}>
        <SectionHeader mb={2}>Endorsements</SectionHeader>
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
          <NextMuiLink color="#919EAB" href="/endorsements" fontSize="14px">
            Endorsements
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      <ShadowBox borderRadius="20px">
        <EndorsementTable data={DataTableSampleData} />
      </ShadowBox>
    </Box>
  );
};

export default Endorsements;
