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
import {
  convertBooleanToServiceLevelWinner,
  convertBooleanToShortlist,
} from "@/utils";

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
  service_level?: ServiceLevel;
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
  champion_shortlist_status,
  champion_status,
  comments,
}: CommitteeFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommitteeForm>({
    defaultValues: {
      service_level: service_level,
      service_level_award: service_level_award,
      is_champion_result: champion_status,
      comments: comments,
    },
    resolver: yupResolver(committeeSchema),
  });

  const onSubmit = (data: CommitteeForm) => {
    console.log(data);

    const transformedData = {
      case_id: case_id,
      committee_id: committee_id,
      committee_comments: data.comments!,
      committee_service_level: data.service_level!,
      service_level_winner_status: convertBooleanToServiceLevelWinner(
        data.service_level_award
      ),
      champion_status: data.is_champion_result!,
    };
    // upsertNominationFormCommitteeComments(transformedData);
    console.log(transformedData);
  };

  // const data = {
  //   case_id: committeeData.case_id,
  //   committee_id: committeeData.committee_id,
  //   committee_comments: committeeData.committee_comments,
  //   committee_service_level: committeeData.committee_service_level,
  //   service_level_winner_status: committeeData.service_level_winner_status,
  //   shortlist_status: committeeData.shortlist_status,
  //   champion_status: committeeData.champion_status,
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Stack direction={"column"} spacing={4} height="100%" mb={{ xs: 6 }}>
          <CommitteeServiceLevelSelect
            defaultServiceLevel={default_service_level}
            control={control}
          />
          {/* <CommitteeShortlistSelect control={control} /> */}

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <FormSwitch
              control={control}
              name="service_level_award"
              label="Award Winner"
              error={errors.service_level_award?.message}
            />
            {champion_shortlist_status && (
              <FormSwitch
                control={control}
                name="is_champion_result"
                label="ICare Champion"
                error={errors.is_champion_result?.message}
              />
            )}
          </Stack>

          <FormTextField
            control={control}
            label="Comments"
            name="comments"
            error={errors.comments?.message}
            multiLine={true}
            placeholder="Enter comments here..."
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
          >
            Submit
          </PrimaryButton>
        </Box>
      </Box>
    </form>
  );
}
