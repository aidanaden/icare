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
  attachment_list: string[] | [];
  case_id?: string | string[];
}

export default function NominationDetail(props: NominationDetailProps) {
  const { title, service_level, description, attachment_list, case_id } = props;
  const fileFetchDatas: FileFetchData[] = attachment_list.map((fname) => {
    return { case_id: case_id as string, file_name: fname };
  });

  const [fileStringNames, setFileStringNames] = useState<FileStringNameData[]>(
    []
  );

  useEffect(() => {
    const fetchFileStringNames = async () => {
      const fileStrings = await fetchFileStrings(fileFetchDatas!);
      setFileStringNames(fileStrings);
    };
    fetchFileStringNames();
  }, []);

  // REAL DATA FETCH
  // const [fileStringNames, setFileStringNames] = useState<FileStringNameData[]>(
  //   []
  // );

  // useEffect(() => {
  //   const fileFetchData: FileFetchData[] | undefined = attachment_list?.map(
  //     (fileName) => {
  //       return { case_id: case_id as string, file_name: fileName };
  //     }
  //   );

  //   async () => {
  //     const fileStrings = await fetchFileStrings(fileFetchData!);
  //     setFileStringNames(fileStrings);
  //   };
  // }, [attachment_list, case_id]);

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
          <DetailText>{ServiceLevel[service_level]}</DetailText>
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
            {fileStringNames.map((fileStringName) => (
              <button
                key={fileStringName.file_name}
                onClick={() =>
                  downloadBase64Data(
                    fileStringName.file_string,
                    fileStringName.file_name
                  )
                }
              >
                Click to download {fileStringName.file_name}
              </button>
            ))}
            {/* <button
              onClick={() =>
                downloadBase64Data(
                  `data:application/pdf;base64,${fileData.file_string}`,
                  fileData.
                )
              }
            >
              Click to download {"testfile.pdf"}
            </button> */}
          </DetailText>
        </Box>
      </Stack>
    </ShadowBox>
  );
}
