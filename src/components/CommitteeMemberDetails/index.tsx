import { Box, Stack } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";
import DetailHeader from "../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../Common/DetailBox/DetailSubHeader";
import DetailText from "../Common/DetailBox/DetailText";
import { ServiceLevel, ServiceLevelWinner, ShortlistStatus } from "@/enums";
import CommitteeForm from "../Forms/CommitteeForm";
import GreenBadge from "../Common/Badge/GreenBadge";
import RedBadge from "../Common/Badge/RedBadge";
import GrayBadge from "../Common/Badge/GrayBadge";
import { convertServiceLevelWinnerToBoolean } from "@/utils";

interface CommitteeMemberDetailProps {
  case_id: string;
  committee_id: string;
  name: string;
  designation: string;
  department: string;
  service_level?: ServiceLevel;
  service_level_award?: ServiceLevelWinner;
  champion_shortlist_status?: boolean;
  champion_status?: boolean;
  comments?: string;
  isEditable?: boolean;
}

export default function index(props: CommitteeMemberDetailProps) {
  const {
    case_id,
    committee_id,
    name,
    designation,
    department,
    service_level,
    service_level_award,
    champion_shortlist_status,
    champion_status,
    comments,
    isEditable,
  } = props;

  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      // justifyContent="space-between"
    >
      <DetailHeader>{name}</DetailHeader>
      <Stack direction="column" spacing={4}>
        <Stack
          flexWrap="wrap"
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8, lg: 8 }}
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

        {isEditable ? (
          <CommitteeForm
            case_id={case_id}
            committee_id={committee_id}
            service_level={service_level}
            service_level_award={convertServiceLevelWinnerToBoolean(
              service_level_award
            )}
            champion_shortlist_status={champion_shortlist_status}
            champion_status={champion_status}
            comments={comments}
          />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Stack
              direction={"column"}
              spacing={4}
              height="100%"
              // mb={{ xs: 6, md: 0 }}
            >
              <Box>
                <DetailSubHeader>Service level</DetailSubHeader>
                <DetailText>{ServiceLevel[service_level!]}</DetailText>
              </Box>

              <Box>
                <DetailSubHeader mb={1.5}>Service level award</DetailSubHeader>
                {service_level_award === ServiceLevelWinner.TRUE ? (
                  <GreenBadge>Awarded</GreenBadge>
                ) : service_level_award === ServiceLevelWinner.FALSE ? (
                  <RedBadge>Not awarded</RedBadge>
                ) : (
                  <GrayBadge>Pending</GrayBadge>
                )}
              </Box>
              <Box>
                <DetailSubHeader mb={1.5}>
                  Nominated for ICare Championship
                </DetailSubHeader>
                {champion_status ? (
                  <GreenBadge>Nominated</GreenBadge>
                ) : (
                  <RedBadge>Not nominated</RedBadge>
                )}
              </Box>
              {/* <Stack direction={{ xs: "column", md: "row" }} spacing={3}></Stack> */}

              <Box>
                <DetailSubHeader>Comments</DetailSubHeader>
                <DetailText isMultiLine={true}>{comments}</DetailText>
              </Box>
            </Stack>
          </Box>
        )}
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
