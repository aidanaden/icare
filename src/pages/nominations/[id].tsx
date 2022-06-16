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
import {
  EndorsementStatus,
  ServiceLevel,
  ServiceLevelWinner,
  UserRole,
} from "@/enums";
import { useNominationDetails } from "@/lib/nominations";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import CenterBox from "@/components/Common/CenterBox";
import ShadowBox from "@/components/Common/ShadowBox";
import FallbackSpinner from "@/components/Common/FallbackSpinner";

const View: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useNominationDetails(id?.toString());
  const otherData = data?.committee_comment.filter(
    (comm) => comm.committee_id !== user?.staff_id
  );
  const selfData = data?.committee_comment.filter(
    (comm) => comm.committee_id === user?.staff_id
  );

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
          <NextMuiLink color="#919EAB" href="#" fontSize="14px">
            View
          </NextMuiLink>
        </Breadcrumbs>
      </Box>
      {data ? (
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
                  <Grid item xs={12} sm={6}>
                    {user.staff_id !== data.hod_id ? (
                      <CommitteeMemberDetails
                        case_id={id as string}
                        committee_id={user.staff_id}
                        name={user.name}
                        default_service_level={data.quiz_service_level}
                        service_level={
                          selfData && selfData.length > 0
                            ? selfData[0].committee_service_level
                            : ServiceLevel.PENDING
                        }
                        service_level_award={
                          selfData && selfData.length > 0
                            ? selfData[0].service_level_winner_status
                            : ServiceLevelWinner.PENDING
                        }
                        champion_status={
                          selfData && selfData.length > 0
                            ? selfData[0].champion_status
                            : false
                        }
                        comments={
                          selfData && selfData.length > 0
                            ? selfData[0].committee_comments
                            : ""
                        }
                        isEditable={true}
                      />
                    ) : (
                      <ShadowBox height="120px">
                        <CenterBox height="100%">
                          You are the nominee&apos;s HOD, your vote is
                          retracted.
                        </CenterBox>
                      </ShadowBox>
                    )}
                  </Grid>
                  {otherData?.map((committeeData) => {
                    if (committeeData.committee_id !== user.staff_id) {
                      return (
                        <Grid item xs={12} sm={6} key={committeeData.case_id}>
                          <CommitteeMemberDetails
                            case_id={id as string}
                            committee_id={committeeData.committee_id}
                            name={committeeData.committee_name}
                            default_service_level={data.quiz_service_level}
                            service_level={
                              committeeData.committee_service_level
                            }
                            service_level_award={
                              committeeData.service_level_winner_status
                            }
                            champion_status={committeeData.champion_status}
                            comments={committeeData.committee_comments}
                            isEditable={
                              committeeData.committee_id === user?.staff_id
                            }
                          />
                        </Grid>
                      );
                    }
                  })}
                </Grid>
              </Stack>
            </Grid>
          )}
        </Grid>
      ) : (
        <FallbackSpinner />
      )}
    </Box>
  );
};

export default View;
