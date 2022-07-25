import {
  EndorsementStatus,
  NominationFormStatus,
  ServiceLevel,
  ServiceLevelWinner,
  ShortlistStatus,
  UserRole,
} from "@/enums";

export interface ID {
  name: string;
  staff_id: string;
}

export interface User extends ID {
  role: UserRole[];
  year: string;
  committeeMembers: ID[];
}

export interface NominationDataTableData {
  case_id: string;
  nominee_name: string;
  nominee_designation: string;
  nominee_department: string;
  nominee_team: string;
  nomination_date: string;
  nomination_created_date: string;
  nomination_submitted_date: string;
  nominator_name: string;
  nomination_status: NominationFormStatus;
  hod_name?: string;
  hod_id?: string;
  endorsement_status: EndorsementStatus;
  committee_service_level_result?: ServiceLevel;
  committee_total_score?: number;
  is_champion_result: boolean;
  draft_status: boolean;
  is_service_level_winner: ServiceLevelWinner;
  is_champion_shortlist_result: boolean;
  answers: string[];
  quiz_service_level: ServiceLevel;
  committee_vote?: CommitteeMemberVote[];
}

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

export interface CommitteeMemberVote {
  committee_id: string;
  committee_name: string;
  committee_service_level: ServiceLevel;
  service_level_winner_status: ServiceLevelWinner;
  champion_status: boolean;
}

// nomination form detail committee member data
export interface CommitteeMemberQueryData {
  case_id: string;
  committee_id: string;
  committee_name: string;
  committee_designation: string;
  committee_department: string;
  committee_comments: string;
  committee_service_level: ServiceLevel;
  service_level_winner_status: ServiceLevelWinner;
  shortlist_status: ShortlistStatus;
  champion_status: boolean;
}

// nomination form detail data
export interface NominationDetailQueryData extends QueryData {
  nominee_id: string;
  nominee_name: string;
  nominee_designation: string;
  nominee_department: string;
  nominee_team: string;
  nomination_date: Date;
  nominator_id: string;
  nominator_name: string;
  nominator_designation: string;
  nominator_department: string;
  nominator_team: string;
  nomination_reason: string;
  hod_id: string;
  hod_name: string;
  hod_department: string;
  hod_designation: string;
  hod_comments: string;
  endorsement_status: EndorsementStatus;
  endorsement_date: string;
  quiz_service_level: ServiceLevel;
  quiz_score: number;
  committee_service_level_result: ServiceLevel;
  committee_total_score: number;
  draft_status: boolean;
  is_service_level_winner: ServiceLevelWinner;
  is_champion_shortlist_result: boolean;
  is_champion_result: boolean;
  committee_comment: CommitteeMemberQueryData[];
  total_champion_status: boolean;
  attachment_list?: string[];
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
  quiz_question_name: string;
  rating_child_quiz_questions: RatingChildQuestionData[];
}

// nomination form data
export interface NominationQuestionsQueryData {
  qna_questions: NominationQuestionData[];
  rating_questions?: RatingQuestionData[] | undefined;
}

export interface NominationFormSubmissionDetails {
  user: StaffData | undefined;
  department: string | undefined;
  description: string | undefined;
  files: FileNameString[] | undefined;
}

export interface NominationFormSubmissionData
  extends NominationFormSubmissionDetails {
  case_id?: string;
  answers: Map<string, string>;
}

export interface StaffData {
  staff_id: string;
  staff_name: string;
  staff_department: string;
  staff_corporate_rank: string;
}

export interface DepartmentQueryData extends QueryData {
  department_list: string[];
}

export interface FileNameString {
  file_name: string;
  file_string: string;
}

export interface FileQueryData extends QueryData {
  file_string: string;
  file_type: string;
}

export interface FileStringNameData extends FileQueryData {
  file_name: string;
}

export interface FileFetchData {
  case_id: string;
  file_name: string;
}

export interface DraftQuizResponseQueryData extends QueryData {
  response_list: string[];
}

export interface LoginQueryData extends QueryData {
  name: string;
  current_financial_year: string;
}

export interface NominationFormQueryData extends QueryData {
  case_id: string;
}

export interface WinnerData {
  nominee_name: string;
  nominee_department: string;
  nominator_name: string;
  committee_service_level: ServiceLevel;
  is_champion_result: boolean;
  nominee_prize?: string;
  nominator_prize?: string;
}

export interface WinnerHistoryQueryData extends QueryData {
  award_winner_list: WinnerData[];
}

export interface CommitteeMemberListQueryData extends QueryData {
  committee_member_list: ID[];
}
