import { Box, Stack } from "@mui/material";
import ShadowBox from "../../Common/ShadowBox";
import DetailHeader from "../../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../../Common/DetailBox/DetailSubHeader";
import DetailText from "../../Common/DetailBox/DetailText";
import { ServiceLevel, ServiceLevelWinner, ShortlistStatus } from "@/enums";
import CommitteeForm from "../../Form/CommitteeForm";
import GreenBadge from "../../Common/Badge/GreenBadge";
import RedBadge from "../../Common/Badge/RedBadge";
import GrayBadge from "../../Common/Badge/GrayBadge";
import { convertServiceLevelWinnerToBoolean } from "@/utils";

interface CommitteeMemberDetailProps {
  case_id: string;
  committee_id: string;
  name: string;
  default_service_level: ServiceLevel;
  service_level?: ServiceLevel;
  service_level_award?: ServiceLevelWinner;
  champion_status?: boolean;
  comments?: string;
  isEditable?: boolean;
}

export default function index(props: CommitteeMemberDetailProps) {
  const {
    case_id,
    committee_id,
    name,
    default_service_level,
    service_level,
    service_level_award,
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
        <Box>
          <DetailSubHeader>name</DetailSubHeader>
          <DetailText>{name}</DetailText>
        </Box>

        {isEditable ? (
          <CommitteeForm
            case_id={case_id}
            committee_id={committee_id}
            default_service_level={default_service_level}
            service_level={service_level}
            service_level_award={convertServiceLevelWinnerToBoolean(
              service_level_award
            )}
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
                <DetailText>
                  {ServiceLevel[service_level as ServiceLevel]}
                </DetailText>
              </Box>

              <Stack
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                }}
                spacing={3}
              >
                <Box>
                  <DetailSubHeader mb={1.5}>
                    Service level award
                  </DetailSubHeader>
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
              </Stack>

              {comments && comments.length > 0 && (
                <Box>
                  <DetailSubHeader>Comments</DetailSubHeader>
                  <DetailText isMultiLine={true}>{comments}</DetailText>
                </Box>
              )}
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
