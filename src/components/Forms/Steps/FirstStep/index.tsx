import { TextField, Box, Button, Grid, Stack } from "@mui/material";
import {
  useContext,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FormContainer } from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledTextField from "@/components/Common/FormTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { DepartmentType } from "@/enums";
import { AddBoxOutlined } from "@mui/icons-material";
import { NominationFormDetails, NominationFormData } from "../../StepForm";

interface FirstStepProp {
  formData: NominationFormData;
  setFormData: Dispatch<NominationFormData>;
  handleNext: () => void;
}

export default function FirstStep({
  formData,
  setFormData,
  handleNext,
}: FirstStepProp) {
  //   const { formValues, handleChange, handleNext, variant, margin } =
  //     useContext(AppContext);
  //   const { firstName, lastName, email, gender } = formValues;

  //   // Check if all values are not empty and if there are some errors
  //   const isError = useCallback(
  //     () =>
  //       Object.keys({ firstName, lastName, email, gender }).some(
  //         (name) =>
  //           (formValues[name].required && !formValues[name].value) ||
  //           formValues[name].error
  //       ),
  //     [formValues, firstName, lastName, email, gender]
  //   );

  const onSubmit = (data: NominationFormDetails) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    console.log("submitted data: ", data);
    console.log("new form data: ", newFormData);
    handleNext();
  };
  const formContext = useForm<NominationFormDetails>({
    defaultValues: {
      email: formData.email,
      department: formData.department,
      description: formData.description,
    },
    resolver: yupResolver(nominationDetailSchema),
  });

  const {
    formState: { errors },
  } = formContext;

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
      {/*
      // @ts-ignore */}
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          minHeight={"380px"}
        >
          <Stack direction={"column"} spacing={3} height="100%" mb={"auto"}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <StyledTextField
                size="medium"
                color="secondary"
                id="email"
                name={"email"}
                label={"Email"}
                helperText={errors.email?.message}
                fullWidth
                required
              />
              <StyledTextField
                size="medium"
                color="secondary"
                id="department"
                name={"department"}
                label={"Department"}
                helperText={errors.department?.message}
                required
              />
            </Stack>
            <StyledTextField
              multiline
              rows={5}
              size="medium"
              color="secondary"
              id="description"
              name={"description"}
              label={"Description"}
              helperText={errors.description?.message}
              required
            />
          </Stack>
          <Box display="flex" justifyContent="flex-end">
            <PrimaryButton
              type={"submit"}
              size="large"
              sx={{
                borderRadius: "8px",
                textTransform: "capitalize",
              }}
            >
              Submit
            </PrimaryButton>
          </Box>
        </Box>
      </FormContainer>
    </Box>
  );
}
