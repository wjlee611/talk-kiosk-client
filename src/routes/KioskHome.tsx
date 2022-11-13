import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { postTakeout } from "../api";
import { orderedMenu, resultCode, stText, textProcessing } from "../atoms";
import Stt from "../components/Stt";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fec260;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const AskText = styled.span`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000090;
  position: absolute;
  top: 0;
  color: white;
  font-size: 20px;
  font-weight: 700;

  animation: textani 1s cubic-bezier(0.55, 0.1, 0.15, 1) forwards;
  @keyframes textani {
    50% {
      height: 100vh;
      background-color: #00000090;
    }
    100% {
      height: 50px;
      background-color: #00000040;
    }
  }
`;

function KioskHome() {
  const setOrdered = useSetRecoilState(orderedMenu);
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const setTextProcessing = useSetRecoilState(textProcessing);
  const history = useHistory();

  //api 호출
  useEffect(() => {
    if (text && code !== 2001) {
      setTextProcessing(true);
      postTakeout(text).then((res) => {
        setTextProcessing(false);
        setCode(res.code);
        setOrdered((prev) => ({
          order: prev.order,
          price: prev.price,
          takeout: res.isTakeout,
          menu: prev.menu,
        }));
      });
    }
  }, [text]);

  //code 확인
  useEffect(() => {
    if (code === 1001) {
      setText("");
      history.push("/processing");
    }
  }, [code]);

  return (
    <Wrapper>
      <Stt />
      <AskText>매장에서 드시고 가시나요?</AskText>
    </Wrapper>
  );
}

export default KioskHome;
