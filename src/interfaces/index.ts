import {
  DepartmentType,
  NominationFormStatus,
  ServiceLevel,
  ShortlistStatus,
} from "@/enums";

export interface User {
  staff_id: string;
  name: string;
  department: string;
  designation: string;
  role: string;
}

export interface DataTableData {
  nominee: string;
  department: DepartmentType;
  status: NominationFormStatus;
  date: Date;
}

// nomination form detail committee member data
export interface CommitteeMemberQueryData {
  staff_id: number;
  committee_name: string;
  committee_shortlist_status: ShortlistStatus;
  top_winner_status: boolean;
  committee_designation: string;
  committee_department: string;
}

// nomination form detail data
export interface NominationQueryData {
  nominee_name: string;
  nominee_designation: string;
  nominee_department: string;
  nomination_date: Date;
  nominator_name: string;
  nominator_designation: string;
  nominator_department: string;
  description: string;
  quiz_service_level: ServiceLevel;
  quiz_score: number;
  draft_status: boolean;
  service_level_award: boolean;
  champion_shortlist_status: boolean;
  champion_award: boolean;
  hod_name: string;
  hod_designation: string;
  endorsement_status: string;
  hod_comments: string;
  committee_total_score: number;
  committee_service_level: ServiceLevel;
  committee_comment: CommitteeMemberQueryData[];
  total_top_winner_status: boolean;
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

// nomination form senior questions data
export interface RatingQuestionData {
  quiz_question_data: string;
  rating_child_quiz_questions: NominationQuestionData[];
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
