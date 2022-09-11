import { IOrdered } from "./api";
import priceJsonData from "./price-table.json";

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

export function calcCost(menu: IOrdered["menu"], idx: number) {
  const priceData: any = priceJsonData;
  // 계산
  let price = 0;
  price += priceData[menu[idx].id[0]];
  menu[idx].option.map((i) => {
    price += priceData[i];
  });
  menu[idx].set.map((i) => {
    price += priceData[i];
  });
  if (menu[idx].set.length) {
    price -= 1200;
  }
  price *= menu[idx].qty;

  return price;
}
