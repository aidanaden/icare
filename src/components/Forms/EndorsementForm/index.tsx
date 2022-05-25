import PrimaryButton from "@/components/Common/PrimaryButton";
import { EndorsementStatus } from "@/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { endorsementSchema } from "../Schemas";
import EndorsementStatusSelect from "../Common/EndorsementStatusSelect";
import FormTextField from "../Common/FormTextField";

interface EndorsementForm {
  endorsement_status?: EndorsementStatus | undefined;
  comments?: string | undefined;
}

export default function EndorsementForm({
  endorsement_status,
  comments,
}: EndorsementForm) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EndorsementForm>({
    defaultValues: {
      endorsement_status: endorsement_status,
      comments: comments,
    },
    resolver: yupResolver(endorsementSchema),
  });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
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
