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
  QueryData,
  DraftQuizResponseQueryData,
  NominationFormQueryData,
  WinnerHistoryQueryData,
  DepartmentQueryData,
} from "@/interfaces";
import axios from "axios";
import useSWR from "swr";
import recursivelyLowercaseJSONKeys from "recursive-lowercase-json";
import { API_URL } from "@/constants";
import { getStatusFromData } from "@/utils";

const callAPI = async <JSON = any>(
  path: string,
  method: string,
  body?: any
): Promise<JSON> => {
  console.log(`url to call api from: ${API_URL}${path}`);
  const response = await axios({
    url: `${API_URL}${path}`,
    method: method,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    data: JSON.stringify(body),
  });
  return recursivelyLowercaseJSONKeys(response.data);
};

const fetchAPI = async <JSON = any>(
  path: string,
  body?: any
): Promise<JSON> => {
  return callAPI(path, "GET", body);
};

const postAPI = async <JSON = any>(path: string, body?: any): Promise<JSON> => {
  return callAPI(path, "POST", body);
};

const upsertNominationForm = async (
  id: string,
  formState: NominationFormSubmissionData,
  draft_status: boolean,
  case_id?: string
) => {
  const answersArray: string[] = Array.from(formState.answers.values()).filter(
    (d) => d !== undefined && d !== null && d !== ""
  );
  const data = {
    nominator_id: id,
    nominee_id: formState.user?.staff_id,
    nomination_reason: formState.description,
    quiz_response: answersArray,
    draft_status: draft_status,
    file: formState.files,
    case_id: case_id ?? null,
  };
  return await postAPI<NominationFormQueryData>("UpsertNomination", data);
};

const fetchNominationDetails = async (
  case_id?: string
): Promise<NominationDetailQueryData> => {
  const data = await postAPI<NominationDetailQueryData>(
    "RetrieveNominationDetails",
    { case_id: case_id }
  );
  return data as NominationDetailQueryData;
};

const useNominationDetails = (case_id?: string) => {
  const { data, error, mutate } = useSWR<NominationDetailQueryData>(
    ["RetrieveNominationDetails", { case_id: case_id }],
    postAPI
  );
  return { data: data, error: error, loading: !data && !error, mutate: mutate };
};

const upsertNominationFormHODComments = async (hodData: HODQueryData) => {
  return await postAPI("UpdateHODEndorsement", hodData);
};

const upsertNominationFormCommitteeComments = async (
  committeeData: Omit<
    CommitteeMemberQueryData,
    | "committee_name"
    | "committee_designation"
    | "committee_department"
    | "shortlist_status"
  >
) => {
  const data = {
    case_id: committeeData.case_id,
    committee_id: committeeData.committee_id,
    committee_comments: committeeData.committee_comments,
    committee_service_level: committeeData.committee_service_level,
    service_level_winner_status: committeeData.service_level_winner_status,
    champion_status: committeeData.champion_status,
  };
  return await postAPI<QueryData>("UpsertCommitteeComments", data);
};

const useNominations = (
  id?: string,
  filter?: NominationFilter,
  year?: string
) => {
  const { data, error, mutate } = useSWR<NominationDataTableData[]>(
    [
      "RetrieveNomination",
      {
        staff_id: id,
        filter: filter,
        year: year,
      },
    ],
    postAPI
  );
  const transformedData = data?.map((d) => getStatusFromData(d));
  return {
    data: transformedData,
    error: error,
    loading: !data && !error,
    mutate: mutate,
  };
};

const useQuiz = (staff_id?: string) => {
  const { data, error } = useSWR<NominationQuestionsQueryData>(
    [
      "RetrieveQuiz",
      {
        staff_id: staff_id,
      },
    ],
    postAPI
  );
  return { data: data, error: error, loading: !data && !error };
};

const useDraftQuizResponse = (case_id?: string) => {
  const { data, error } = useSWR<DraftQuizResponseQueryData>(
    ["RetrieveQuizResponseForDraft", { case_id: case_id }],
    postAPI
  );
  return {
    draftQuizResponseData: data,
    draftQuizResponseError: error,
    draftQuizResponseLoading: !data && !error,
  };
};

const useStaff = (keyword?: string, department?: string) => {
  const { data, error } = useSWR<StaffData[]>(
    [
      "RetrieveStaffList",
      {
        keyword: keyword,
        department: department,
      },
    ],
    postAPI
  );
  return { staffData: data, error: error, loading: !data && !error };
};

const fetchStaff = async (keyword?: string, department?: string) => {
  const response = await postAPI<StaffData[]>("RetrieveStaffList", {
    keyword: keyword,
    department: department,
  });
  return response;
};

const useStaffDepartments = () => {
  const { data, error } = useSWR<DepartmentQueryData>(
    "RetrieveDepartmentList",
    postAPI,
    { revalidateIfStale: false }
  );
  return {
    departmentData: data,
    departmentError: error,
    departmentLoading: !data && !error,
  };
};

const fetchFile = async (
  case_id?: string,
  file_name?: string
): Promise<FileStringNameData> => {
  const data = (await postAPI<FileQueryData>("RetrieveFile", {
    case_id: case_id,
    file_name: file_name,
  })) as FileQueryData;
  return {
    file_name: file_name!,
    file_string: data.file_string,
    file_type: data.file_type,
    message: "success",
    status_code: 200,
  };
};

const fetchFileStrings = (fileFetchDatas: FileFetchData[]) => {
  const files = Promise.all(
    fileFetchDatas.map(
      async (fileFetchData: FileFetchData): Promise<FileStringNameData> => {
        const data = await postAPI<FileQueryData>("RetrieveFile", {
          case_id: fileFetchData.case_id,
          file_name: fileFetchData.file_name,
        });
        // return data;
        return {
          ...(data as FileQueryData),
          file_name: fileFetchData.file_name,
        };
      }
    )
  );
  return files;
};

const deleteFile = async (
  case_id?: string,
  file_name?: string
): Promise<QueryData> => {
  return await postAPI<QueryData>("DeleteFile", {
    case_id: case_id,
    file_name: file_name,
  });
};

const deleteDraftNomination = async (case_id: string) => {
  const data = {
    case_id: case_id,
  };
  return await postAPI("DeleteDraft", data);
};

const usePastWinners = async (year: string) => {
  const { data, error } = useSWR<WinnerHistoryQueryData>(
    [
      "RetrieveAwardWinnerHistory",
      {
        year: year,
      },
    ],
    postAPI
  );
  return {
    pastWinnerData: data,
    pastWinnerError: error,
    pastWinnerLoading: !data && !error,
  };
};

export {
  fetchAPI,
  postAPI,
  upsertNominationForm,
  fetchNominationDetails,
  useNominationDetails,
  upsertNominationFormHODComments,
  upsertNominationFormCommitteeComments,
  useNominations,
  useQuiz,
  useDraftQuizResponse,
  useStaff,
  fetchStaff,
  useStaffDepartments,
  fetchFile,
  fetchFileStrings,
  deleteFile,
  deleteDraftNomination,
  usePastWinners,
};
