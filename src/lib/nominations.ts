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
import quizData from "@/constants/RetrieveQuiz/retrievequiz_response.json";
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
  return response.data.json();
};

const fetchAPI = async <JSON = any>(
  path: string,
  body?: any
): Promise<JSON> => {
  return callAPI(path, "GET", body);
};

const postAPI = async (path: string, body: any) => {
  try {
    return callAPI(path, "POST", body);
  } catch (err) {
    console.error(err);
  }
};

const upsertNominationForm = async (
  id: string,
  formState: NominationFormSubmissionData
) => {
  const data = {
    case_id: formState.case_id,
    nominator_id: id,
    nominee_id: formState.user,
    nomination_reason: formState.description,
    quiz_response: formState.answers,
    // TODO: check draft status
    draft_status: true,
    // TODO: convert File() to { file_name, file_string_base64 }
    attachment: formState.files,
  };
  return await postAPI("UpsertNomination", data);
};

const useFetchNominationDetails = (case_id?: string) => {
  const data = recursivelyLowercaseJSONKeys(
    nominationDetailData
  ) as NominationDetailQueryData;
  const error = false;
  // const { data, error } = useSWR<NominationDetailQueryData>(
  //   ["/RetrieveNominationDetails", { case_id: case_id }],
  //   fetchAPI,
  //   { suspense: true }
  // );
  return {
    nominationDetailsData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const upsertNominationFormHODComments = async (hodData: HODQueryData) => {
  return await postAPI("UpdateHODEndorsement", hodData);
};

const upsertNominationFormCommitteeComments = async (
  committeeData: CommitteeMemberQueryData
) => {
  const data = {
    case_id: committeeData.case_id,
    committee_id: committeeData.committee_id,
    committee_comments: committeeData.committee_comments,
    committee_service_level: committeeData.committee_service_level,
    shortlist_status: committeeData.shortlist_status,
    champion_status: committeeData.champion_status,
  };
  return await postAPI("/nominations/id", data);
};

const useFetchNominations = (id?: string, filter?: NominationFilter) => {
  let data;
  let error;

  if (filter === NominationFilter.USER) {
    data = recursivelyLowercaseJSONKeys(userNominationData);
    error = false;
  } else if (filter === NominationFilter.SUBMITTED) {
    data = recursivelyLowercaseJSONKeys(submittedNominationData);
  } else {
    data = recursivelyLowercaseJSONKeys(endorsedNominationData);
  }

  // const { data, error } = useSWR<Omit<NominationDataTableData, "status">[]>(
  //   ["/RetrieveNomination", { staff_id: id, filter: filter, year: "" }],
  //   fetchAPI,
  //   { suspense: true }
  // );
  return { nominationData: data, isLoading: !error && !data, isError: error };
};

const useFetchQuiz = (staff_id?: string) => {
  const data = recursivelyLowercaseJSONKeys(quizData);
  const error = false;
  // const { data, error } = useSWR<NominationQuestionsQueryData>(
  //   ["/RetrieveQuiz", { staff_id: staff_id }],
  //   fetchAPI,
  //   { suspense: true }
  // );
  return { questionData: data, isLoading: !error && !data, isError: error };
};

const fetchStaff = (keyword?: string, department?: string) => {
  console.log("fetching staff data...");
  return recursivelyLowercaseJSONKeys(staffData);
  // return await fetchAPI<StaffData[]>("RetrieveStaffList", {
  //   keyword: keyword,
  //   department: department,
  // });
};

const useFetchStaff = (
  keyword?: string,
  department?: string
): { staffData: StaffData[]; isLoading: boolean; isError: boolean } => {
  const data = recursivelyLowercaseJSONKeys(staffData);
  const error = false;
  // const { data, error } = useSWR<StaffData[]>(
  //   ["RetrieveStaffList", { keyword: keyword, department: department }],
  //   fetchAPI,
  //   { suspense: true }
  // );
  return {
    staffData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const useFetchFile = (case_id?: string, file_name?: string) => {
  const data = recursivelyLowercaseJSONKeys(fileData);
  const error = false;
  // const { data, error } = useSWR<FileQueryData>(
  //   ["RetrieveFile", { case_id: case_id, file_name: file_name }],
  //   fetchAPI,
  //   { suspense: true }
  // );
  return { fileData: data, isLoading: !error && !data, isError: error };
};

const fetchFileStrings = (fileFetchDatas: FileFetchData[]) => {
  const files = Promise.all(
    fileFetchDatas.map(
      async (fileFetchData: FileFetchData): Promise<FileStringNameData> => {
        const data = await fetchAPI<FileQueryData>("RetrieveFile", {
          case_id: fileFetchData.case_id,
          file_name: fileFetchData.file_name,
        });
        return {
          ...recursivelyLowercaseJSONKeys(data),
          file_name: fileFetchData.file_name,
        };
      }
    )
  );
  return files;
};

export {
  fetchAPI,
  postAPI,
  upsertNominationForm,
  useFetchNominationDetails,
  upsertNominationFormHODComments,
  upsertNominationFormCommitteeComments,
  useFetchNominations,
  useFetchQuiz,
  fetchStaff,
  useFetchStaff,
  useFetchFile,
  fetchFileStrings,
};
