export enum NominationFormStatus {
  ALL = "all",
  PENDING = "pending",
  ENDORSED = "endorsed",
  SUBMITTED = "submitted",
  INCOMPLETE = "incomplete",
  SHORTLISTED = "shortlisted",
  AWARDED = "awarded",
}

export enum DepartmentType {
  ALL = "All",
  AUDIT = "Audit",
  IT = "IT",
  SALES = "Sales",
  SFIT = "SFIT",
}

export enum ShortlistStatus {
  TRUE = 170740000,
  FALSE = 170740001,
}

export enum ServiceLevel {
  UNBELIEVABLE = 170740000,
  SURPRISING = 170740001,
  DESIRED = 170740002,
  EXPECTED = 170740003,
  BASIC = 170740004,
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
  WINNERS = 4,
}
