import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

export const loginSchema = yup
  .object({
    staff_id: yup.string().required(),
    password: yup.string().required().min(8),
  })
  .required();

export const endorsementSchema = yup
  .object({
    endorsement_status: yup.string().required(),
    comments: yup.string().required(),
  })
  .required();

export const committeeSchema = yup
  .object({
    service_level: yup.string().required(),
    comments: yup.string().required(),
    service_level_award: yup.boolean().required(),
    is_champion_result: yup.boolean(),
  })
  .required();

export const nominationDetailSchema = yup
  .object({
    // user: yup.string().required(),
    user: yup
      .object({
        staff_id: yup.string(),
        name: yup.string(),
        department: yup.string(),
        designation: yup.string(),
        role: yup.string(),
      })
      .required(),
    department: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
