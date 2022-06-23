import { EndorsementStatus } from "@/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { endorsementSchema } from "../Schemas";
import EndorsementStatusSelect from "../Common/EndorsementStatusSelect";
import FormTextField from "../Common/FormTextField";
import { upsertNominationFormHODComments } from "@/lib/nominations";
import FeedbackSnackbar from "../Common/FeedbackSnackbar";
import { useEffect, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

interface EndorsementForm {
  endorsement_status?: EndorsementStatus;
  comments?: string;
}

interface EndorsementFormProps extends EndorsementForm {
  case_id: string;
  hod_id: string;
}

export default function EndorsementForm({
  case_id,
  hod_id,
  endorsement_status,
  comments,
}: EndorsementFormProps) {
  const router = useRouter();
  const [endorseSuccessOpen, setEndorseSuccessOpen] = useState<boolean>(false);
  const [endorseErrorOpen, setEndorseErrorOpen] = useState<boolean>(false);
  const [endorseLoading, setEndorseLoading] = useState<boolean>(false);

  const defaultValues = useMemo(() => {
    return {
      endorsement_status:
        endorsement_status === EndorsementStatus.PENDING
          ? EndorsementStatus.NEUTRAL
          : endorsement_status,
      comments: comments,
    };
  }, [endorsement_status, comments]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EndorsementForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(endorsementSchema),
  });

  useEffect(() => {
    console.log("default value: ", defaultValues);
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data: any) => {
    setEndorseLoading(true);
    try {
      const transformedData = {
        case_id: case_id,
        hod_id: hod_id,
        endorsement_status: data.endorsement_status,
        hod_comments: data.comments ?? "",
      };
      const response = await upsertNominationFormHODComments(transformedData);
      if (response.status_code === 200) {
        setEndorseSuccessOpen(true);
        router.push("/endorsements");
      } else {
        setEndorseErrorOpen(true);
      }
    } catch (err) {
      console.error(err);
    }

    setEndorseLoading(false);
    setTimeout(() => {
      router.push("/endorsements");
    }, 2500);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Stack direction={"column"} spacing={3} height="100%" mb={{ xs: 4 }}>
            <EndorsementStatusSelect control={control} />
            <FormTextField
              control={control}
              label="Comments"
              name="comments"
              error={errors.comments?.message}
              multiLine={true}
              placeholder="Share your views on the nomination. Is the service quality consistent?"
            />
          </Stack>
          <Box display="flex" justifyContent="flex-end">
            <LoadingButton
              type={"submit"}
              size="large"
              sx={{
                borderRadius: "8px",
                textTransform: "capitalize",
                width: { xs: "100%", sm: "auto" },
              }}
              variant={"contained"}
              color={"secondary"}
              disableElevation
              loading={endorseLoading}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </form>
      <FeedbackSnackbar
        successOpen={endorseSuccessOpen}
        errorOpen={endorseErrorOpen}
        setSuccessOpen={setEndorseSuccessOpen}
        setErrorOpen={setEndorseErrorOpen}
        successMsg="Successfully submitted feedback."
        errorMsg="Error occurred while submitting feedback. Please try again."
      />
    </>
  );
}
