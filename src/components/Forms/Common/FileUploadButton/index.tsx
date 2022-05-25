import { useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import { DropzoneDialog } from "react-mui-dropzone";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";

export default function FileUploadButton() {
  const [open, setOpen] = useState(false);
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);
  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} flexWrap={"wrap"}>
        {getNominationFormState.files?.map((file, i) => (
          <Chip
            key={`file ${i}`}
            variant="outlined"
            size="small"
            label={file.name}
          />
        ))}
      </Stack>

      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Upload supporting document(s)
      </Button>

      <DropzoneDialog
        acceptedFiles={[
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
          const newFormData = { ...getNominationFormState, files: files };
          setNominationFormState(newFormData);
          console.log("Files:", newFormData);
          setOpen(false);
        }}
        fullWidth={true}
        showPreviews={true}
        showFileNamesInPreview={true}
        filesLimit={5}
        useChipsForPreview={true}
      />
    </>
  );
}
