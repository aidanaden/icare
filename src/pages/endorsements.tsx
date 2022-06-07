import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import EndorsementTable from "@/components/Table/EndorsementTable";
import theme from "@/styles/theme";
import useAuth from "@/hooks/useAuth";
import { NominationFilter, UserRole } from "@/enums";
import { fetchNominations } from "@/lib/nominations";
import { getStatusFromData } from "@/utils";
import Unauthorized from "@/components/UnauthorizedAccess";
import { useState, useEffect } from "react";
import { NominationDataTableData } from "@/interfaces";

// ALL nominations made by staff of department of HOD
// (pending, submitted/not endorsed, endorsed)

const Endorsements: NextPage = () => {
  const { user } = useAuth();
  const [nominations, setNominations] = useState<NominationDataTableData[]>([]);

  useEffect(() => {
    const fetchEndorsementNominations = async () => {
      const resp = await fetchNominations(
        user?.staff_id,
        NominationFilter.SUBMITTED
      );
      console.log("fetched nominations endorsements: ", resp);
      setNominations(resp);
    };
    fetchEndorsementNominations();
  }, []);

  if (true) {
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
          <EndorsementTable
            data={nominations.map((data: any) => getStatusFromData(data))}
          />
        </ShadowBox>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
};

export default Endorsements;
