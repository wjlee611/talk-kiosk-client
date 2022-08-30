import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { postSet } from "../api";
import { orderedMenu, processing, procIdx, resultCode, stText } from "../atoms";
import MenuCard from "../components/MenuCard";
import menuData from "../menu-table.json";
import { idToName, makeMenu } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 50px;
`;

function MenuSet() {
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const [processIdx, setProcessIdx] = useRecoilState(procIdx);
  const [isProcessing, setIsProcessing] = useRecoilState(processing);
  const [option, setOption] = useState<number[]>(
    processIdx < ordered.menu.length ? ordered.menu[processIdx].set : []
  );
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const history = useHistory();
  const [isFirst, setIsFirst] = useState(true);

  //api 호출
  useEffect(() => {
    if (!isFirst) {
      if (code === 2005 || code === 1002 || code === 2007) {
        //code 2005: 세트변경
        postSet(text, [...option]).then((res) => {
          setCode(res.code);
          setOption(res.set);
        });
      }
    }
    setIsFirst(false);
  }, [text]);

  //code 확인
  useEffect(() => {
    if (code === 2006) {
      //code 2006: 세트완료
      //TODO: 다음으로 넘기기
      const newMenu = makeMenu(ordered.menu, processIdx, "SET", option);
      setOrdered((prev) => ({
        order: prev.order,
        price: prev.price,
        takeout: prev.takeout,
        menu: newMenu,
      }));
      setProcessIdx((prev) => prev + 1);
      setIsProcessing(false);
      setText("");
      setCode(1001);
      history.push("/processing");
    }
    if (code === 2007) {
      //code 2007: 세트충돌
      //TODO: 세트 충돌 알려주기 ex. 콜라, 사이다
    }
  }, [code]);

  return (
    <Wrapper>
      <MenuCard
        name={
          option[0] === 0
            ? "사이드를 말해주세요"
            : idToName(menuData, Number(option[0]))
        }
        index={0}
        id={option[0]}
      />
      <MenuCard
        name={
          option[1] === 0
            ? "음료를 말해주세요"
            : idToName(menuData, Number(option[1]))
        }
        index={0}
        id={option[1]}
      />
    </Wrapper>
  );
}

export default MenuSet;
