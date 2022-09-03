import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { postOption } from "../api";
import {
  orderedMenu,
  processing,
  procIdx,
  progressBarLevel,
  resultCode,
  stText,
  textProcessing,
} from "../atoms";
import menuData from "../menu-table.json";
import { idToName, makeMenu, makeOption } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Header = styled.div`
  width: 90%;
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
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  top: 0;
  z-index: 1;
`;
const Card = styled.div<{ isSelected: boolean }>`
  width: 500px;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-top: 5px;
  margin-bottom: 30px;
  border-radius: 20px;
  border: 5px solid ${(props) => (props.isSelected ? "#e64848" : "white")};
  font-size: 30px;
  font-weight: 700;
  box-sizing: content-box;
  overflow: hidden;
  & > span:last-child {
    font-size: 20px;
    margin-right: 40px;
  }
`;
const SelectBox = styled.div<{ isSelected: boolean }>`
  width: 150px;
  height: 80px;
  background-color: #e64848;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  visibility: ${(props) => (props.isSelected ? "visible" : "hidden")};
  & > span:first-child {
    margin-bottom: 5px;
  }
`;

function MenuOption() {
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const [processIdx, setProcessIdx] = useRecoilState(procIdx);
  const setIsProcessing = useSetRecoilState(processing);
  const [option, setOption] = useState([false, false, false, false]);
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const setTextProcessing = useSetRecoilState(textProcessing);
  const [progress, setProgress] = useRecoilState(progressBarLevel);
  const history = useHistory();

  //progressBar 계산
  useEffect(() => {
    if (ordered.menu[processIdx].set.length) {
      if (progress.passConflict) {
        setProgress({ value: 0.5, passConflict: true, stage: "option" });
      } else {
        setProgress({ value: 0.33, passConflict: false, stage: "option" });
      }
    } else {
      if (progress.passConflict) {
        setProgress({ value: 0.67, passConflict: true, stage: "option" });
      } else {
        setProgress({ value: 0.5, passConflict: false, stage: "option" });
      }
    }
  }, []);

  //api 호출
  useEffect(() => {
    if (text) {
      setTextProcessing(true);
      if (code === 2003 || code === 1002) {
        //code 2003: 옵션변경
        postOption(text).then((res) => {
          setTextProcessing(false);
          setCode(res.code);
          let tmpOption = [...option];
          res.option.map((i) => {
            tmpOption[i - 2000 - 1] = !tmpOption[i - 2000 - 1];
          });
          setOption(tmpOption);
        });
      } else {
        setTextProcessing(false);
      }
    }
  }, [text]);

  //code 확인
  useEffect(() => {
    if (code === 2004) {
      //code 2004: 옵션완료
      //TODO: 다음으로 넘기기
      const newOption = makeOption(option);
      const newMenu = makeMenu(ordered.menu, processIdx, "OPTION", newOption);
      setOrdered((prev) => ({
        order: prev.order,
        price: prev.price,
        takeout: prev.takeout,
        menu: newMenu,
      }));
      setText("");
      setOption([false, false, false, false]);
      if (ordered.menu[processIdx].set.length > 0) {
        setCode(2005);
        history.push("/processing/set");
      } else {
        setProcessIdx((prev) => prev + 1);
        setIsProcessing(false);
        setCode(1001);
        history.push("/processing");
      }
    }
  }, [code]);

  return (
    <Wrapper>
      <Header>
        "
        {idToName(
          menuData,
          ordered.menu[processIdx] ? ordered.menu[processIdx].id[0] : 0
        )}
        " 에 대한 옵션을 선택해주세요!
      </Header>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} isSelected={option[i - 1]}>
          <span>{idToName(menuData, i + 1000)}</span>
          {option[i - 1] ? (
            <SelectBox isSelected={option[i - 1]}>
              <span>선택 됨</span>
              <span>+ {i === 4 ? "500" : "0"}원</span>
            </SelectBox>
          ) : (
            <span>+ {i === 4 ? "500" : "0"}원</span>
          )}
        </Card>
      ))}
    </Wrapper>
  );
}

export default MenuOption;
