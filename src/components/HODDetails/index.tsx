import { formatDateToString } from "@/utils";
import { Box, Stack } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";
import DetailHeader from "../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../Common/DetailBox/DetailSubHeader";
import DetailText from "../Common/DetailBox/DetailText";
import { EndorsementStatus } from "@/enums";
import EndorsementForm from "../Forms/EndorsementForm";

interface HODDetailProps {
  title: string;
  name: string;
  designation: string;
  department?: string | undefined;
  endorsement_status?: EndorsementStatus | undefined;
  endorsement_date?: Date | undefined;
  comments?: string | undefined;
}

export default function index(props: HODDetailProps) {
  const {
    title,
    name,
    designation,
    department,
    endorsement_status,
    endorsement_date,
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
        <EndorsementForm />
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
