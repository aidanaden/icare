import { Box, BoxProps, CircularProgress, Stack } from "@mui/material";
import ShadowBox from "../ShadowBox";
import DetailHeader from "./DetailHeader";
import DetailSubHeader from "./DetailSubHeader";
import DetailText from "./DetailText";

export interface DetailAttribute {
  title: string;
  text?: string | undefined;
  isMultiLine?: boolean | undefined;
}

interface DetailBoxProps extends BoxProps {
  title: string;
  data: DetailAttribute[];
  loading?: boolean;
  isColumn?: boolean;
}

export default function index(props: DetailBoxProps) {
  const { loading, title, data, isColumn, ...other } = props;
  return (
    <ShadowBox
      display="flex"
      flexDirection={"column"}
      p={3}
      height="100%"
      justifyContent="space-between"
      {...other}
    >
      <DetailHeader>{title}</DetailHeader>
      <Stack
        flexGrow={1}
        direction={{ xs: "column", md: isColumn ? "column" : "column" }}
        spacing={{ xs: 4 }}
      >
        {!loading ? (
          data.map((attribute: DetailAttribute, i) => (
            <>
              {attribute.text && attribute.text !== "" && (
                <Box key={`attribute ${i}`}>
                  <DetailSubHeader>{attribute.title}</DetailSubHeader>
                  <DetailText isMultiLine={attribute.isMultiLine}>
                    {attribute.text}
                  </DetailText>
                </Box>
              )}
            </>
          ))
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </ShadowBox>
  );
}
