import { Box, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";

import ShadowBox from "@/components/Common/ShadowBox";
import Statistic from "@/components/Statistic";
import SectionHeader from "@/components/Common/SectionHeader";
import DashboardCarousel from "@/components/Common/Carousel/DashboardCarousel";
import SimpleTable from "@/components/Table/SimpleTable";
import NextMuiLink from "@/components/Common/NextMuiLink";

const Dashboard: NextPage = () => {
  return (
    <Box height="200vh">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography mb={2} fontWeight={500}>
            Hello jolynn (S10164582),
          </Typography>
          <DashboardCarousel />
        </Grid>
        <Grid item xs={12} md={4}>
          <Statistic title="Nominations made" value={42} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Statistic title="Nominations incomplete" value={42} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Statistic title="Nominations endorsed" value={42} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShadowBox p={4}>
            <SectionHeader mb={4}>Incompleted nominations</SectionHeader>
            <SimpleTable />
          </ShadowBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ShadowBox p={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <SectionHeader>Completed nominations</SectionHeader>
              <NextMuiLink href="/nominations/completed">View all</NextMuiLink>
            </Stack>
            <SimpleTable />
          </ShadowBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
