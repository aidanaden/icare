import { atom } from "recoil";

export const nominationYearState = atom<string>({
  key: "nominationYear",
  default: new Date().getFullYear().toString(),
});
