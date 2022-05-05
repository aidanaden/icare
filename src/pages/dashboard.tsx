import { Box, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";

import ShadowBox from "@/components/Common/ShadowBox";
import Statistic from "@/components/Statistic";
import SectionHeader from "@/components/Common/SectionHeader";
import DashboardCarousel from "@/components/Common/Carousel/DashboardCarousel";
import SimpleTable from "@/components/Table/SimpleTable/";
import SimpleTableLink from "@/components/Table/Common/SimpleTableLink";

const Dashboard: NextPage = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography mb={2} fontWeight={500}>
            Hello jolynn (S10164582),
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
