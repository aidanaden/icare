import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import {
  DepartmentType,
  NominationFilter,
  NominationFormStatus,
} from "@/enums";
import { createData, getStatusFromData } from "@/utils";
import CommitteeTable from "@/components/Table/CommitteeTable";
import theme from "@/styles/theme";
import useAuth from "@/hooks/useAuth";
import { useFetchNominations } from "@/lib/nominations";

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
    NominationFormStatus.AWARDED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
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
    DepartmentType.AUDIT,
    NominationFormStatus.AWARDED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
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
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
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
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
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
    NominationFormStatus.SHORTLISTED,
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
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
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
    NominationFormStatus.AWARDED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
    new Date()
  ),
  createData(
    "Jolynn",
    DepartmentType.IT,
    NominationFormStatus.SHORTLISTED,
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
    DepartmentType.AUDIT,
    NominationFormStatus.AWARDED,
    new Date()
  ),
];

// ALL nominations (endorsed, submitted/not endorsed,
// service level award shortlisted, service level award winners,
// top winner shortlisted, top winners)

const Nominations: NextPage = () => {
  const { user } = useAuth();
  const { nominationData, isLoading, isError } = useFetchNominations(
    user?.staff_id,
    NominationFilter.ENDORSED
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
          <NextMuiLink color="#919EAB" href="/committee" fontSize="14px">
            Committee
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      <ShadowBox borderRadius="20px">
        <CommitteeTable
          data={nominationData?.map((data: any) => getStatusFromData(data))}
        />
      </ShadowBox>
    </Box>
  );
};

export default Nominations;
