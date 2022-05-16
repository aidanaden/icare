import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { data } from "@/utils";
import EndorsementTable from "@/components/Table/EndorsementTable";
import theme from "@/styles/theme";

const Endorsements: NextPage = () => {
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
        <EndorsementTable data={data} />
      </ShadowBox>
    </Box>
  );
};

export default Endorsements;
