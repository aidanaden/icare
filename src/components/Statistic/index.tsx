import { Typography } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";

interface StatisticProps {
  title: string;
  value: number;
}

export default function index(props: StatisticProps) {
  const { title, value } = props;
  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      justifyContent="space-between"
    >
      <Typography
        variant="body1"
        mb={2}
        fontSize="14px"
        color="#212b36"
        textTransform="capitalize"
        fontWeight={600}
      >
        {title}
      </Typography>
      <Typography variant="h4" fontWeight={600} color="#212b36">
        {value}
      </Typography>
    </ShadowBox>
  );
}
