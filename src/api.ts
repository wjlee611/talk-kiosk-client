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
  };
}

interface IgetOrder {
  code: number;
  isSuccess: boolean;
  message: string;
  result: {
    jsonInfo: IOrdered[];
  };
}

export function postOrdered(data: JSON) {
  const json = {
    data: data,
  };
  console.log(json);
  axios
    .post("https://talking-kiosk.shop/app/ordered", JSON.stringify(json), {
      headers: header,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export async function getOrdered() {
  try {
    const res = await axios.get<IgetOrder>(
      "https://talking-kiosk.shop/app/ordered"
    );
    const result = res.data.result.jsonInfo;
    return result;
  } catch (err) {
    console.log(err);
  }
}
