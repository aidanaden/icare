import { Box, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";

import ShadowBox from "@/components/Common/ShadowBox";
import Statistic from "@/components/Statistic";
import SectionHeader from "@/components/Common/SectionHeader";
import DashboardCarousel from "@/components/Common/Carousel/DashboardCarousel";
import SimpleTable from "@/components/Table/SimpleTable/";
import SimpleTableLink from "@/components/Table/Common/SimpleTableLink";
import useAuth from "@/hooks/useAuth";
import {
  EndorsementStatus,
  NominationFilter,
  ServiceLevelWinner,
  UserRole,
} from "@/enums";
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
    user?.role.includes(UserRole.COMMITTEE)
      ? NominationFilter.ALL
      : NominationFilter.USER
  );
  const draftNominations = data?.filter(
    (nom: NominationDataTableData) => nom.draft_status
  );
  const completedNominations = data?.filter(
    (nom: NominationDataTableData) => !nom.draft_status
  );
  const endorsedNominations = data?.filter(
    (nom: NominationDataTableData) =>
      nom.endorsement_status === EndorsementStatus.COMMENDABLE
  );
  const awardedNominations = data?.filter(
    (nom: NominationDataTableData) =>
      nom.is_service_level_winner === ServiceLevelWinner.TRUE
  );
  const shortlistedNominations = data?.filter(
    (nom: NominationDataTableData) => nom.is_champion_shortlist_result
  );
  const championNominations = data?.filter(
    (nom: NominationDataTableData) => nom.is_champion_result
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
            title={
              user?.role.includes(UserRole.COMMITTEE)
                ? "Service level winners (at least 2 votes)"
                : "Nominations created"
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
                ? "Shortlisted champions (3 votes given)"
                : "Incomplete nominations"
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
                ? "Champions (3 votes given)"
                : "Nominations endorsed"
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
      </Grid>
    </Box>
  );
};

export default Dashboard;
