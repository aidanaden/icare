import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import DataTable from "@/components/Table/DataTable";
import NextMuiLink from "@/components/Common/NextMuiLink";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NominationFormStatus } from "@/enums";
import { createData } from "@/utils";

const data = [
  createData("Jolynn", "IT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "AUDIT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "SFIT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "AUDIT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "IT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "IT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "AUDIT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "SFIT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "AUDIT", NominationFormStatus.INCOMPLETE, new Date()),
  createData("Jolynn", "IT", NominationFormStatus.INCOMPLETE, new Date()),
];

const Incomplete: NextPage = () => {
  return (
    <Box sx={{ height: "200vh", backgroundColor: "grey.100" }}>
      <Box mb={4}>
        <SectionHeader mb={1}>Nominations</SectionHeader>
        <Breadcrumbs
          separator="•"
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "#637381",
              opacity: 0.8,
            },
          }}
        >
          <NextMuiLink href="/dashboard" fontSize="14px" pr="4px">
            Dashboard
          </NextMuiLink>
          <NextMuiLink href="/nominations/all" fontSize="14px" pr="4px">
            Nominations
          </NextMuiLink>
          <NextMuiLink href="/nominations/incomplete" fontSize="14px" pr="4px">
            Incomplete
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      <ShadowBox borderRadius="20px">
        <DataTable data={data} />
      </ShadowBox>
    </Box>
  );
};

export default Incomplete;
