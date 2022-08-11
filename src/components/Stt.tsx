import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import microphone from "../images/microphone.svg";
import caretDown from "../images/caret-down.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
const MicBtn = styled.button`
  width: 300px;
  height: 300px;
  background-color: white;
  border: none;
  border-radius: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Mic = styled.img<{ on: boolean }>`
  width: 50%;
  height: 50%;
  filter: ${(props) =>
    props.on
      ? "invert(82%) sepia(80%) saturate(5668%) hue-rotate(310deg) brightness(100%) contrast(103%)"
      : "opacity(80%)"};
`;
const HintBox = styled.div`
  padding: 20px;
  padding-bottom: 15px;
  border-radius: 10px;
  background-color: white;
`;
const HintIcon = styled.img`
  width: 20px;
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(235deg)
    brightness(104%) contrast(102%);
  margin-bottom: 20px;
`;

function Stt() {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();
  // {
  // commands: [
  //   {
  //     command: "reset",
  //     callback: () => resetTranscript(),
  //   },
  //   {
  //     command: "shut up",
  //     callback: () => messageSet("I wasn't talking."),
  //   },
  //   {
  //     command: "Hello",
  //     callback: () => messageSet("Hi there!"),
  //   },
  // ],
  // }

  useEffect(() => {
    if (finalTranscript !== "") {
      SpeechRecognition.stopListening();
      console.log("Got final result:", finalTranscript);
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
  return (
    <Wrapper>
      <HintBox>
        {listening
          ? transcript
            ? transcript
            : "( 듣고있어요! )"
          : '"불고기 버거 하나만 주세요" 와 같이 말해주세요!'}
      </HintBox>
      <HintIcon src={caretDown} />
      <MicBtn onClick={onClick}>
        <Mic src={microphone} on={listening} />
      </MicBtn>
    </Wrapper>
  );
}

export default Stt;
