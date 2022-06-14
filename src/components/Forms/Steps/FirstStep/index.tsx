import { Box, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { RecoilState, useRecoilState, useResetRecoilState } from "recoil";
import {
  NominationFormSubmissionData,
  NominationFormSubmissionDetails,
} from "@/interfaces";
import FileUploadButton from "@/components/Forms/Common/FileUploadButton";
import FormDepartmentSelect from "@/components/Forms/Common/FormDepartmentSelect";
import AutocompleteTextField from "../../Common/AutocompleteTextField";

import { useForm } from "react-hook-form";
import FormTextField from "../../Common/FormTextField";
import {
  upsertNominationForm,
  useNominationDetails,
  useStaff,
} from "@/lib/nominations";
import { DepartmentType } from "@/enums";
import { filterInvalidStaffRanksForNomination } from "@/utils";
import useAuth from "@/hooks/useAuth";
import { useEffect, useMemo } from "react";

interface FirstStepProp {
  recoilFormState: RecoilState<NominationFormSubmissionData>;
  handleNext: () => void;
  case_id?: string;
}

export default function FirstStep({
  recoilFormState,
  handleNext,
  case_id,
}: FirstStepProp) {
  const { user } = useAuth();
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(recoilFormState);
  const resetFormState = useResetRecoilState(recoilFormState);

  const { data } = useNominationDetails(case_id);
  console.log("nomination details from editing existing case: ", data);

  const { staffData, error, loading } = useStaff("", "");
  const staffDepts = Array.from(
    new Set(staffData?.map((staff) => staff.staff_department as DepartmentType))
  );
  const filteredStaff = filterInvalidStaffRanksForNomination(
    staffData,
    user?.staff_id
  );

  const draftUsers = staffData?.filter(
    (staff) => staff.staff_id === data?.nominee_id
  );
  console.log("draft users found from existing case: ", draftUsers);
  const draftUser =
    draftUsers && draftUsers.length > 0 ? draftUsers[0] : undefined;

  const defaultValues = useMemo(() => {
    return {
      user: draftUser ?? getNominationFormState.user,
      department:
        (data?.nominee_department as DepartmentType) ??
        getNominationFormState.department ??
        DepartmentType.ALL,
      description:
        data?.nomination_reason ?? getNominationFormState.description ?? "",
    };
  }, [getNominationFormState, draftUser, data]);

  console.log("first step default values: ", defaultValues);

  // set up form states
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<NominationFormSubmissionDetails, "files">>({
    defaultValues: defaultValues,
    resolver: yupResolver(nominationDetailSchema),
  });

  useEffect(() => {
    if (draftUser) {
      console.log(
        "draft user found, resetting form to display draft user data"
      );
      reset(defaultValues);
    }
  }, [defaultValues, draftUser]);

  const onSubmit = (data: Omit<NominationFormSubmissionDetails, "files">) => {
    console.log("first step submit called!");
    const newFormData = {
      ...getNominationFormState,
      ...data,
    };
    setNominationFormState(newFormData);
    console.log("new form data: ", newFormData);
    handleNext();
  };

  const handleReset = () => {
    console.log("resetting form!");
    reset(defaultValues);
    // reset();
    resetFormState();
  };

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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <AutocompleteTextField
                control={control}
                staffData={filteredStaff ?? []}
              />
              <FormDepartmentSelect control={control} depts={staffDepts} />
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
          <Box
            display="flex"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column-reverse", md: "row" }}
              width={{ xs: "100%", sm: "auto" }}
            >
              <PrimaryButton
                size="large"
                variant={"outlined"}
                sx={{
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  marginTop: { xs: 1, sm: "auto" },
                  marginRight: { md: "12px" },
                }}
                onClick={handleReset}
                color="error"
              >
                Reset form
              </PrimaryButton>
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
        </Box>
      </form>
    </Box>
  );
}
