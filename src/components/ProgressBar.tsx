import styled from "styled-components";
import { useSpring, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { orderedMenu, procIdx, progressBarLevel } from "../atoms";

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;
const ScrollProgress = styled(motion.div)`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #6fedd6, #1cd6ce);
  transform-origin: 0%;
`;

function ProgressBar() {
  const progress = useRecoilValue(progressBarLevel);
  const motionProgress = useMotionValue(0);
  const scaleX = useSpring(motionProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.005,
  });

  useEffect(() => {
    motionProgress.set(progress.value);
  }, [progress]);

  return (
    <Wrapper>
      <ScrollProgress style={{ scaleX }} />
    </Wrapper>
  );
}

export default ProgressBar;
