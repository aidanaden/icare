import { FormContainer } from "react-hook-form-mui";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import StyledTextField from "@/components/Common/StyledTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Schemas";
import useAuth from "@/hooks/useAuth";

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
  const formContext = useForm<LoginProps>({
    defaultValues: {
      staff_id: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = formContext;

  return (
    <Box>
      {/*
      // @ts-ignore */}
      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit(onSubmit)}
      >
        <Stack direction={"column"} spacing={2.5} mb={5}>
          <StyledTextField
            size="medium"
            color="secondary"
            id="staff_id"
            name={"staff_id"}
            label={"Staff ID"}
            required
            error={errors.staff_id ? true : false}
            helperText={errors.staff_id?.message}
          />
          <StyledTextField
            size="medium"
            color="secondary"
            id="password"
            name={"password"}
            label={"Timesheet Password"}
            type="password"
            required
            error={errors.password ? true : false}
            helperText={errors.password?.message}
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
      </FormContainer>
    </Box>
  );
}
