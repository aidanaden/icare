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

import { useForm, useWatch } from "react-hook-form";
import FormTextField from "../../Common/FormTextField";
import {
  fetchFileStrings,
  upsertNominationForm,
  useNominationDetails,
  fetchNominationDetails,
  useStaffDepartments,
} from "@/lib/nominations";
import useAuth from "@/hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";
import { newNominationFormState } from "@/atoms/newNominationFormAtom";
import FeedbackSnackbar from "../../Common/FeedbackSnackbar";
import { DEFAULT_RESET_ERROR_MSG, DEFAULT_SAVE_ERROR_MSG } from "./constants";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { user } = useAuth();
  const [getNominationFormState, setNominationFormState] = useRecoilState(
    isEdit ? editNominationFormState : newNominationFormState
  );

  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState<boolean>(false);
  const [saveErrorSnackbarOpen, setSaveErrorSnackbarOpen] =
    useState<boolean>(false);
  const [saveErrorSnackbarMsg, setSaveErrorSnackbarMsg] = useState<string>(
    DEFAULT_SAVE_ERROR_MSG
  );
  const [saveButtonLoading, setSaveButtonLoading] = useState<boolean>(false);

  const [resetSnackbarOpen, setResetSnackbarOpen] = useState<boolean>(false);
  const [resetErrorSnackbarOpen, setResetErrorSnackbarOpen] =
    useState<boolean>(false);
  const [resetErrorSnackbarMsg, setResetErrorSnackbarMsg] = useState<string>(
    DEFAULT_RESET_ERROR_MSG
  );
  const [resetButtonLoading, setResetButtonLoading] = useState<boolean>(false);

  const resetFormState = useResetRecoilState(recoilFormState);

  // TODO: update nomination form state with data fetched
  // (to be used in autocomplete)
  const pageCaseId: string | undefined = router.query.case_id as
    | string
    | undefined;
  const currentCaseId = pageCaseId ?? case_id;
  const { data } = useNominationDetails(currentCaseId);

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

  const { departmentData } = useStaffDepartments();
  const sortedDepartmentData = departmentData?.department_list.sort((a, b) =>
    a.localeCompare(b)
  );

  const defaultValues = useMemo(() => {
    return {
      user: data
        ? {
            staff_corporate_rank: "",
            staff_department: data?.nominee_department,
            staff_id: data?.nominee_id,
            staff_name: data?.nominee_name,
          }
        : {
            staff_corporate_rank: "",
            staff_department: "",
            staff_id: "",
            staff_name: "",
          },
      department: data?.nominee_department ?? "All",
      description: data?.nomination_reason ?? "",
    };
  }, [data]);

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

  const selectedUser = useWatch({ control, name: "user" });
  const selectedDepartment = useWatch({ control, name: "department" });
  const selectedDescription = useWatch({ control, name: "description" });

  // always clear nomination form state on mount
  useEffect(() => {
    const clearedData = {
      user:
        currentCaseId && data
          ? {
              staff_corporate_rank: "",
              staff_department: data?.nominee_department,
              staff_id: data?.nominee_id,
              staff_name: data?.nominee_name,
            }
          : {
              staff_corporate_rank: "",
              staff_department: "",
              staff_id: "",
              staff_name: "",
            },
      department: currentCaseId && data ? data?.nominee_department : "All",
      description: currentCaseId && data ? data?.nomination_reason : "",
    };

    setNominationFormState({
      case_id: currentCaseId,
      answers: new Map<string, string>(null),
      files: undefined,
      ...clearedData,
    });

    reset(clearedData);
  }, [data]);

  useEffect(() => {
    const newState = {
      user: getNominationFormState.user,
      department: getNominationFormState.department,
      description: getNominationFormState.description,
    };
    reset(newState);
  }, [getNominationFormState]);

  useEffect(() => {
    const setFileData = async () => {
      if (data?.attachment_list && data.attachment_list.length > 0 && case_id) {
        // fetch file data
        const fileDatas: FileFetchData[] | undefined =
          data?.attachment_list?.map((fname) => {
            return { case_id: case_id, file_name: fname };
          });
        const files = await fetchFileStrings(fileDatas);
        setNominationFormState((currentState) => {
          return { ...currentState, files: files };
        });
      }
    };
    setFileData();
  }, [data?.attachment_list]);

  useEffect(() => {
    if (
      !selectedUser ||
      !selectedUser.staff_department ||
      !selectedDepartment
    ) {
      return;
    }

    if (
      selectedUser?.staff_department.toLowerCase() !==
      selectedDepartment?.toLowerCase()
    ) {
      reset({
        user: {
          staff_corporate_rank: "",
          staff_department: "",
          staff_id: "",
          staff_name: "",
        },
        department: selectedDepartment,
      });
    }
  }, [selectedDepartment]);

  const onSubmit = async (
    data: Omit<NominationFormSubmissionDetails, "files">
  ) => {
    setNominationFormState((currentState) => {
      return {
        ...currentState,
        ...data,
      };
    });
    handleNext();
  };

  const handleReset = () => {
    if (user) {
      // setResetButtonLoading(true);

      const emptiedValues = isEdit
        ? {
            description: "",
          }
        : {
            user: {
              staff_corporate_rank: "",
              staff_department: "",
              staff_id: "",
              staff_name: "",
            },
            description: "",
            department: "All",
          };

      const clearedNominationFormState = {
        ...getNominationFormState,
        ...emptiedValues,
        files: undefined,
      };

      const resetValues = {
        ...defaultValues,
        ...emptiedValues,
      };

      reset(resetValues);
      setNominationFormState(clearedNominationFormState);
    }
  };

  const handleSave = async () => {
    const data = getValues();
    const newFormData = {
      ...getNominationFormState,
      ...data,
    };

    if (!newFormData.user?.staff_id) {
      setSaveErrorSnackbarMsg("Please select a user before saving.");
      setSaveErrorSnackbarOpen(true);
      return;
    }

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
          const newFormState = {
            ...newFormData,
            case_id: response.case_id,
          };
          router.replace(
            {
              pathname: `${router.asPath}`,
              query: { case_id: response.case_id },
            },
            undefined,
            { shallow: true }
          );
          setNominationFormState(newFormState);
          setSaveSnackbarOpen(true);
        } else {
          setSaveErrorSnackbarOpen(true);
        }
      } catch (err) {
        setSaveErrorSnackbarOpen(true);
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
        {!case_id || data ? (
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
                  <AutocompleteTextField control={control} disabled={isEdit} />
                  <FormDepartmentSelect
                    control={control}
                    depts={sortedDepartmentData}
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
                <FileUploadButton
                  case_id={case_id}
                  isEdit={isEdit}
                  control={control}
                />
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
                      "&:active": {
                        borderColor: "green",
                      },
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
          errorOpen={saveErrorSnackbarOpen}
          setErrorOpen={setSaveErrorSnackbarOpen}
          errorMsg={saveErrorSnackbarMsg}
        />
        <FeedbackSnackbar
          successOpen={resetSnackbarOpen}
          setSuccessOpen={setResetSnackbarOpen}
          successMsg="Successfully reset nomination data."
          errorOpen={resetErrorSnackbarOpen}
          setErrorOpen={setResetErrorSnackbarOpen}
          errorMsg={resetErrorSnackbarMsg}
        />
      </Box>
    </Box>
  );
}
