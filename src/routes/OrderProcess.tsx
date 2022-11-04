import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { postOrdered } from "../api";
import {
  orderedMenu,
  processing,
  procIdx,
  progressBarLevel,
  resultCode,
  screenUpdate,
  stText,
  textProcessing,
} from "../atoms";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fec260;
`;
const Title = styled.h1<{ isPosted: boolean | "POSTING" }>`
  font-size: 30px;
  color: ${(props) =>
    props.isPosted === "POSTING"
      ? "white"
      : props.isPosted
      ? "#379237"
      : "tomato"};
`;
const OrderInfoWrapper = styled.div`
  width: 400px;
  height: 50px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 50px;
  & > span:first-child {
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: linear-gradient(90deg, #f65858, #e64848);
  }
  & > span:last-child {
    width: 300px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 700;
    color: #f65858;
  }
`;
const TimeLeft = styled.span`
  color: white;
`;

function OrderProcess() {
  const [timer, setTimer] = useState(0);
  const [isPosted, setIsPosted] = useState<boolean | "POSTING">("POSTING");
  const myOrder = useRecoilValue(orderedMenu);
  const history = useHistory();

  const resetMenu = useSetRecoilState(orderedMenu);

  const reset1 = useResetRecoilState(screenUpdate);
  const reset2 = useResetRecoilState(stText);
  const reset3 = useResetRecoilState(resultCode);
  const reset4 = useResetRecoilState(processing);
  const reset5 = useResetRecoilState(procIdx);
  const reset6 = useResetRecoilState(textProcessing);
  const reset7 = useResetRecoilState(progressBarLevel);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    postOrdered(myOrder).then((res) => {
      setIsPosted(res);
    });

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    if (isPosted) {
      if (timer > 5) {
        // Reset order
        resetMenu({
          order: new Date().getMinutes() * 100 + new Date().getSeconds(),
          price: 0,
          takeout: false,
          menu: [],
        });
        reset1();
        reset2();
        reset3();
        reset4();
        reset5();
        reset6();
        reset7();
        history.push("/");
      }
    } else {
      setTimer(0);
    }
  }, [timer]);

  return (
    <Wrapper>
      <Title isPosted={isPosted}>
        {isPosted === "POSTING"
          ? "Processing..."
          : isPosted
          ? "주문 완료되었습니다!"
          : "주문 실패"}
      </Title>
      {isPosted === true ? (
        <OrderInfoWrapper>
          <span>주문번호</span>
          <span>{myOrder.order}</span>
        </OrderInfoWrapper>
      ) : null}
      {isPosted !== "POSTING" ? (
        <TimeLeft>{5 - timer}초 뒤 메인화면으로 이동합니다.</TimeLeft>
      ) : null}
    </Wrapper>
  );
}

export default OrderProcess;
