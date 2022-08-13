import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { menuSet } from "../atoms";
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
  // for test
  useEffect(() => {
    setOption([201, 0]);
  }, []);
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
