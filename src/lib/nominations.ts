import { NominationFilter } from "@/enums";
import {
  CommitteeMemberQueryData,
  FileFetchData,
  FileQueryData,
  FileStringNameData,
  HODQueryData,
  NominationDataTableData,
  NominationDetailQueryData,
  NominationFormSubmissionData,
  NominationQuestionsQueryData,
  StaffData,
  FileNameString,
} from "@/interfaces";
import axios from "axios";
import useSWR from "swr";
import quizData from "@/constants/RetrieveQuiz/retrievequiz_response_senior.json";
import userNominationData from "@/constants/RetrieveNomination/retrievenomination_1_response.json";
import submittedNominationData from "@/constants/RetrieveNomination/retrievenomination_2_response.json";
import endorsedNominationData from "@/constants/RetrieveNomination/retrievenomination_3_response.json";
import nominationDetailData from "@/constants/RetrieveNominationDetails/retrievenominationdetails_response.json";
import fileData from "@/constants/RetrieveFile/retrieveFile_response.json";
import staffData from "@/constants/RetrieveStaffList/retrievestafflist_response.json";
import recursivelyLowercaseJSONKeys from "recursive-lowercase-json";
import { API_URL } from "@/constants";

const callAPI = async <JSON = any>(
  path: string,
  method: string,
  body?: any
): Promise<JSON> => {
  const response = await axios({
    url: `${API_URL}${path}`,
    method: method,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    data: JSON.stringify(body),
  });
  return response.data;
};

const fetchAPI = async <JSON = any>(
  path: string,
  body?: any
): Promise<JSON> => {
  return callAPI(path, "GET", body);
};

const postAPI = async <JSON = any>(path: string, body: any): Promise<JSON> => {
  return callAPI(path, "POST", body);
};

const upsertNominationForm = async (
  id: string,
  formState: NominationFormSubmissionData,
  draft_status: boolean
) => {
  const answersArray: string[] = Object.values(formState.answers);
  const data = {
    nominator_id: id,
    nominee_id: formState.user?.staff_id,
    nomination_reason: formState.description,
    quiz_response: answersArray,
    draft_status: draft_status,
    attachment: formState.files,
  };
  console.log("uploading nomination form data: ", data);
  return await postAPI("UpsertNomination", data);
};

const fetchNominationDetails = async (
  case_id?: string
): Promise<NominationDetailQueryData> => {
  const data = await fetchAPI<NominationDetailQueryData>(
    "RetrieveNominationDetails",
    { case_id: case_id }
  );
  return data;
};

const upsertNominationFormHODComments = async (hodData: HODQueryData) => {
  return await postAPI("UpdateHODEndorsement", hodData);
};

const upsertNominationFormCommitteeComments = async (
  committeeData: Omit<
    CommitteeMemberQueryData,
    "committee_name" | "committee_designation" | "committee_department"
  >
) => {
  const data = {
    case_id: committeeData.case_id,
    committee_id: committeeData.committee_id,
    committee_comments: committeeData.committee_comments,
    committee_service_level: committeeData.committee_service_level,
    service_level_winner_status: committeeData.service_level_winner_status,
    shortlist_status: committeeData.shortlist_status,
    champion_status: committeeData.champion_status,
  };
  return await postAPI("/nominations/id", data);
};

const fetchNominations = async (
  id?: string,
  filter?: NominationFilter
): Promise<NominationDataTableData[]> => {
  const nominations = await postAPI<NominationDataTableData[]>(
    "RetrieveNomination",
    {
      staff_id: id,
      filter: filter,
      year: "2022",
    }
  );
  return nominations;
};

const fetchQuiz = async (
  staff_id?: string
): Promise<NominationQuestionsQueryData> => {
  const data = await fetchAPI<NominationQuestionsQueryData>("RetrieveQuiz", {
    staff_id: staff_id,
  });
  return data;
};

const fetchStaff = async (keyword?: string, department?: string) => {
  console.log("fetching staff data...");
  // return recursivelyLowercaseJSONKeys(staffData);
  const data = await fetchAPI<StaffData[]>("RetrieveStaffList", {
    keyword: keyword,
    department: department,
  });
  return data;
};

const fetchFile = async (
  case_id?: string,
  file_name?: string
): Promise<FileStringNameData> => {
  // const data = recursivelyLowercaseJSONKeys(fileData);
  const data = await fetchAPI<FileQueryData>("RetrieveFile", {
    case_id: case_id,
    file_name: file_name,
  });
  return {
    file_name: file_name!,
    file_string: data.file_string,
    message: "success",
    status_code: 200,
  };
};

const fetchFileStrings = (fileFetchDatas: FileFetchData[]) => {
  const files = Promise.all(
    fileFetchDatas.map(
      async (fileFetchData: FileFetchData): Promise<FileStringNameData> => {
        const data = await fetchAPI<FileQueryData>("RetrieveFile", {
          case_id: fileFetchData.case_id,
          file_name: fileFetchData.file_name,
        });
        // return data;
        return {
          ...recursivelyLowercaseJSONKeys(data),
          file_name: fileFetchData.file_name,
        };
      }
    )
  );
  return files;
};

const deleteDraftNomination = async (case_id: string) => {
  const data = {
    case_id: case_id,
  };
  return await postAPI("DeleteDraft", data);
};

export {
  fetchAPI,
  postAPI,
  upsertNominationForm,
  fetchNominationDetails,
  upsertNominationFormHODComments,
  upsertNominationFormCommitteeComments,
  fetchNominations,
  fetchQuiz,
  fetchStaff,
  fetchFile,
  fetchFileStrings,
  deleteDraftNomination,
};
