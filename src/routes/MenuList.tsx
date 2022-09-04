import styled from "styled-components";
import Sticky from "react-sticky-el";
import MenuCard from "../components/MenuCard";
import menuData from "../menu-table.json";
import { idToName, makeMenu } from "../utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  orderedMenu,
  procIdx,
  progressBarLevel,
  resultCode,
  stText,
  textProcessing,
} from "../atoms";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { postConflictSolve } from "../api";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  clip-path: inset(0 0 0 0);
  & > div,
  & > div > div:first-child,
  & > div > div:first-child > div {
    z-index: 10;
  }
  & > div {
    background-color: rgba(50, 0, 0, 0.1);
    margin: 0 5%;
    margin-bottom: 50px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  & > div > div > div {
    will-change: position, top, bottom, scroll-position;
    top: 0;
  }
`;
const Category = styled.div`
  width: calc(100% + 6px);
  height: 100px;
  background: linear-gradient(90deg, #f65858, #e64848);
  border: 3px solid white;
  border-top: none;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-left: -3px;
  color: white;
  font-size: 30px;
  font-weight: 700;
`;
const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-auto-rows: minmax(300px, 300px);
  justify-items: center;
  gap: 50px;
  padding: 50px;
  justify-content: center;
`;

function MenuList() {
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const processIdx = useRecoilValue(procIdx);
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const setTextProcessing = useSetRecoilState(textProcessing);
  const setProgress = useSetRecoilState(progressBarLevel);
  const history = useHistory();
  const [catValue, setCatValue] = useState([false, false, false]);

  //progressBar 계산
  useEffect(() => {
    if (ordered.menu[processIdx].set.length) {
      setProgress({
        value: 0.25,
        passConflict: true,
        stage: "conflict",
        progress: "1/4",
      });
    } else {
      setProgress({
        value: 0.33,
        passConflict: true,
        stage: "conflict",
        progress: "1/3",
      });
    }
    //category 표시여부 계산
    ordered.menu[processIdx].id.map((i) => {
      if (100 < i && i < 200) setCatValue((prev) => [true, prev[1], prev[2]]);
      if (200 < i && i < 300) setCatValue((prev) => [prev[0], true, prev[2]]);
      if (300 < i && i < 400) setCatValue((prev) => [prev[0], prev[1], true]);
    });
  }, []);

  //api 호출
  useEffect(() => {
    if (text) {
      setTextProcessing(true);
      if (code === 1003 || code === 1002 || code === 2009) {
        //code 1003: 충돌메뉴 선택 (local)
        postConflictSolve(text, ordered.menu[processIdx].id).then((res) => {
          setTextProcessing(false);
          if (res.code === 2002) {
            //code 2002: 충돌해결
            const newMenu = makeMenu(ordered.menu, processIdx, "ID", [
              res.resolve,
            ]);
            setOrdered((prev) => ({
              order: prev.order,
              price: prev.price,
              takeout: prev.takeout,
              menu: newMenu,
            }));
            setCode(2003);
            setText("");
            history.push("/processing/option");
          } else {
            setCode(res.code);
          }
        });
      } else {
        setTextProcessing(false);
      }
    }
  }, [text]);

  return (
    <Wrapper className="scroll-area">
      {catValue.map((value, index) => {
        if (value)
          return (
            <div key={index} className="block">
              <Sticky
                boundaryElement=".block"
                scrollElement=".scroll-area"
                positionRecheckInterval={1}
                topOffset={-1}
              >
                <Category>
                  {index === 0
                    ? "메인 메뉴"
                    : index === 1
                    ? "사이드 메뉴"
                    : "음료수"}
                </Category>
              </Sticky>
              <GridWrapper>
                {ordered.menu[processIdx]?.id.map((id, idx) => {
                  if (
                    (index + 1) * 100 < Number(id) &&
                    Number(id) < (index + 2) * 100
                  ) {
                    return (
                      <MenuCard
                        key={idx}
                        index={idx + 1}
                        id={Number(id)}
                        name={idToName(menuData, Number(id))}
                      />
                    );
                  }
                  return null;
                })}
              </GridWrapper>
            </div>
          );
      })}
    </Wrapper>
  );
}

export default MenuList;
