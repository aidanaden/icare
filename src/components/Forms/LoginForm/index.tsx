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
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import FeedbackSnackbar from "../Common/FeedbackSnackbar";

interface LoginProps {
  staff_id: string;
  password: string;
}

export default function LoginForm() {
  const [loginSuccessOpen, setLoginSuccessOpen] = useState<boolean>(false);
  const [loginErrorOpen, setLoginErrorOpen] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const onSubmit = async (data: LoginProps) => {
    const { staff_id, password } = data;
    console.log("submitted data: ", data);
    setLoginLoading(true);
    try {
      const response = await signIn(staff_id, password);
      if (response?.status_code === 200) {
        setLoginSuccessOpen(true);
        setLoginLoading(false);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2500);
      }
    } catch (err) {
      setLoginLoading(false);
      console.log("error occurred while logging in: ", err);
      setLoginErrorOpen(true);
    }
  };

  const {
    control,
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
      <LoadingButton
        type={"submit"}
        size="large"
        fullWidth
        sx={{ borderRadius: "8px", py: "12px" }}
        variant={"contained"}
        color={"secondary"}
        disableElevation
        loading={loginLoading}
      >
        Submit
      </LoadingButton>
      <FeedbackSnackbar
        successOpen={loginSuccessOpen}
        setSuccessOpen={setLoginSuccessOpen}
        successMsg="Successfully logged in! Redirecting now..."
        errorOpen={loginErrorOpen}
        setErrorOpen={setLoginErrorOpen}
        errorMsg="Error occurred while trying to log in. Please try again."
      />
    </form>
  );
}
