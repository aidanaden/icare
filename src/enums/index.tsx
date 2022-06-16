export enum UserRole {
  STAFF = "User",
  HOD = "HOD",
  COMMITTEE = "Committee",
}

export enum NominationFormStatus {
  ALL = "all",
  PENDING = "pending",
  REJECTED = "rejected",
  ENDORSED = "endorsed",
  SUBMITTED = "submitted",
  INCOMPLETE = "incomplete",
  SHORTLISTED = "shortlisted",
  AWARDED = "awarded",
  CHAMPION = "champion",
}

export enum DepartmentType {
  ALL = "All",
  AUDIT = "Audit",
  IT = "IT",
  SALES = "Sales",
  SFIT = "SFIT",
  MIS = "MIS",
}

export enum ShortlistStatus {
  TRUE = 170740000,
  FALSE = 170740001,
}

export enum ServiceLevelWinner {
  TRUE = 170740000,
  FALSE = 170740001,
  PENDING = 0,
}

export enum ServiceLevel {
  UNBELIEVABLE = 170740000,
  SURPRISING = 170740001,
  DESIRED = 170740002,
  EXPECTED = 170740003,
  BASIC = 170740004,
  PENDING = 0,
}

export enum EndorsementStatus {
  PENDING = 0,
  COMMENDABLE = 170740000,
  NEUTRAL = 170740001,
}

export enum NominationFilter {
  USER = 1,
  SUBMITTED = 2,
  ALL = 3,
  ENDORSED = 4,
}
