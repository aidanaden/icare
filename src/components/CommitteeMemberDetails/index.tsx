import { Box, Stack } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";
import DetailHeader from "../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../Common/DetailBox/DetailSubHeader";
import DetailText from "../Common/DetailBox/DetailText";
import { ServiceLevel, ShortlistStatus } from "@/enums";
import CommitteeForm from "../Forms/CommitteeForm";

interface CommitteeMemberDetailProps {
  name: string;
  designation: string;
  department?: string | undefined;
  service_level?: ServiceLevel | undefined;
  award_shortlist_status?: boolean | undefined;
  champion_shortlist_status?: boolean | undefined;
  comments?: string | undefined;
}

export default function index(props: CommitteeMemberDetailProps) {
  const {
    name,
    designation,
    department,
    service_level,
    award_shortlist_status,
    champion_shortlist_status,
    comments,
  } = props;

  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      justifyContent="space-between"
    >
      <DetailHeader>{name}</DetailHeader>
      <Stack direction="column" spacing={4}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8, lg: 12 }}
        >
          <Box>
            <DetailSubHeader>name</DetailSubHeader>
            <DetailText>{name}</DetailText>
          </Box>
          <Box>
            <DetailSubHeader>designation</DetailSubHeader>
            <DetailText>{designation}</DetailText>
          </Box>
          <Box>
            <DetailSubHeader>department</DetailSubHeader>
            <DetailText>{department}</DetailText>
          </Box>
        </Stack>
        <CommitteeForm
          service_level={service_level}
          award_shortlist_status={award_shortlist_status}
          champion_shortlist_status={champion_shortlist_status}
          comments={comments}
        />
        {/* <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 12 }}
        >
          <Box>
            <DetailSubHeader>Endorsement status</DetailSubHeader>
            <DetailText>{endorsement_status}</DetailText>
          </Box>
          <Box>
            <DetailSubHeader>Endorsement date</DetailSubHeader>
            {endorsement_date && (
              <DetailText>{formatDateToString(endorsement_date)}</DetailText>
            )}
          </Box>
        </Stack>
        <Box>
          <DetailSubHeader>HOD Comments</DetailSubHeader>
          <DetailText noWrap={false} maxWidth="100%">
            {comments}
          </DetailText>
        </Box> */}
      </Stack>
    </ShadowBox>
  );
}
