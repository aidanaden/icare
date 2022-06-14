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
import { useNominations } from "@/lib/nominations";
import { getStatusFromData } from "@/utils";
import { useState, useEffect } from "react";
import { NominationDataTableData } from "@/interfaces";
import { getCookie, getCookies } from "cookies-next";
import useSWR from "swr";

// 1. user data (name, staff_id, department, designation, role)
// 2. number of nominations created by staff
// 3. number of nominations made TO staff
// 4. nominations made by staff
// 5. draft nominations made by staff

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const { data, error, loading } = useNominations(
    user?.staff_id,
    NominationFilter.USER
  );
  const draftNominations = data?.filter((nom: any) => nom.draft_status);
  const completedNominations = data?.filter((nom: any) => !nom.draft_status);
  const endorsedNominations = data?.filter(
    (nom: any) => nom.endorsement_status === EndorsementStatus.COMMENDABLE
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
            value={data?.length ?? 0}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic
            title="Nominations incomplete"
            value={draftNominations?.length ?? 0}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Statistic
            title="Nominations endorsed"
            value={endorsedNominations?.length ?? 0}
            loading={loading}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <SectionHeader>Incompleted nominations</SectionHeader>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="#212b36"
                  sx={{
                    marginLeft: "12px",
                    alignItems: "baseline",
                  }}
                >
                  based on last 10 nominations
                </Typography>
              </Box>
              <SimpleTableLink href="/nominations">View all</SimpleTableLink>
            </Stack>
            <SimpleTable rows={draftNominations ?? []} />
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <SectionHeader>Completed nominations</SectionHeader>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="#212b36"
                  sx={{
                    marginLeft: "12px",
                    alignItems: "baseline",
                  }}
                >
                  based on last 10 nominations
                </Typography>
              </Box>
              <SimpleTableLink href="/nominations">View all</SimpleTableLink>
            </Stack>
            <SimpleTable rows={completedNominations ?? []} />
          </ShadowBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
