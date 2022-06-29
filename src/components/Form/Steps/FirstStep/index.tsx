import { Box, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { RecoilState, useRecoilState, useResetRecoilState } from "recoil";
import {
  FileFetchData,
  NominationFormSubmissionData,
  NominationFormSubmissionDetails,
} from "@/interfaces";
import FileUploadButton from "@/components/Form/Common/FileUploadButton";
import FormDepartmentSelect from "@/components/Form/Common/FormDepartmentSelect";
import AutocompleteTextField from "../../Common/AutocompleteTextField";

import { useForm } from "react-hook-form";
import FormTextField from "../../Common/FormTextField";
import {
  fetchFileStrings,
  upsertNominationForm,
  useNominationDetails,
  useStaff,
} from "@/lib/nominations";
import { DepartmentType } from "@/enums";
import { filterInvalidStaffRanksForNomination } from "@/utils";
import useAuth from "@/hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";
import { newNominationFormState } from "@/atoms/newNominationFormAtom";
import FeedbackSnackbar from "../../Common/FeedbackSnackbar";

interface FirstStepProp {
  recoilFormState: RecoilState<NominationFormSubmissionData>;
  handleNext: () => void;
  case_id?: string;
  isEdit?: boolean;
}

export default function FirstStep({
  recoilFormState,
  handleNext,
  case_id,
  isEdit,
}: FirstStepProp) {
  const { user } = useAuth();
  const [getNominationFormState, setNominationFormState] = useRecoilState(
    isEdit ? editNominationFormState : newNominationFormState
  );

  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState<boolean>(false);

  const [resetSnackbarOpen, setResetSnackbarOpen] = useState<boolean>(false);
  const [resetErrorSnackbarOpen, setResetErrorSnackbarOpen] =
    useState<boolean>(false);
  const [resetButtonLoading, setResetButtonLoading] = useState<boolean>(false);

  const { data } = useNominationDetails(case_id);

  // const fileData = useMemo(async () => {
  //   if (data?.attachment_list && case_id) {
  //     // fetch file data
  //     const fileDatas: FileFetchData[] | undefined = data?.attachment_list?.map(
  //       (fname) => {
  //         return { case_id: case_id, file_name: fname };
  //       }
  //     );
  //     const files = await fetchFileStrings(fileDatas);
  //     return files;
  //   } else {
  //     return [];
  //   }
  // }, [case_id, data?.attachment_list]);

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
  const draftUser =
    draftUsers && draftUsers.length > 0 ? draftUsers[0] : undefined;

  const defaultValues = useMemo(() => {
    return {
      user: draftUser ??
        getNominationFormState.user ?? {
          staff_corporate_rank: "",
          staff_department: "",
          staff_id: "",
          staff_name: "",
        },
      department:
        (data?.nominee_department as DepartmentType) ??
        getNominationFormState.department ??
        DepartmentType.ALL,
      description:
        data?.nomination_reason ?? getNominationFormState.description ?? "",
    };
  }, [getNominationFormState, draftUser, data]);

  // set up form states
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Omit<NominationFormSubmissionDetails, "files">>({
    defaultValues: defaultValues,
    resolver: yupResolver(nominationDetailSchema),
  });

  useEffect(() => {
    if (draftUser) {
      reset(defaultValues);
    }
  }, [defaultValues, draftUser, reset]);

  useEffect(() => {
    const setFileData = async () => {
      if (data?.attachment_list && case_id) {
        // fetch file data
        const fileDatas: FileFetchData[] | undefined =
          data?.attachment_list?.map((fname) => {
            return { case_id: case_id, file_name: fname };
          });
        const files = await fetchFileStrings(fileDatas);
        setNominationFormState({ ...getNominationFormState, files: files });
      }
    };
    setFileData();
  }, [data?.attachment_list, case_id]);

  const onSubmit = async (
    data: Omit<NominationFormSubmissionDetails, "files">
  ) => {
    const newFormData = {
      ...getNominationFormState,
      ...data,
    };
    setNominationFormState(newFormData);
    handleNext();
  };

  const handleReset = () => {
    if (user) {
      // setResetButtonLoading(true);

      const clearedNominationFormState = {
        ...getNominationFormState,
        description: "",
        files: undefined,
      };

      reset({ ...defaultValues, description: "" });
      setNominationFormState(clearedNominationFormState);
      // try {
      //   console.log("saving cleared form form!");
      //   const response = await upsertNominationForm(
      //     user?.staff_id,
      //     clearedNominationFormState,
      //     true,
      //     case_id ?? getNominationFormState.case_id
      //   );
      //   setResetButtonLoading(false);
      //   if (response.status_code === 200) {
      //     setNominationFormState({
      //       ...clearedNominationFormState,
      //       case_id: response.case_id,
      //     });
      //     setResetSnackbarOpen(true);
      //   } else {
      //     setResetErrorSnackbarOpen(true);
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    }
  };

  const handleSave = async () => {
    const data = getValues();
    const newFormData = {
      ...getNominationFormState,
      ...data,
    };
    setNominationFormState(newFormData);

    if (user) {
      try {
        setSaveButtonLoading(true);
        const response = await upsertNominationForm(
          user?.staff_id,
          newFormData,
          true,
          case_id ?? getNominationFormState.case_id
        );
        setSaveButtonLoading(false);
        if (response.status_code === 200) {
          setNominationFormState({
            ...newFormData,
            case_id: response.case_id,
          });
          setSaveSnackbarOpen(true);
        } else {
          setErrorSnackbarOpen(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
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
      <Box minHeight={{ sm: "380px" }}>
        {staffData && (!case_id || data) ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <Stack
                direction={"column"}
                spacing={3}
                height="100%"
                mb={{ xs: 4 }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <AutocompleteTextField
                    control={control}
                    staffData={filteredStaff ?? []}
                    disabled={isEdit}
                  />
                  <FormDepartmentSelect
                    control={control}
                    depts={staffDepts}
                    disabled={isEdit}
                  />
                </Stack>
                <SectionSubtitle>
                  Enter the reasons of why you&#39;re nominating this staff
                  member.
                </SectionSubtitle>
                <FormTextField
                  control={control}
                  name="description"
                  label="Description"
                  error={errors.description?.message}
                  multiLine={true}
                  placeholder="Enter description here..."
                />
                <FileUploadButton case_id={case_id} isEdit={isEdit} />
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
                    loading={resetButtonLoading}
                  >
                    Reset form
                  </PrimaryButton>
                  <PrimaryButton
                    size="large"
                    variant={"outlined"}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      marginTop: { xs: 1, sm: "auto" },
                      marginRight: { md: "12px" },
                      color: "green",
                      borderColor: "green",
                    }}
                    onClick={handleSave}
                    loading={saveButtonLoading}
                  >
                    Save draft
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
        ) : (
          <FallbackSpinner />
        )}
        <FeedbackSnackbar
          successOpen={saveSnackbarOpen}
          setSuccessOpen={setSaveSnackbarOpen}
          successMsg="Successfully saved nomination data to draft."
          errorOpen={errorSnackbarOpen}
          setErrorOpen={setErrorSnackbarOpen}
          errorMsg="Error occurred while trying to save your nomination data! Please try again."
        />
        <FeedbackSnackbar
          successOpen={resetSnackbarOpen}
          setSuccessOpen={setResetSnackbarOpen}
          successMsg="Successfully reset nomination data."
          errorOpen={resetErrorSnackbarOpen}
          setErrorOpen={setResetErrorSnackbarOpen}
          errorMsg="Error occurred while trying to reset your nomination data! Please try again."
        />
      </Box>
    </Box>
  );
}
