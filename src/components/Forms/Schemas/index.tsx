import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().password().required(),
  })
  .required();

export const nominationDetailSchema = yup
  .object({
    email: yup.string().email().required(),
    department: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
