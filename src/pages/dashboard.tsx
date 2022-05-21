import { Box, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";

import ShadowBox from "@/components/Common/ShadowBox";
import Statistic from "@/components/Statistic";
import SectionHeader from "@/components/Common/SectionHeader";
import DashboardCarousel from "@/components/Common/Carousel/DashboardCarousel";
import SimpleTable from "@/components/Table/SimpleTable/";
import SimpleTableLink from "@/components/Table/Common/SimpleTableLink";
import useAuth from "@/hooks/useAuth";
import useNominations from "@/hooks/useNominations";

// 1. user data (name, staff_id, department, designation, role)
// 2. number of nominations created by staff
// 3. number of nominations made TO staff
// 4. nominations made by staff
// 5. draft nominations made by staff

const Dashboard: NextPage = () => {
  const { user, logout } = useAuth();
  const { nominations, fetchNominations } = useNominations();
  if (nominations === undefined && user) {
    fetchNominations(user.staff_id);
  }
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
          <Statistic title="Nominations created" value={42} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic title="Nominations incomplete" value={42} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic title="Nominations endorsed" value={42} />
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
              <SimpleTableLink href="/nominations/incomplete">
                View all
              </SimpleTableLink>
            </Stack>
            <SimpleTable />
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
              <SimpleTableLink href="/nominations/completed">
                View all
              </SimpleTableLink>
            </Stack>
            <SimpleTable />
          </ShadowBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
