import {
  Box,
  Stack,
  OutlinedInput,
  Select,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledTextField from "@/components/Common/StyledTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";
import {
  NominationFormSubmissionData,
  NominationFormSubmissionDetails,
  StaffData,
} from "@/interfaces";
import FileUploadButton from "@/components/Forms/Common/FileUploadButton";
import FormDepartmentSelect from "@/components/Forms/Common/FormDepartmentSelect";
import AutocompleteTextField from "../../Common/AutocompleteTextField";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import StyledMenuItem from "@/components/Common/Menu/StyledMenuItem";
import FormTextField from "../../Common/FormTextField";

interface FirstStepProp {
  handleNext: () => void;
}

export default function FirstStep({ handleNext }: FirstStepProp) {
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);

  const onSubmit = (data: Omit<NominationFormSubmissionDetails, "files">) => {
    console.log("first step submit called!");
    const newFormData = {
      ...getNominationFormState,
      ...data,
    };
    setNominationFormState(newFormData);
    console.log("submitted data: ", data);
    console.log("new form data: ", newFormData);
    handleNext();
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Omit<NominationFormSubmissionDetails, "files">>({
    defaultValues: {
      user: getNominationFormState.user,
      department: getNominationFormState.department,
      description: getNominationFormState.description,
    },
    resolver: yupResolver(nominationDetailSchema),
  });

  return (
    <Box width="100%">
      <Box mb={4}>
        <SectionHeader mb={2} fontSize={{ xs: "24px", md: "32px" }}>
          Nomination details
        </SectionHeader>
        <SectionSubtitle>
          Enter the details of the staff member you want to nominate.
        </SectionSubtitle>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          minHeight={{ sm: "380px" }}
        >
          <Stack direction={"column"} spacing={3} height="100%" mb={{ xs: 4 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <AutocompleteTextField control={control} getValues={getValues} />
              <FormDepartmentSelect control={control} />
            </Stack>
            <SectionSubtitle>
              Enter the reasons of why you&#39;re nominating this staff member.
            </SectionSubtitle>
            <FormTextField
              control={control}
              name="description"
              label="Description"
              error={errors.description?.message}
              multiLine={true}
              placeholder="Enter description here..."
            />
            <FileUploadButton />
          </Stack>
          <Box display="flex" justifyContent="flex-end">
            <PrimaryButton
              type={"submit"}
              size="large"
              sx={{
                borderRadius: "8px",
                textTransform: "capitalize",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Next
            </PrimaryButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
