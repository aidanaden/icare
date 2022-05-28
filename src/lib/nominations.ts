import { API_URL } from "@/constants";
import { NominationFormSubmissionData } from "@/interfaces";
import axios from "axios";

const callAPI = async (path: string, method: string, body: any) => {
  try {
    const response = await axios({
      url: `${API_URL}${path}`,
      method: method,
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
      data: JSON.stringify(body),
    });
    const data = await response.data.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const upsertNominationForm = async (
  formState: NominationFormSubmissionData
) => {
  return callAPI("/nomination/id", "POST", {});
};
