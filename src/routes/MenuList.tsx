import styled from "styled-components";
import Sticky from "react-sticky-el";
import MenuCard from "../components/MenuCard";
import menuData from "../menu-table.json";
import { idToName, makeMenu } from "../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderedMenu, procIdx, resultCode, stText } from "../atoms";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
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
  font-size: 36px;
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
  const history = useHistory();

  //api 호출
  useEffect(() => {
    if (text) {
      if (code === 1003 || code === 1002) {
        //code 1003: 충돌메뉴 선택 (local)
        postConflictSolve(text, ordered.menu[processIdx].id).then((res) => {
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
          }
        });
      }
    }
  }, [text]);

  return (
    <Wrapper className="scroll-area">
      {[1, 2, 3].map((i) => (
        <div key={i} className="block">
          <Sticky
            boundaryElement=".block"
            scrollElement=".scroll-area"
            positionRecheckInterval={1}
            topOffset={-1}
          >
            <Category>
              {i === 1 ? "메인 메뉴" : i === 2 ? "사이드 메뉴" : "음료수"}
            </Category>
          </Sticky>
          <GridWrapper>
            {ordered.menu[processIdx].id.map((id, idx) => {
              if (i * 100 < Number(id) && Number(id) < (i + 1) * 100) {
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
      ))}
    </Wrapper>
  );
}

export default MenuList;
