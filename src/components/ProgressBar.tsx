import styled from "styled-components";
import { useSpring, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { progressBarLevel } from "../atoms";

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Progress = styled(motion.div)`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #6fedd6, #1cd6ce);
  transform-origin: 0%;
  z-index: 1;
`;
const ProgressTextWrapper = styled.div<{ isMenu: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  z-index: 2;
  & > div {
    width: 100%;
    height: 50px;
  }
  & > span {
    height: 50px;
    display: flex;
    align-items: center;
    color: #0f3460;
    font-size: 20px;
    font-weight: 700;
    margin-right: 10px;
    transform: translateX(60px);
  }
  & > span:nth-child(2) {
    width: ${(props) => (props.isMenu ? "400px" : "50px")};
    color: #1cd6ce;
    padding-left: 10px;
  }
`;

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function ProgressBar() {
  const progress = useRecoilValue(progressBarLevel);
  const motionProgress = useMotionValue(0);
  const motionProgress_Text = useMotionValue(window.innerWidth);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const scaleX = useSpring(motionProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.005,
  });
  const scaleX_Text = useSpring(motionProgress_Text, {
    stiffness: 300,
    damping: 30,
    restDelta: 0,
  });

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    motionProgress.set(progress.value);
    motionProgress_Text.set((1 - progress.value) * windowSize.innerWidth);
    // eslint-disable-next-line
  }, [progress, windowSize.innerWidth]);

  return (
    <Wrapper>
      <Progress style={{ scaleX }} />
      <ProgressTextWrapper isMenu={progress.stage === "menu"}>
        <span>
          {progress.stage === "conflict"
            ? "메뉴 선택"
            : progress.stage === "option"
            ? "옵션 선택"
            : progress.stage === "set"
            ? "세트 메뉴 선택"
            : progress.stage === "confirm"
            ? "주문 확인"
            : ""}
        </span>
        <span>{progress.progress}</span>
        <motion.div style={{ width: scaleX_Text }} />
      </ProgressTextWrapper>
    </Wrapper>
  );
}

export default ProgressBar;
