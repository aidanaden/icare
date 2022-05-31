import {
  DepartmentType,
  EndorsementStatus,
  NominationFormStatus,
  ServiceLevel,
  ShortlistStatus,
} from "@/enums";

export interface User {
  staff_id: string;
  name: string;
  department: string;
  team?: string;
  designation: string;
  role: string;
}

export interface DataTableData {
  nominee: string;
  department: DepartmentType;
  status: NominationFormStatus;
  date: Date;
}

export interface NominationDataTableData {
  case_id: string;
  status: NominationFormStatus;
  nominee_name: string;
  nominee_designation: string;
  nominee_department: string;
  nominee_team: string;
  nomination_date: string | Date;
  nomination_status: NominationFormStatus;
  endorsement_status: EndorsementStatus;
  committee_service_level?: ServiceLevel;
  committee_total_score?: number;
  is_champion_result: boolean;
  draft_status: boolean;
  is_service_level_shortlist_result: boolean;
  is_champion_shortlist_result: boolean;
}

// {
//       "Committee_Name": "Eileen Tan",
//       "Committee_Designation": "Director",
//       "Committee_Department": "SFIT",
//       "Committee_Comments": "eileen comments",
//       "Shortlist_Status": 170740000,
//       "Top_Winner_Status": true
//     },

export interface QueryData {
  message: string;
  status_code: number;
}

export interface HODQueryData {
  case_id: string;
  hod_id: string;
  hod_comments: string;
  endorsement_status: EndorsementStatus;
}

// nomination form detail committee member data
export interface CommitteeMemberQueryData {
  case_id: string;
  committee_id: string;
  committee_name: string;
  committee_designation: string;
  committee_department: string;
  committee_comments: string;
  shortlist_status: ShortlistStatus;
  champion_status: boolean;
}

// {
//   "Nominee_Name": "Mary Doe",
//   "Nominee_Designation": "Director",
//   "Nominee_Department": "SFIT",
//   "Nomination_Date": "24/05/2022",
//   "Nominator_Name": "Joe Smith",
//   "Nominator_Designation": "Assistant Manager 2",
//   "Nominator_Department": "SFIT",
//   "Nomination_Reason": "24 May 1230pm TEST NOW MAY",
//   "HOD_Name": "Eileen Tan",
//   "HOD_Designation": "Director",
//   "HOD_Department": "SFIT",
//   "HOD_Comments": "hod comment here testing",
//   "Endorsement_Status": 170740000,
//   "Quiz_Service_Level": 170740003,
//   "Quiz_Score": 20,
//   "Committee_Service_Level": 0,
//   "Committee_Total_Score": 25,
//   "is_Service_Level_Shortlist_Result": false,
//   "is_Top_Winner_Shortlist_Result": false,
//   "is_Top_Winner_Result": false,
//   "Committee_Comment": [
//     {
//       "Committee_Name": "Doreen Quek",
//       "Committee_Designation": "HQ Director",
//       "Committee_Department": "SFIT",
//       "Committee_Comments": "doreen comments",
//       "Shortlist_Status": 170740000,
//       "Top_Winner_Status": true
//     },
//     {
//       "Committee_Name": "Eileen Tan",
//       "Committee_Designation": "Director",
//       "Committee_Department": "SFIT",
//       "Committee_Comments": "eileen comments",
//       "Shortlist_Status": 170740000,
//       "Top_Winner_Status": true
//     },
//     {
//       "Committee_Name": "Helen See",
//       "Committee_Designation": "Director B",
//       "Committee_Department": "SFIT",
//       "Committee_Comments": "helen comments",
//       "Shortlist_Status": 170740000,
//       "Top_Winner_Status": false
//     }
//   ],
//   "Attachment_List": [
//     "testfile1.pdf"
//   ],
//   "Message": "Successful",
//   "Status_Code": 200
// }

// nomination form detail data
export interface NominationDetailQueryData extends QueryData {
  nominee_name: string;
  nominee_designation: string;
  nominee_department: string;
  nominee_team: string;
  nomination_date: Date;
  nominator_name: string;
  nominator_designation: string;
  nominator_department: string;
  nominator_team: string;
  nomination_reason: string;
  quiz_service_level: ServiceLevel;
  quiz_score: number;
  draft_status: boolean;
  service_level_award: boolean;
  champion_shortlist_status: boolean;
  champion_award: boolean;
  hod_name: string;
  hod_department: string;
  hod_designation: string;
  endorsement_status: EndorsementStatus;
  hod_comments: string;
  committee_total_score: number;
  committee_service_level: ServiceLevel;
  committee_comment: CommitteeMemberQueryData[];
  total_champion_status: boolean;
  attachment_list?: File[];
}

// nomination form answers
export interface NominationQuestionAnswerData {
  answer_id: number;
  answer_name: string;
}

// nomination form questions
export interface NominationQuestionData {
  quiz_question_name: string;
  answers: NominationQuestionAnswerData[];
}

// nomination form senior child questions data
export interface RatingChildQuestionData {
  child_quiz_question_name: string;
  answers: NominationQuestionAnswerData[];
}

// nomination form senior questions data
export interface RatingQuestionData {
  quiz_question_data: string;
  rating_child_quiz_questions: RatingChildQuestionData[];
}

// nomination form data
export interface NominationQuestionsQueryData {
  qna_questions: NominationQuestionData[];
  rating_questions?: RatingQuestionData[] | undefined;
}

export interface NominationFormSubmissionDetails {
  user: User | undefined;
  department: DepartmentType | undefined;
  description: string | undefined;
  files: File[] | undefined;
}

export interface NominationFormSubmissionData
  extends NominationFormSubmissionDetails {
  answers: Map<string, string>;
}
