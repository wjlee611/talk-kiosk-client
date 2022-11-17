import { atom } from "recoil";
import { IOrdered } from "./api";
const date = new Date();

export const screenUpdate = atom<boolean>({
  key: "screenUpdate",
  default: false,
});

export const stText = atom<string>({
  key: "stText",
  default: "",
});

export const orderedMenu = atom<IOrdered>({
  key: "orderedMenu",
  default: {
    // order: Math.floor(Math.random() * 10000),
    order: date.getMinutes() * 100 + date.getSeconds(),
    price: 0,
    takeout: false,
    menu: [],
  },
});

export const resultCode = atom<number | undefined>({
  key: "resultCode",
  default: 0,
});

export const processing = atom<boolean | "DONE">({
  key: "processing",
  default: false,
});

export const procIdx = atom<number>({
  key: "procIdx",
  default: 0,
});

export const textProcessing = atom<boolean>({
  key: "textProcessing",
  default: false,
});

export const progressBarLevel = atom<{
  value: number;
  passConflict: boolean;
  stage: "main" | "conflict" | "option" | "set" | "confirm" | "menu";
  progress: string;
}>({
  key: "progressBarLevel",
  default: {
    value: 0,
    passConflict: false,
    stage: "main",
    progress: "0/0",
  },
});
