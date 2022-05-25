import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs, Grid, Stack } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { DataTableSampleData, SampleNominationQueryData } from "@/constants";
import EndorsementTable from "@/components/Table/EndorsementTable";
import theme from "@/styles/theme";
import UserDetails from "@/components/UserDetails";
import HODDetails from "@/components/HODDetails";
import NominationDetails from "@/components/NominationDetails";
import CommitteeDetails from "@/components/CommitteeDetails";
import CommitteeMemberDetails from "@/components/CommitteeMemberDetails";
import { NominationQueryData } from "@/interfaces";
import { EndorsementStatus, ServiceLevel, ShortlistStatus } from "@/enums";

// ALL nomination data (based on nomination ID)

export async function getInitialProps() {
  // Return as props
  return {
    props: {
      SampleNominationQueryData,
    },
  };
}

interface NominationDetailProps {
  nominationFormData: NominationQueryData;
}

const View: NextPage<NominationDetailProps> = ({ nominationFormData }) => {
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
            name="Jolynn"
            designation="Manager"
            department="Business Development"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserDetails
            title="Nominator"
            name="Shiqi"
            designation="Intern"
            department="Tech"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NominationDetails
            title="Details"
            service_level="Desired"
            description="Nomination descripiton very long "
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HODDetails
            title="Head of Department"
            name="Eileen"
            designation="COO"
            department="Tech"
            endorsement_status={EndorsementStatus.COMMENDABLE}
            endorsement_date={new Date()}
            comments="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CommitteeDetails
                  title="Committee Score"
                  final_score="88"
                  final_service_level="Amazing"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CommitteeMemberDetails
                  name="Larry"
                  designation="CEO"
                  department="IT"
                  service_level={ServiceLevel.BASIC}
                  service_level_award={true}
                  champion_shortlist_status={false}
                  comments="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default View;
