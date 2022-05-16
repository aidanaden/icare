import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import Box from "@mui/material/Box";
import SectionHeader from "@/components/Common/SectionHeader";
import ShadowBox from "@/components/Common/ShadowBox";
import { Breadcrumbs, Grid, Stack } from "@mui/material";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { data } from "@/utils";
import EndorsementTable from "@/components/Table/EndorsementTable";
import theme from "@/styles/theme";
import UserDetails from "@/components/UserDetails";
import HODDetails from "@/components/HODDetails";
import NominationDetails from "@/components/NominationDetails";
import CommitteeDetails from "@/components/CommitteeDetails";
import CommitteeMemberDetails from "@/components/CommitteeMemberDetails";

const View: NextPage = () => {
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
            endorsement_status="Commendable"
            endorsement_date={new Date()}
            comments="Lots of comments!"
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
                  title="Johnny's score"
                  service_level="Super"
                  feedback="Bunch of feedback comments here..."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CommitteeMemberDetails
                  title="Johnny's score"
                  service_level="Super"
                  feedback="Bunch of feedback comments here..."
                />
              </Grid>
            </Grid>
            <CommitteeMemberDetails
              title="Your score"
              service_level="Super amazing"
              feedback="Bunch of MY feedback comments here..."
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default View;
