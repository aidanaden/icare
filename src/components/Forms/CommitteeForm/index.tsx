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

interface CommitteeFormProps {
  service_level?: ServiceLevel | undefined;
  service_level_award?: boolean | undefined;
  champion_shortlist_status?: ShortlistStatus | undefined;
  comments?: string | undefined;
}

interface CommitteeForm {
  service_level?: ServiceLevel | undefined;
  service_level_award?: boolean | undefined;
  boolean_shortlist_status?: boolean | undefined;
  comments?: string | undefined;
}

export default function CommitteeForm({
  service_level,
  service_level_award,
  champion_shortlist_status,
  comments,
}: CommitteeFormProps) {
  const booleanShortlistStatus =
    champion_shortlist_status === ShortlistStatus.TRUE ? true : false;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommitteeForm>({
    defaultValues: {
      service_level: service_level,
      service_level_award: service_level_award,
      boolean_shortlist_status: booleanShortlistStatus,
      comments: comments,
    },
    resolver: yupResolver(committeeSchema),
  });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Stack direction={"column"} spacing={4} height="100%" mb={{ xs: 6 }}>
          <CommitteeServiceLevelSelect control={control} />
          {/* <CommitteeShortlistSelect control={control} /> */}

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <FormSwitch
              control={control}
              name="service_level_award"
              label="Nominate for Award"
            />
            <FormSwitch
              control={control}
              name="boolean_shortlist_status"
              label="Shortlist for Championship"
            />
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
