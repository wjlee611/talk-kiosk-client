import styled from "styled-components";
import { Sticky, StickyContainer } from "react-sticky";
import MenuCard from "../components/MenuCard";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const Category = styled.div`
  width: 100%;
  height: 100px;
  min-height: 100px;
  background-color: #fec260;
  border-bottom: 1px solid white;
  display: flex;
  align-items: center;
  padding-left: 30px;
  overflow: auto;
`;
const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-auto-rows: minmax(300px, auto);
  gap: 50px;
  padding: 50px;
  justify-content: center;
`;

function MenuList() {
  return (
    <Wrapper>
      <span>aaaaaaaaa</span>
      <span>aaaaaaaaa</span>
      <span>aaaaaaaaa</span>
      <span>aaaaaaaaa</span>
      {[1, 2, 3].map((i) => (
        <StickyContainer key={i}>
          <Sticky>
            {({ style }) => (
              <Category style={{ ...style }}>
                {i === 1
                  ? "Main Menus"
                  : i === 2
                  ? "Side Menus"
                  : "Drink Menus"}
              </Category>
            )}
          </Sticky>
          <GridWrapper>
            {Object.keys(menuData).map((id, idx) => {
              if (i * 100 < Number(id) && Number(id) < (i + 1) * 100) {
                return (
                  <MenuCard
                    key={idx}
                    index={idx + 1}
                    name={idToName(menuData, Number(id))}
                  />
                );
              }
              return null;
            })}
          </GridWrapper>
        </StickyContainer>
      ))}
    </Wrapper>
  );
}

export default MenuList;
