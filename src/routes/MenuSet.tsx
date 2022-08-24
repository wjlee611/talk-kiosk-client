import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { postSet } from "../api";
import { menuSet, resultCode, stText } from "../atoms";
import MenuCard from "../components/MenuCard";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 50px;
`;

function MenuSet() {
  const [option, setOption] = useRecoilState(menuSet);
  const text = useRecoilValue(stText);
  const [code, setCode] = useRecoilState(resultCode);

  //api 호출
  useEffect(() => {
    if (code === 2005) {
      //code 2005: 세트변경
      postSet(text, []).then((res) => {
        setCode(res.code);
        setOption(res.set);
      });
    }
  }, [text]);

  //code 확인
  useEffect(() => {
    if (code === 2006) {
      //code 2006: 세트완료
      //TODO: 다음으로 넘기기
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
