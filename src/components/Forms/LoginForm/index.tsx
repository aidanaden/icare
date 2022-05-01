import { FormContainer } from "react-hook-form-mui";
import { Stack } from "@mui/material";
import { useState } from "react";
import StyledTextField from "@/components/Common/FormTextField";
import PrimaryButton from "@/components/Common/PrimaryButton";

interface LoginProps {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [values, setValues] = useState<LoginProps>();
  const onSubmit = (data: LoginProps) => {
    setValues(data);
  };
  const defaultValues: LoginProps = {
    username: "",
    password: "",
  };
  return (
    <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
      <>
        <Stack direction={"column"} spacing={2} mb={4}>
          <StyledTextField
            size="medium"
            color="secondary"
            name={"username"}
            label={"Username"}
            required
          />
          <StyledTextField
            size="medium"
            color="secondary"
            name={"password"}
            label={"Password"}
            type="password"
            required
          />
        </Stack>
        <PrimaryButton type={"submit"} size="large" fullWidth>
          Submit
        </PrimaryButton>
      </>
    </FormContainer>
  );
}
