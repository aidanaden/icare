import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import { Breadcrumbs, Grid, Stack } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import UserDetails from "@/components/UserDetails";
import HODDetails from "@/components/HODDetails";
import NominationDetails from "@/components/NominationDetails";
import CommitteeDetails from "@/components/CommitteeDetails";
import CommitteeMemberDetails from "@/components/CommitteeMemberDetails";
import { EndorsementStatus, UserRole } from "@/enums";
import { useNominationDetails } from "@/lib/nominations";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const View: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useNominationDetails(id?.toString());

  console.log("id is: ", id);
  console.log("nomination detail data: ", data);

  return (
    <Box>
      <Box mb={4}>
        <SectionHeader mb={2}>Nomination Details</SectionHeader>
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
          <NextMuiLink color="#212B36" href="/nominations" fontSize="14px">
            Nominations
          </NextMuiLink>
          <NextMuiLink color="#919EAB" href="/nominations" fontSize="14px">
            View
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <UserDetails
              title="Nominee"
              name={data?.nominee_name}
              designation={data.nominee_designation}
              department={data.nominee_department}
              team={data.nominee_team}
              loading={!data}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserDetails
              title="Nominator"
              name={data.nominator_name}
              designation={data.nominator_designation}
              department={data.nominator_department}
              team={data.nominator_team}
              loading={!data}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <NominationDetails
              title="Details"
              case_id={id}
              service_level={data.quiz_service_level}
              description={data.nomination_reason}
              draft_status={data.draft_status}
              attachment_list={data.attachment_list ?? []}
              loading={!data}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HODDetails
              case_id={id as string}
              hod_id={data.hod_id}
              title="Head of Department"
              name={data.hod_name}
              designation={data.hod_designation}
              department={data.hod_department}
              endorsement_status={data.endorsement_status}
              endorsement_date={data.endorsement_date}
              comments={data.hod_comments}
              loading={!data}
              isEditable={
                data.hod_id === user?.staff_id &&
                data.endorsement_status === EndorsementStatus.PENDING
              }
            />
          </Grid>
          {user?.role.includes(UserRole.COMMITTEE) && (
            <Grid item xs={12}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CommitteeDetails
                      title="Committee Score"
                      final_score={data.committee_total_score}
                      final_service_level={data.committee_service_level_result}
                      is_service_level_winner={data.is_service_level_winner}
                      is_champion_shortlist_result={
                        data.is_champion_shortlist_result
                      }
                      is_champion_result={data.is_champion_result}
                      loading={loading}
                    />
                  </Grid>
                  {data?.committee_comment.map((committeeData) => (
                    <Grid item xs={12} sm={6} key={committeeData.case_id}>
                      <CommitteeMemberDetails
                        case_id={id as string}
                        committee_id={committeeData.committee_id}
                        name={committeeData.committee_name}
                        designation={committeeData.committee_designation}
                        department={committeeData.committee_department}
                        default_service_level={data.quiz_service_level}
                        service_level={committeeData.committee_service_level}
                        service_level_award={
                          committeeData.service_level_winner_status
                        }
                        champion_shortlist_status={
                          data.is_champion_shortlist_result
                        }
                        champion_status={committeeData.champion_status}
                        comments={committeeData.committee_comments}
                        isEditable={
                          committeeData.committee_id === user?.staff_id
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default View;
