import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import DataTable from "@/components/Table/DataTable";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { DepartmentType, NominationFormStatus } from "@/enums";
import { createData } from "@/utils";

const data = [
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.SFIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.SFIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.SFIT,
    NominationFormStatus.ENDORSED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.AUDIT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SUBMITTED,
    new Date()
  ),
];

const Completed: NextPage = () => {
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
          <NextMuiLink href="/nominations/completed" fontSize="14px" pr="4px">
            Completed
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      <ShadowBox borderRadius="20px">
        <DataTable data={data} />
      </ShadowBox>
    </Box>
  );
};

export default Completed;
