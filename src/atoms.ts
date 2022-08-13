import { atom } from "recoil";

export const screenUpdate = atom<boolean>({
  key: "screenUpdate",
  default: false,
});

export const menuSet = atom<number[]>({
  key: "set",
  default: [],
});

export const menuOption = atom<boolean[]>({
  key: "option",
  default: [false, false, false, false],
});
