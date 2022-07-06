// export const BASE_URL = "https://testicare.stoneforest.com.sg";
// export const BASE_URL = "https://icare.rsmsingapore.sg";
export const BASE_URL = process.env.BASE_URL || "https://icare.rsmsingapore.sg";
export const API_URL = `${BASE_URL}/api/Api/icare/crm/`;
export const FORGET_API_URL =
  "https://prod-07.southeastasia.logic.azure.com:443/workflows/98eab11c0df94a86ade865c763151fa9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FEX-pOU8YLt1Vhw7VnUk6QFZagDuO48jn6i30pIcDLE";
// export const FORGET_API_URL =
//   "https://prod-05.southeastasia.logic.azure.com:443/workflows/05da25c530e840abb0798958058eeb58/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PkJK-yZmC4dSqYUtrLYi0CTeTtpk5VDsnT14tCM9WyQ";
export const BASE64_SPLIT_KEY = ";base64,";
export const IMAGE_FILE_TYPE = "image/*";
export const PDF_FILE_TYPE = "application/pdf";
export const WORD_FILE_TYPE = "application/msword";
export const EXCEL_FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const INVALID_NOMINATABLE_STAFF = [
  "senior partner",
  "partner",
  "senior director",
  "director",
  "associate director",
];
export const STARTING_YEAR = "2021";
export const RECAPTCHA_API_KEY = "6LfORqsgAAAAACQzPcYxzKWXxRoUJsLH6qzOEkkb";
