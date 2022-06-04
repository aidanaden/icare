import { TextField, Box, Button, Grid, Stack } from "@mui/material";
import { useContext, useCallback, useState, Dispatch } from "react";
import { FormContainer } from "react-hook-form-mui";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/Common/PrimaryButton";
import SectionHeader from "@/components/Common/SectionHeader";
import SectionSubtitle from "@/components/Common/SectionSubtitle";
import { nominationDetailSchema } from "../../Schemas";
import { DepartmentType } from "@/enums";
import NominationQuestion from "../../Common/NominationQuestion";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";
import { NominationFormSubmissionData } from "@/interfaces";
import { upsertNominationForm } from "@/lib/nominations";
import useAuth from "@/hooks/useAuth";

interface FinalStepProp {
  handleSubmit: () => void;
  handleBack: () => void;
}

export default function FinalStep({ handleSubmit, handleBack }: FinalStepProp) {
  const { user } = useAuth();
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);

  const onSubmit = (data: Map<string, string>) => {
    console.log("final step submit called!");
    const newFormData = { ...getNominationFormState, answers: data };
    setNominationFormState(newFormData);
    console.log("submitted data: ", data);
    console.log("new form data: ", newFormData);
    handleSubmit();
  };

  const formContext = useForm<NominationFormSubmissionData>({
    defaultValues: {
      // email: "",
      // department: DepartmentType.AUDIT,
      // description: "",
    },
    // resolver: yupResolver(nominationDetailSchema),
  });

  const {
    formState: { errors },
  } = formContext;

  interface FormQuestion {
    question: string;
    answers: string[];
  }

  const formQuestionData: FormQuestion[] = [
    {
      question: "The nominee provided service based on?",
      answers: [
        "Gave me what I have asked for only",
        "Fulfilled requirements very well",
        "Given requirements and further improving more than what was needed",
        "Provided services out of his/her own will and outside of the job scope",
      ],
    },
    {
      question: "The nominee displayed the following",
      answers: [
        "Able to meet deadlines with little to no supervision",
        "Initiate action to seek information and solve problems",
        "Work with people sincerely to achieve goals",
        "Anticipate potential issues and develops prevention alternatives",
      ],
    },
  ];

  return (
    <Box width="100%">
      <Box>
        <SectionHeader mb={2} fontSize={{ xs: "24px", md: "32px" }}>
          Submit your nomination
        </SectionHeader>
        <SectionSubtitle mb={4}>
          Your nomination will be submitted to your HOD for endorsement. Please
          click submit if you’ve confirmed your answers.
        </SectionSubtitle>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        // height="100%"
        minHeight={{ sm: "340px" }}
      >
        <Stack
          justifyContent={{ sm: "space-between" }}
          flexDirection={{ xs: "column-reverse", sm: "row" }}
        >
          <PrimaryButton
            size="large"
            variant={"outlined"}
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              marginTop: { xs: 1, sm: "auto" },
            }}
            onClick={handleBack}
          >
            Back
          </PrimaryButton>
          <PrimaryButton
            type={"submit"}
            size="large"
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
            onClick={() => {
              if (user) {
                upsertNominationForm(
                  user?.staff_id,
                  getNominationFormState,
                  false
                );
              }
            }}
          >
            Submit
          </PrimaryButton>
        </Stack>
      </Box>
    </Box>
  );
}
