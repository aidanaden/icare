import { useEffect, useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import { DropzoneDialog } from "react-mui-dropzone";
import { useRecoilState } from "recoil";
import {
  IMAGE_FILE_TYPE,
  PDF_FILE_TYPE,
  WORD_FILE_TYPE,
  EXCEL_FILE_TYPE,
  BASE64_SPLIT_KEY,
} from "@/constants/";
import { convertFileToBase64 } from "@/utils";
import { FileNameString } from "@/interfaces";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import DetailSubHeader from "@/components/Common/DetailBox/DetailSubHeader";
import { newNominationFormState } from "@/atoms/newNominationFormAtom";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";
import { deleteFile } from "@/lib/nominations";
import { useWatch } from "react-hook-form";
import DetailText from "@/components/Common/DetailBox/DetailText";

interface FileUploadSectionProps {
  case_id?: string;
  isEdit?: boolean;
  control: any;
}

export default function FileUploadButton({
  case_id,
  isEdit,
  control,
}: FileUploadSectionProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileNameString[]>([]);
  const [getNominationFormState, setNominationFormState] = useRecoilState(
    isEdit ? editNominationFormState : newNominationFormState
  );

  const selectedDept = useWatch({ control, name: "department" });
  const selectedDescription = useWatch({ control, name: "description" });

  const handleFileDelete = async (file: FileNameString) => {
    setNominationFormState({
      ...getNominationFormState,
      files: getNominationFormState.files?.filter((f) => f != file),
    });

    try {
      const response = await deleteFile(
        case_id ?? getNominationFormState.case_id,
        file.file_name
      );
      if (response.status_code !== 200) {
        console.error("failed to delete file");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setFiles(getNominationFormState.files ?? []);
  }, [getNominationFormState.files]);

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} flexWrap={"wrap"}>
        {files.map((file, i) => (
          <Chip
            key={`file ${i}`}
            variant="outlined"
            size="small"
            label={file.file_name}
            onDelete={() => handleFileDelete(file)}
          />
        ))}
      </Stack>

      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Upload supporting document(s)
      </Button>

      <DetailText mb={1} isMultiLine={true} color="#8C9AA6">
        If you have more than one file to upload, please select multiple files
        at one go. New upload will overwrite the existing files. (max 10 MB
        total size)
      </DetailText>

      <DropzoneDialog
        acceptedFiles={[
          IMAGE_FILE_TYPE,
          PDF_FILE_TYPE,
          WORD_FILE_TYPE,
          EXCEL_FILE_TYPE,
        ]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={async (files) => {
          const base64s = await Promise.all(
            files.map(async (file) => {
              const base64String = (await convertFileToBase64(
                file
              )) as unknown as string;
              const base64Split = base64String.split(BASE64_SPLIT_KEY);
              const base64FileType = base64Split[0] + BASE64_SPLIT_KEY;
              const base64FileString = base64Split[1];
              return {
                file_name: file.name,
                file_string: base64FileString,
                file_type: base64FileType,
              };
            })
          );
          const newFormData = {
            ...getNominationFormState,
            department: selectedDept,
            description: selectedDescription,
            files: base64s,
          };
          setNominationFormState(newFormData);
          setOpen(false);
        }}
        fullWidth={true}
        showPreviews={true}
        showFileNamesInPreview={true}
        filesLimit={5}
        useChipsForPreview={true}
      />
      <DetailSubHeader mb={0}>
        Supported files: images, pdf, word docs
      </DetailSubHeader>
    </>
  );
}
