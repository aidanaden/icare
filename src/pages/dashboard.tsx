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
import { useFetchNominations } from "@/lib/nominations";
import { getStatusFromData } from "@/utils";

// 1. user data (name, staff_id, department, designation, role)
// 2. number of nominations created by staff
// 3. number of nominations made TO staff
// 4. nominations made by staff
// 5. draft nominations made by staff

const Dashboard: NextPage = () => {
  const { user, logout } = useAuth();

  const { nominationData, isLoading, isError } = useFetchNominations(
    user?.staff_id,
    NominationFilter.USER
  );

  const draftNominationData = nominationData.filter((nom) => nom.draft_status);
  const completedNominationData = nominationData.filter(
    (nom) => !nom.draft_status
  );

  const endorsedNominationData = nominationData.filter(
    (nom) => nom.endorsement_status === EndorsementStatus.COMMENDABLE
  );

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
          <Statistic
            title="Nominations created"
            value={nominationData.length}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic
            title="Nominations incomplete"
            value={draftNominationData.length}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic
            title="Nominations endorsed"
            value={endorsedNominationData.length}
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
            <SimpleTable rows={draftNominationData} />
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
            <SimpleTable rows={completedNominationData} />
          </ShadowBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
