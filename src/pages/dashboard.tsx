import { Box, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";

import ShadowBox from "@/components/Common/ShadowBox";
import Statistic from "@/components/Statistic";
import SectionHeader from "@/components/Common/SectionHeader";
import DashboardCarousel from "@/components/Common/Carousel/DashboardCarousel";
import SimpleTable from "@/components/Table/SimpleTable/";
import SimpleTableLink from "@/components/Table/Components/SimpleTableLink";
import useAuth from "@/hooks/useAuth";
import { NominationFilter, NominationFormStatus, UserRole } from "@/enums";
import { useNominations } from "@/lib/nominations";
import { useState, useEffect } from "react";
import { NominationDataTableData } from "@/interfaces";
import PastWinnersTable from "@/components/Table/PastWinnersTable";
import FallbackSpinner from "@/components/Common/FallbackSpinner";

// 1. user data (name, staff_id, department, designation, role)
// 2. number of nominations created by staff
// 3. number of nominations made TO staff
// 4. nominations made by staff
// 5. draft nominations made by staff

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const { data, error, loading } = useNominations(
    user?.staff_id,
    user?.role.includes(UserRole.COMMITTEE)
      ? NominationFilter.ALL
      : NominationFilter.USER,
    user?.year ?? new Date().getFullYear().toString()
  );

  const draftNominations = data?.filter(
    (nom: NominationDataTableData) => nom.draft_status
  );
  const completedNominations = data?.filter(
    (nom: NominationDataTableData) => !nom.draft_status
  );
  const endorsedNominations = data?.filter(
    (nom: NominationDataTableData) =>
      nom.nomination_status === NominationFormStatus.ENDORSED
  );
  const awardedNominations = data?.filter(
    (nom: NominationDataTableData) =>
      nom.nomination_status === NominationFormStatus.AWARDED
  );
  const shortlistedNominations = data?.filter(
    (nom: NominationDataTableData) =>
      nom.nomination_status === NominationFormStatus.SHORTLISTED
  );
  const championNominations = data?.filter(
    (nom: NominationDataTableData) =>
      nom.nomination_status === NominationFormStatus.CHAMPION
  );

  if (user) {
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
              title={
                user?.role.includes(UserRole.COMMITTEE)
                  ? "Service level winners"
                  : "Nominations created"
              }
              subtitle={
                user?.role.includes(UserRole.COMMITTEE)
                  ? "(at least 2 votes)"
                  : undefined
              }
              value={
                user?.role.includes(UserRole.COMMITTEE)
                  ? awardedNominations?.length ?? 0
                  : data?.length ?? 0
              }
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Statistic
              title={
                user?.role.includes(UserRole.COMMITTEE)
                  ? "Shortlisted champions"
                  : "Incomplete nominations"
              }
              subtitle={
                user?.role.includes(UserRole.COMMITTEE)
                  ? "(3 votes given)"
                  : undefined
              }
              value={
                user?.role.includes(UserRole.COMMITTEE)
                  ? shortlistedNominations?.length ?? 0
                  : draftNominations?.length ?? 0
              }
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Statistic
              title={
                user?.role.includes(UserRole.COMMITTEE)
                  ? "Champions"
                  : "Nominations endorsed"
              }
              subtitle={
                user?.role.includes(UserRole.COMMITTEE)
                  ? "(3 votes given)"
                  : undefined
              }
              value={
                user?.role.includes(UserRole.COMMITTEE)
                  ? championNominations?.length ?? 0
                  : endorsedNominations?.length ?? 0
              }
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
                <Box>
                  <SectionHeader>
                    {user?.role.includes(UserRole.COMMITTEE)
                      ? "Awarded nominations"
                      : "Incomplete nominations"}
                  </SectionHeader>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="#212b36"
                    mt={1}
                  >
                    last 10 nominations
                  </Typography>
                </Box>
                <SimpleTableLink
                  href={
                    user?.role.includes(UserRole.COMMITTEE)
                      ? "/committee?tab=awarded"
                      : "/nominations?tab=incomplete"
                  }
                >
                  View all
                </SimpleTableLink>
              </Stack>
              <SimpleTable
                rows={
                  user?.role.includes(UserRole.COMMITTEE)
                    ? awardedNominations ?? []
                    : draftNominations ?? []
                }
              />
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
                <Box>
                  <SectionHeader>
                    {user?.role.includes(UserRole.COMMITTEE)
                      ? "Champion nominations"
                      : "Completed nominations"}
                  </SectionHeader>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="#212b36"
                    mt={1}
                  >
                    last 10 nominations
                  </Typography>
                </Box>
                <SimpleTableLink
                  href={
                    user?.role.includes(UserRole.COMMITTEE)
                      ? "/committee?tab=champion"
                      : "/nominations?tab=incomplete"
                  }
                >
                  View all
                </SimpleTableLink>
              </Stack>
              <SimpleTable
                rows={
                  user?.role.includes(UserRole.COMMITTEE)
                    ? championNominations ?? []
                    : completedNominations ?? []
                }
              />
            </ShadowBox>
          </Grid>
          <Grid item xs={12}>
            <ShadowBox borderRadius="20px" px={3} py={4}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
              >
                <Box>
                  <SectionHeader>Past winners</SectionHeader>
                  {/* <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="#212b36"
                    mt={1}
                  >
                    last 10 nominations
                  </Typography> */}
                </Box>
              </Stack>
              <PastWinnersTable />
            </ShadowBox>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <FallbackSpinner />;
  }
};

export default Dashboard;
