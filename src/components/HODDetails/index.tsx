import { formatDateToString } from "@/utils";
import { Box, Stack } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";
import DetailHeader from "../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../Common/DetailBox/DetailSubHeader";
import DetailText from "../Common/DetailBox/DetailText";
import { EndorsementStatus } from "@/enums";
import EndorsementForm from "../Forms/EndorsementForm";
import GreenBadge from "../Common/Badge/GreenBadge";
import RedBadge from "../Common/Badge/RedBadge";

interface HODDetailProps {
  case_id: string;
  hod_id: string;
  title: string;
  name: string;
  designation: string;
  department?: string;
  endorsement_status?: EndorsementStatus;
  endorsement_date?: string;
  comments?: string;
  isEditable?: boolean;
}

export default function index(props: HODDetailProps) {
  const {
    case_id,
    hod_id,
    title,
    name,
    designation,
    department,
    endorsement_status,
    endorsement_date,
    comments,
    isEditable,
  } = props;

  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      justifyContent="space-between"
    >
      <DetailHeader>{title}</DetailHeader>
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

        {isEditable ? (
          <EndorsementForm
            case_id={case_id}
            hod_id={hod_id}
            endorsement_status={endorsement_status}
            comments={comments}
          />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Stack direction={"column"} spacing={4} height="100%">
              <Box>
                <DetailSubHeader mb={1.5}>Endorsement status</DetailSubHeader>
                {endorsement_status ? (
                  <GreenBadge>Endorsed</GreenBadge>
                ) : (
                  <RedBadge>Not endorsed</RedBadge>
                )}
              </Box>
              <Box>
                <DetailSubHeader>Endorsement date</DetailSubHeader>
                <DetailText>{endorsement_date?.toString()}</DetailText>
              </Box>

              <Box>
                <DetailSubHeader>Comments</DetailSubHeader>
                <DetailText isMultiLine={true}>{comments}</DetailText>
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </ShadowBox>
  );
}
