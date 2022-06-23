import { Box, CircularProgress, Typography } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";

interface StatisticProps {
  title: string;
  subtitle?: string;
  value: number;
  loading: boolean;
}

export default function index(props: StatisticProps) {
  const { title, subtitle, value, loading } = props;
  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      justifyContent="space-between"
    >
      <Box mb={2}>
        <Typography
          variant="body1"
          mb={1}
          fontSize="14px"
          color="#212b36"
          textTransform="capitalize"
          fontWeight={600}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          fontSize="14px"
          color="#212b36"
          textTransform="capitalize"
          fontWeight={600}
        >
          {subtitle}
        </Typography>
      </Box>
      {!loading ? (
        <Typography variant="h4" fontWeight={600} color="#212b36">
          {value}
        </Typography>
      ) : (
        <CircularProgress size={12} />
      )}
    </ShadowBox>
  );
}
