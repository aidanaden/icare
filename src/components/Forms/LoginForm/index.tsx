import { FormContainer } from "react-hook-form-mui";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import StyledTextField from "@/components/Common/StyledTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Schemas";

interface LoginProps {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [values, setValues] = useState<LoginProps>();
  const onSubmit = (data: LoginProps) => {
    setValues(data);
    console.log("submitted data: ", data);
  };
  const formContext = useForm<LoginProps>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    formState: { errors },
  } = formContext;

  return (
    <Box>
      {/*
      // @ts-ignore */}
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <Stack direction={"column"} spacing={2.5} mb={5}>
          <StyledTextField
            size="medium"
            color="secondary"
            id="username"
            name={"username"}
            label={"Username"}
            required
            helperText={errors.username?.message}
          />
          <StyledTextField
            size="medium"
            color="secondary"
            id="password"
            name={"password"}
            label={"Password"}
            type="password"
            required
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
