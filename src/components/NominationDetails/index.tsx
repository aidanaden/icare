import { Box, Stack } from "@mui/material";
import ShadowBox from "../Common/ShadowBox";
import DetailHeader from "../Common/DetailBox/DetailHeader";
import DetailSubHeader from "../Common/DetailBox/DetailSubHeader";
import DetailText from "../Common/DetailBox/DetailText";
import { fetchFile, fetchFileStrings } from "@/lib/nominations";
import {
  FileFetchData,
  FileNameString,
  FileStringNameData,
} from "@/interfaces";
import { convertBase64ToFile, downloadBase64Data } from "@/utils";
import { useEffect, useState } from "react";
import { ServiceLevel } from "@/enums";

interface NominationDetailProps {
  title: string;
  service_level: ServiceLevel;
  description: string;
  draft_status: boolean;
  attachment_list: string[] | [];
  loading?: boolean;
  case_id?: string | string[];
}

export default function NominationDetail(props: NominationDetailProps) {
  const {
    title,
    service_level,
    description,
    draft_status,
    attachment_list,
    loading,
    case_id,
  } = props;
  const fileFetchDatas: FileFetchData[] = attachment_list.map((fname) => {
    return { case_id: case_id as string, file_name: fname };
  });

  const [fileStringNames, setFileStringNames] = useState<FileStringNameData[]>(
    []
  );

  // fetch file string
  useEffect(() => {
    const fetchFileStringNames = async () => {
      const fileStrings = await fetchFileStrings(fileFetchDatas);
      setFileStringNames(fileStrings);
    };
    fetchFileStringNames();
  }, []);

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
        {!draft_status && (
          <Box>
            <DetailSubHeader>service level</DetailSubHeader>
            <DetailText>
              {ServiceLevel[service_level as ServiceLevel]}
            </DetailText>
          </Box>
        )}
        <Box>
          <DetailSubHeader>description</DetailSubHeader>
          <DetailText noWrap={false} maxWidth="100%">
            {description}
          </DetailText>
        </Box>
        {fileStringNames.length > 0 && (
          <Box>
            <DetailSubHeader>supporting files</DetailSubHeader>
            <DetailText noWrap={false} maxWidth="100%">
              {fileStringNames.map((fileStringName) => (
                <button
                  key={fileStringName.file_name}
                  onClick={() =>
                    downloadBase64Data(
                      fileStringName.file_type + fileStringName.file_string,
                      fileStringName.file_name
                    )
                  }
                >
                  Click to download {fileStringName.file_name}
                </button>
              ))}
            </DetailText>
          </Box>
        )}
      </Stack>
    </ShadowBox>
  );
}
