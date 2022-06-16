import PrimaryButton from "@/components/Common/PrimaryButton";
import { EndorsementStatus, ServiceLevel, ShortlistStatus } from "@/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { committeeSchema } from "../Schemas";
import EndorsementStatusSelect from "../Common/EndorsementStatusSelect";
import FormTextField from "../Common/FormTextField";
import CommitteeServiceLevelSelect from "../Common/CommitteeServiceLevelSelect";
import CommitteeShortlistSelect from "../Common/CommitteeShortlistSelect";
import FormSwitch from "../FormSwitch";
import { upsertNominationFormCommitteeComments } from "@/lib/nominations";
import { convertBooleanToServiceLevelWinner } from "@/utils";
import { useState } from "react";
import FeedbackSnackbar from "../Common/FeedbackSnackbar";

interface CommitteeFormProps {
  case_id: string;
  committee_id: string;
  default_service_level: ServiceLevel;
  service_level?: ServiceLevel;
  service_level_award?: boolean;
  champion_shortlist_status?: boolean;
  champion_status?: boolean;
  comments?: string;
}

interface CommitteeForm {
  service_level: ServiceLevel;
  service_level_award?: boolean;
  is_champion_result?: boolean;
  comments?: string;
}

export default function CommitteeForm({
  case_id,
  committee_id,
  default_service_level,
  service_level,
  service_level_award,
  champion_status,
  comments,
}: CommitteeFormProps) {
  const [committeeSuccessOpen, setCommitteeSuccessOpen] =
    useState<boolean>(false);
  const [committeeErrorOpen, setCommitteeErrorOpen] = useState<boolean>(false);
  const [committeeLoading, setCommitteeLoading] = useState<boolean>(false);

  const defaultValue = {
    service_level:
      service_level !== ServiceLevel.PENDING
        ? service_level
        : ServiceLevel.BASIC,
    service_level_award: service_level_award,
    is_champion_result: champion_status,
    comments: comments,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommitteeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(committeeSchema),
  });

  const onSubmit = async (data: CommitteeForm) => {
    console.log("committee submit button pressed with data: ", data);
    setCommitteeLoading(true);
    const transformedData = {
      case_id: case_id,
      committee_id: committee_id,
      committee_comments: data.comments ?? "",
      committee_service_level: data.service_level
        ? parseInt(data.service_level?.toString())
        : service_level
        ? parseInt(service_level?.toString())
        : parseInt(default_service_level.toString()),
      service_level_winner_status: parseInt(
        convertBooleanToServiceLevelWinner(data.service_level_award).toString()
      ),
      champion_status: data.is_champion_result ?? false,
    };

    try {
      const response = await upsertNominationFormCommitteeComments(
        transformedData
      );
      if (response.status_code === 200) {
        setCommitteeSuccessOpen(true);
      }
    } catch (err) {
      setCommitteeErrorOpen(true);
      console.error(err);
    }

    setCommitteeLoading(false);
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
          <Stack direction={"column"} spacing={4} height="100%" mb={{ xs: 6 }}>
            <CommitteeServiceLevelSelect
              defaultServiceLevel={
                default_service_level === ServiceLevel.PENDING
                  ? ServiceLevel.BASIC
                  : default_service_level
              }
              control={control}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <FormSwitch
                control={control}
                name="service_level_award"
                label="Award Winner"
                error={errors.service_level_award?.message}
              />
              <FormSwitch
                control={control}
                name="is_champion_result"
                label="ICare Champion"
                error={errors.is_champion_result?.message}
              />
            </Stack>
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
            <PrimaryButton
              type={"submit"}
              size="large"
              sx={{
                borderRadius: "8px",
                textTransform: "capitalize",
                width: { xs: "100%", sm: "auto" },
              }}
              loading={committeeLoading}
            >
              Submit
            </PrimaryButton>
          </Box>
        </Box>
      </form>
      <FeedbackSnackbar
        successOpen={committeeSuccessOpen}
        errorOpen={committeeErrorOpen}
        setSuccessOpen={setCommitteeSuccessOpen}
        setErrorOpen={setCommitteeErrorOpen}
        successMsg="Successfully submitted vote."
        errorMsg="Error occurred while submitting vote. Please try again."
      />
    </>
  );
}
