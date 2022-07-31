import { atom } from "recoil";

export const screenUpdate = atom<boolean>({
  key: "screenUpdate",
  default: false,
});
