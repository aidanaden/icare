import { Button, Link, Stack, Typography } from "@mui/material";
import { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Schemas";
import useAuth from "@/hooks/useAuth";
import FormTextField from "../Common/FormTextField";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import FeedbackSnackbar from "../Common/FeedbackSnackbar";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_API_KEY } from "@/constants";
import PrimaryButton from "@/components/Common/PrimaryButton";
import ForgetPasswordDialog from "@/components/Common/Dialog/ForgetPasswordDialog";
import { VideoLibrary } from "@mui/icons-material";
import CenterBox from "@/components/Common/CenterBox";

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
  const recaptchaRef = createRef<ReCAPTCHA>();

  const onSubmit = async (data: LoginProps) => {
    const captchaToken = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    const { staff_id, password } = data;
    setLoginLoading(true);
    try {
      const response = await signIn(staff_id, password);
      if (response?.status_code === 200) {
        setLoginSuccessOpen(true);
        setLoginLoading(false);
        // setTimeout(() => {
        //   router.push("/dashboard");
        // }, 2500);
        router.push("/dashboard");
      }
    } catch (err) {
      setLoginLoading(false);
      console.error("error occurred while logging in: ", err);
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
          error={errors.staff_id?.message?.replace("staff_id", "Staff ID")}
          placeholder="Staff ID"
        />
        <FormTextField
          control={control}
          label="Password"
          name="password"
          type="password"
          error={errors.password?.message?.replace("password", "Password")}
          placeholder="Password"
        />
      </Stack>
      {/* <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_API_KEY}
        size="invisible"
      /> */}
      <Stack direction="column" spacing={1}>
        <PrimaryButton
          type={"submit"}
          size="large"
          fullWidth
          sx={{ borderRadius: "8px", py: "12px" }}
          loading={loginLoading}
        >
          Submit
        </PrimaryButton>
        <ForgetPasswordDialog />
      </Stack>
      <CenterBox
        display={"flex"}
        textAlign={"center"}
        justifyContent={"center"}
        mt={5}
      >
        <Link
          href="https://icare.rsmsingapore.sg/video/iCARE%20Introduction%20Video.mp4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Stack direction="row" spacing={1}>
            <VideoLibrary />
            <Typography>Introduction Video</Typography>
          </Stack>
        </Link>
      </CenterBox>
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
