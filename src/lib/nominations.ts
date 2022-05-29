import { API_URL } from "@/constants";
import { NominationFilter } from "@/enums";
import {
  CommitteeMemberQueryData,
  HODQueryData,
  NominationDataTableData,
  NominationDetailQueryData,
  NominationFormSubmissionData,
  NominationQuestionsQueryData,
} from "@/interfaces";
import axios from "axios";
import useSWR from "swr";

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
  formState: NominationFormSubmissionData
) => {
  const data = {
    case_id: "",
    nominator_id: "",
    nominee_id: "",
    nomination_reason: "",
    quiz_response: "",
    draft_status: true,
    attachment: [],
  };
  return await postAPI("UpsertNomination", data);
};

const useFetchNominationDetails = (case_id?: string) => {
  const { data, error } = useSWR<NominationDetailQueryData>(
    ["/RetrieveNominationDetails", { case_id: case_id }],
    fetchAPI
  );
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
    committee_service_level: "",
    shortlist_status: committeeData.shortlist_status,
    champion_status: committeeData.champion_status,
  };
  return await postAPI("/nominations/id", data);
};

const useFetchNominations = (id?: string, filter?: NominationFilter) => {
  const { data, error } = useSWR<Omit<NominationDataTableData, "status">[]>(
    ["/RetrieveNomination", { staff_id: id, filter: filter, year: "" }],
    fetchAPI
  );
  return { nominationData: data, isLoading: !error && !data, isError: error };
};

const useFetchQuiz = (staff_id?: string) => {
  const { data, error } = useSWR<NominationQuestionsQueryData>(
    ["/RetrieveQuiz", { staff_id: staff_id }],
    fetchAPI,
    { suspense: true }
  );
  return { questionData: data, isLoading: !error && !data, isError: error };
};

const useFetchStaff = (keyword?: string) => {
  const { data, error } = useSWR(
    ["RetrieveStaffList", { keyword: keyword }],
    fetchAPI
  );
  return { staffData: data, isLoading: !error && !data, isError: error };
};

const useFetchFile = (case_id?: string, file_name?: string) => {
  const { data, error } = useSWR(
    ["RetrieveFile", { case_id: case_id, file_name: file_name }],
    fetchAPI
  );
  return { fileData: data, isLoading: !error && !data, isError: error };
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
  useFetchStaff,
  useFetchFile,
};
