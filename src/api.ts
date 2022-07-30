import axios from "axios";

const header = {
  "Content-Type": `application/json`,
};

export interface IOrdered {
  order: number;
  price: number;
  takeout: boolean;
  menu: {
    id: number;
    set?: number[];
    option?: number[];
  }[];
}

interface IGetOrder {
  code: number;
  isSuccess: boolean;
  message: string;
  result: {
    jsonInfo: { ordered: IOrdered }[];
  };
}

export function postOrdered(data: IOrdered) {
  try {
    // Client-side Validation
    if (
      // 데이터 형식에 필요한 모든 키 값이 존재하는지 검사
      data?.order === undefined ||
      data?.price === undefined ||
      data?.takeout === undefined ||
      data?.menu === undefined
    ) {
      throw new Error(`"order", "price", "takeout", "meun" keys are required.`);
    } else {
      // 메뉴 배열에 하나 이상의 데이터가 있는지 검사
      if (data.menu.length <= 0) {
        throw new Error(`menu[] must contain at least one menu.`);
      } else {
        data.menu.map((item) => {
          // 메뉴 배열의 아이템 형식이 객체인지 검사
          if (typeof item !== "object") {
            throw new Error(`menu[] must have only object types.`);
          } else {
            // 메뉴 배열의 아이템 객체의 id키의 존재여부와 값이 number 타입인지 검사
            if (item?.id === undefined || typeof item.id !== "number") {
              throw new Error(`menu must have "id" key and number value.`);
            }
          }
          return null;
        });
      }
      // order키의 값이 number 타입인지 검사
      if (typeof data.order !== "number") {
        throw new Error(`typeof "order" key is must be number value.`);
      }
      // price키의 값이 number 타입인지 검사
      if (typeof data.price !== "number") {
        throw new Error(`typeof "price" key is must be number value.`);
      }
      // takeout키의 값이 boolean 타입인지 검사
      if (typeof data.takeout !== "boolean") {
        throw new Error(`typeof "takeout" key is must be boolean value.`);
      }
    }

    const json = {
      data: data,
    };
    axios
      .post("https://talking-kiosk.shop/app/ordered", JSON.stringify(json), {
        headers: header,
      })
      .then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
}

export async function GetOrdered(): Promise<IOrdered[]> {
  let result: IOrdered[] = [];
  try {
    const res = await axios.get<IGetOrder>(
      "https://talking-kiosk.shop/app/ordered"
    );
    const resResult = res.data.result.jsonInfo;
    resResult.map((order) => {
      result.push(order.ordered);
    });
  } catch (err) {
    console.log(err);
  } finally {
    return result;
  }
}
