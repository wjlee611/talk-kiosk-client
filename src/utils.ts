import { IOrdered } from "./api";

export function idToName(source: any, id: number) {
  return source[id];
}

interface IConflictList {
  idx: number;
  conflictList: number[];
}
export function menuConflictCheck(
  orderList: IOrdered["menu"]
): IConflictList[] {
  let conflictList: IConflictList[] = [];
  orderList.map((menu, idx) => {
    if (menu.id.length > 1)
      conflictList.push({ idx: idx, conflictList: menu.id });
  });
  return conflictList;
}
