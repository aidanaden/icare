import { Box, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";

import ShadowBox from "@/components/Common/ShadowBox";
import Statistic from "@/components/Statistic";
import SectionHeader from "@/components/Common/SectionHeader";
import DashboardCarousel from "@/components/Common/Carousel/DashboardCarousel";
import SimpleTable from "@/components/Table/SimpleTable/";
import SimpleTableLink from "@/components/Table/Common/SimpleTableLink";
import useAuth from "@/hooks/useAuth";
import { EndorsementStatus, NominationFilter } from "@/enums";
import { fetchNominations } from "@/lib/nominations";
import { getStatusFromData } from "@/utils";
import { useState, useEffect } from "react";
import { NominationDataTableData } from "@/interfaces";
import { getCookie, getCookies } from "cookies-next";

// 1. user data (name, staff_id, department, designation, role)
// 2. number of nominations created by staff
// 3. number of nominations made TO staff
// 4. nominations made by staff
// 5. draft nominations made by staff

const Dashboard: NextPage = () => {
  const { user, logout } = useAuth();
  const [nominations, setNominations] = useState<NominationDataTableData[]>([]);
  const [draftNominations, setDraftNominations] = useState<
    NominationDataTableData[]
  >([]);
  const [completedNominations, setCompletedNominations] = useState<
    NominationDataTableData[]
  >([]);
  const [endorsedNominations, setEndorsedNominations] = useState<
    NominationDataTableData[]
  >([]);

  useEffect(() => {
    const fetchUserNominations = async () => {
      const cookieName = getCookie("Name");
      const cookieUserRole = getCookie("User_Role");
      console.log("dashboard all cookies: ", getCookies());
      console.log("dashboard cookie user name: ", cookieName);
      console.log("dashboard cookie user role value: ", cookieUserRole);

      const resp = await fetchNominations(
        user?.staff_id,
        NominationFilter.USER
      );
      console.log("fetched nominations dashboard: ", resp);
      setNominations(resp);

      const draftResp = resp.filter((nom: any) => nom.draft_status);
      console.log("fetched draft resp: ", draftResp);
      setDraftNominations(draftResp);

      const completedResp = resp.filter((nom: any) => !nom.draft_status);
      console.log("fetched completed resp: ", completedResp);
      setCompletedNominations(completedResp);

      const endorsedResp = resp.filter(
        (nom: any) => nom.endorsement_status === EndorsementStatus.COMMENDABLE
      );
      console.log("fetched endorsed resp: ", endorsedResp);
      setEndorsedNominations(endorsedResp);
    };

    fetchUserNominations();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography mb={2} fontWeight={500}>
            Hello {user?.name} ({user?.staff_id}),
          </Typography>
          <DashboardCarousel />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic title="Nominations created" value={nominations.length} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic
            title="Nominations incomplete"
            value={draftNominations.length}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic
            title="Nominations endorsed"
            value={endorsedNominations.length}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShadowBox px={3} py={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <SectionHeader>Incompleted nominations</SectionHeader>
              <SimpleTableLink href="/nominations">View all</SimpleTableLink>
            </Stack>
            <SimpleTable rows={draftNominations} />
          </ShadowBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ShadowBox px={3} py={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <SectionHeader>Completed nominations</SectionHeader>
              <SimpleTableLink href="/nominations">View all</SimpleTableLink>
            </Stack>
            <SimpleTable rows={completedNominations} />
          </ShadowBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
