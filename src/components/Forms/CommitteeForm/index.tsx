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

interface CommitteeForm {
  service_level?: ServiceLevel | undefined;
  award_shortlist_status?: boolean | undefined;
  champion_shortlist_status?: boolean | undefined;
  comments?: string | undefined;
}

export default function CommitteeForm({
  service_level,
  award_shortlist_status,
  champion_shortlist_status,
  comments,
}: CommitteeForm) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommitteeForm>({
    defaultValues: {
      service_level: service_level,
      award_shortlist_status: award_shortlist_status,
      champion_shortlist_status: champion_shortlist_status,
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
              name="award_shortlist_status"
              label="Shortlist for Award"
              defaultValue={false}
            />
            <FormSwitch
              control={control}
              name="champion_shortlist_status"
              label="Shortlist for Championship"
              defaultValue={false}
            />
          </Stack>

          <FormTextField
            control={control}
            label="Comments"
            name="comments"
            defaultValue=""
            error={errors.comments?.message}
            multiLine={true}
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
