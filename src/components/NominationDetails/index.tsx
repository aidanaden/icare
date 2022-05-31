import { Box, Stack } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";
import DetailHeader from "../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../Common/DetailBox/DetailSubHeader";
import DetailText from "../Common/DetailBox/DetailText";

interface NominationDetailProps {
  title: string;
  service_level: string;
  description: string;
  attachment_list?: string[];
}

export default function index(props: NominationDetailProps) {
  const { title, service_level, description, attachment_list } = props;
  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      //   justifyContent="space-between"
    >
      <DetailHeader>{title}</DetailHeader>
      <Stack direction="column" spacing={4}>
        <Box>
          <DetailSubHeader>service level</DetailSubHeader>
          <DetailText>{service_level}</DetailText>
        </Box>
        <Box>
          <DetailSubHeader>description</DetailSubHeader>
          <DetailText noWrap={false} maxWidth="100%">
            {description}
          </DetailText>
        </Box>
        <Box>
          <DetailSubHeader>supporting files</DetailSubHeader>
          <DetailText noWrap={false} maxWidth="100%">
            {attachment_list}
          </DetailText>
        </Box>
      </Stack>
    </ShadowBox>
  );
}
