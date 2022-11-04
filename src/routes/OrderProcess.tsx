import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { postOrdered } from "../api";
import { orderedMenu } from "../atoms";

function OrderProcess() {
  const [timer, setTimer] = useState(0);
  const myOrder = useRecoilValue(orderedMenu);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    postOrdered(myOrder);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {}, [timer]);

  return <h1>processing</h1>;
}

export default OrderProcess;
