import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
// import microphone from "../images/microphone.svg";
// import caretDown from "../images/caret-down.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { resultCode, stText, textProcessing } from "../atoms";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div<{ on: "true" | "false" }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  position: relative;
  background: ${(props) =>
    props.on === "true"
      ? "linear-gradient(#00000000, #FFD32D88)"
      : "linear-gradient(#00000000, #FF990044)"};
`;
const HintBox = styled.div`
  text-align: center;
  padding: 20px;
  padding-bottom: 15px;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  font-weight: 700;
`;
const KeywordWrapper = styled.div<{ listening: "true" | "false" }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  pointer-events: none;
  opacity: ${(props) => (props.listening === "true" ? 0 : 1)};
  transition: opacity 0.3s linear;
`;
const KeywordBox = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 400;
  position: absolute;
  animation: bubble 2s ease-in-out infinite, opacity 0.5s ease-in-out forwards;
  opacity: 0;
  @keyframes bubble {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const KB1 = styled(KeywordBox)`
  top: 20%;
  margin-left: 20%;
  animation-delay: 0s;
`;
const KB2 = styled(KeywordBox)`
  top: 30%;
  margin-right: 10%;
  animation-delay: 0.25s;
`;
const KB3 = styled(KeywordBox)`
  top: 70%;
  margin-left: 10%;
  animation-delay: 0.5s;
`;
const KB4 = styled(KeywordBox)`
  top: 80%;
  margin-right: 20%;
  animation-delay: 0.75s;
`;
const WarningWrapper = styled(motion.div)`
  width: 110vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #f65858, #e64848);
  position: fixed;
  top: 0;
  left: -5vw;
  z-index: 10;
  color: white;
  pointer-events: none;
  & > span {
    display: flex;
    align-items: center;
    padding: 20px 0;
    color: white;
    font-size: 20px;
    font-weight: 700;
  }
`;

function Stt() {
  const setSTText = useSetRecoilState(stText);
  const isTextProcessing = useRecoilValue(textProcessing);
  const code = useRecoilValue(resultCode);
  const [warningView, setWarningView] = useState(false);

  //code 확인
  useEffect(() => {
    if (code === 1002 || code === 2007 || code === 2009) {
      setWarningView(true);
      const warnTo = setTimeout(() => {
        setWarningView(false);
      }, 3000);
      if (isTextProcessing) {
        setWarningView(false);
        clearTimeout(warnTo);
      }
    }
  }, [code, isTextProcessing]);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== "") {
      SpeechRecognition.stopListening();
      setSTText(finalTranscript);
      // console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
    return null;
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "ko",
    });
  };

  const onClick = () => {
    resetTranscript();
    listenContinuously();
  };

  //for not mic usage
  const onSubmit = (e: any) => {
    e.preventDefault();
    setSTText(e.target[0].value);
  };

  return (
    <Wrapper
      // onClick={onClick}
      on={listening ? "true" : "false"}
    >
      <HintBox>
        {isTextProcessing
          ? "처리 중 입니다..."
          : listening
          ? transcript
            ? transcript
            : "( 듣고있어요! )"
          : "여기를 터치(클릭)하신 후 말씀해주세요!"}
      </HintBox>
      <form onSubmit={onSubmit}>
        <input type="text" style={{ width: "300px" }}></input>
      </form>
      <KeywordWrapper listening={listening ? "true" : "false"}>
        <KB1>keyword 1</KB1>
        <KB2>keyword 2</KB2>
        <KB3>keyword 3</KB3>
        <KB4>keyword 4</KB4>
      </KeywordWrapper>
      <AnimatePresence>
        {warningView ? (
          <WarningWrapper
            key="warning"
            initial={{ opacity: 0, transform: "scaleY(0) translateX(-5vw)" }}
            animate={{
              opacity: 1,
              transform: "scaleY(1) translateX(0vw)",
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              transform: "scaleY(0) translateX(5vw)",
              transition: {
                duration: 0.2,
              },
            }}
          >
            <span>
              {code === 1002
                ? "무슨 말씀이신지 이해하지 못 했어요. 다시 시도해주세요!"
                : code === 2007
                ? "사이드 메뉴, 음료수 각각 1개씩 선택하실 수 있어요. 다시 시도해주세요!"
                : code === 2009
                ? "해당 메뉴는 이 리스트에 없어요. 화면에 보이는 메뉴 중에서 하나를 골라주세요!"
                : ""}
            </span>
          </WarningWrapper>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Stt;
