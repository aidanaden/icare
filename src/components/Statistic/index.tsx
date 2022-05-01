import { Typography } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";

interface StatisticProps {
  title: string;
  value: number;
}

export default function index(props: StatisticProps) {
  const { title, value } = props;
  return (
    <ShadowBox p={3}>
      <Typography
        variant="body1"
        mb={2}
        sx={{
          fontSize: 14,
          textTransform: "capitalize",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <Typography variant="h4" fontWeight={600}>
        {value}
      </Typography>
    </ShadowBox>
  );
}
