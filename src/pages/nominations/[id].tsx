import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs, Grid, Stack } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import EndorsementTable from "@/components/Table/EndorsementTable";
import theme from "@/styles/theme";
import UserDetails from "@/components/UserDetails";
import HODDetails from "@/components/HODDetails";
import NominationDetails from "@/components/NominationDetails";
import CommitteeDetails from "@/components/CommitteeDetails";
import CommitteeMemberDetails from "@/components/CommitteeMemberDetails";
import { EndorsementStatus, ServiceLevel, ShortlistStatus } from "@/enums";
import { fetchAPI, useFetchNominationDetails } from "@/lib/nominations";
import { useRouter } from "next/router";

const View: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { nominationDetailsData, isLoading, isError } =
    useFetchNominationDetails(id?.toString());

  console.log("nomination details: ", nominationDetailsData);

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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <UserDetails
            title="Nominee"
            name={nominationDetailsData.nominee_name}
            designation={nominationDetailsData.nominee_designation}
            department={nominationDetailsData.nominee_department}
            team={nominationDetailsData.nominee_team}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserDetails
            title="Nominator"
            name={nominationDetailsData.nominator_name}
            designation={nominationDetailsData.nominator_designation}
            department={nominationDetailsData.nominator_department}
            team={nominationDetailsData.nominator_team}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NominationDetails
            title="Details"
            case_id={id}
            service_level={nominationDetailsData.quiz_service_level.toString()}
            description={nominationDetailsData.nomination_reason}
            attachment_list={nominationDetailsData.attachment_list}
          />
          {/* TODO: add supporting file documents here */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <HODDetails
            title="Head of Department"
            name={nominationDetailsData.hod_name}
            designation={nominationDetailsData.hod_designation}
            department={nominationDetailsData.hod_department}
            endorsement_status={nominationDetailsData.endorsement_status}
            endorsement_date={nominationDetailsData.nomination_date}
            comments={nominationDetailsData.hod_comments}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CommitteeDetails
                  title="Committee Score"
                  final_score={nominationDetailsData.committee_total_score}
                  final_service_level={
                    nominationDetailsData.committee_service_level_result
                  }
                />
              </Grid>
              {nominationDetailsData.committee_comment.map((committeeData) => (
                <Grid item xs={12} sm={6} key={committeeData.case_id}>
                  <CommitteeMemberDetails
                    name={committeeData.committee_name}
                    designation={committeeData.committee_designation}
                    department={committeeData.committee_department}
                    service_level={ServiceLevel.BASIC}
                    service_level_award={true}
                    champion_shortlist_status={committeeData.shortlist_status}
                    comments={committeeData.committee_comments}
                  />
                </Grid>
              ))}

              {/* <Grid item xs={12} sm={6}>
                <CommitteeMemberDetails
                  name="Johnny"
                  designation="CEO"
                  department="IT"
                  service_level={ServiceLevel.BASIC}
                  service_level_award={false}
                  champion_shortlist_status={false}
                  comments=""
                  isEditable={true}
                />
              </Grid> */}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default View;
