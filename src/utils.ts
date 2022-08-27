import { IOrdered } from "./api";

export function idToName(source: any, id: number) {
  return source[id];
}

export function makeMenu(
  prevMenu: IOrdered["menu"],
  index: number,
  key: "ID" | "OPTION" | "SET",
  value: number[]
) {
  let resultMenu: IOrdered["menu"] = [];
  prevMenu.map((i, idx) => {
    if (idx === index) {
      if (key === "ID") {
        resultMenu.push({
          id: value,
          set: i.set,
          option: i.option,
          qty: i.qty,
        });
      } else if (key === "OPTION") {
        resultMenu.push({
          id: i.id,
          set: i.set,
          option: value,
          qty: i.qty,
        });
      } else if (key === "SET") {
        resultMenu.push({
          id: i.id,
          set: value,
          option: i.option,
          qty: i.qty,
        });
      }
    } else {
      resultMenu.push({
        id: i.id,
        set: i.set,
        option: i.option,
        qty: i.qty,
      });
    }
  });

  return resultMenu;
}

export function makeOption(source: boolean[]) {
  let resultOption: number[] = [];
  source.map((i, idx) => {
    if (i) resultOption.push(idx + 1001);
  });
  return resultOption;
}
