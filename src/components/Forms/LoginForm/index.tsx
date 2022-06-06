import { FormContainer } from "react-hook-form-mui";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import StyledTextField from "@/components/Common/StyledTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Schemas";
import useAuth from "@/hooks/useAuth";
import FormTextField from "../Common/FormTextField";

interface LoginProps {
  staff_id: string;
  password: string;
}

export default function LoginForm() {
  const [values, setValues] = useState<LoginProps>();
  const { signIn } = useAuth();
  const onSubmit = (data: LoginProps) => {
    const { staff_id, password } = data;
    setValues(data);
    console.log("submitted data: ", data);
    signIn(staff_id, password);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: {
      staff_id: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={2.5} mb={5}>
        <FormTextField
          control={control}
          label="Staff ID"
          name="staff_id"
          error={errors.staff_id?.message}
          placeholder="Staff ID"
        />
        <FormTextField
          control={control}
          label="Timesheet Password"
          name="password"
          type="password"
          error={errors.password?.message}
          placeholder="Timesheet Password"
        />
      </Stack>
      <PrimaryButton
        type={"submit"}
        size="large"
        fullWidth
        sx={{ borderRadius: "8px", py: "12px" }}
      >
        Submit
      </PrimaryButton>
    </form>
  );
}
