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
  UserRole,
} from "@/enums";
import { getStatusFromData } from "@/utils";
import CommitteeTable from "@/components/Table/CommitteeTable";
import useAuth from "@/hooks/useAuth";
import { fetchAPI, fetchNominations } from "@/lib/nominations";
import Unauthorized from "@/components/UnauthorizedAccess";
import { useEffect, useState } from "react";
import { NominationDataTableData } from "@/interfaces";

// ALL nominations (endorsed, submitted/not endorsed,
// service level award shortlisted, service level award winners,
// top winner shortlisted, top winners)

const Nominations: NextPage = () => {
  const { user } = useAuth();
  const [nominations, setNominations] = useState<NominationDataTableData[]>([]);

  useEffect(() => {
    const fetchCommitteeNominations = async () => {
      const resp = await fetchNominations(user?.staff_id, NominationFilter.ALL);
      console.log("fetched nominations committee: ", resp);
      setNominations(resp);
    };
    fetchCommitteeNominations();
  }, []);

  if (user?.role === UserRole.COMMITTEE) {
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
            data={nominations.map((data: any) => getStatusFromData(data))}
          />
        </ShadowBox>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
};

export default Nominations;
