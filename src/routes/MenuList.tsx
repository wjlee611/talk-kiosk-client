import styled from "styled-components";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  & > span {
    margin: 20px;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 30px;
  background-color: #fec260;
  border-bottom: 1px solid white;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

function MenuList() {
  return (
    <Wrapper>
      <Header>Main Menus</Header>
      {Object.keys(menuData).map((id, idx) => {
        if (100 < Number(id) && Number(id) < 200) {
          return <span key={idx}>{idToName(menuData, Number(id))}</span>;
        }
        return null;
      })}
      <Header>Side Menus</Header>
      {Object.keys(menuData).map((id, idx) => {
        if (200 < Number(id) && Number(id) < 300) {
          return <span key={idx}>{idToName(menuData, Number(id))}</span>;
        }
        return null;
      })}
      <Header>Drink Menus</Header>
      {Object.keys(menuData).map((id, idx) => {
        if (300 < Number(id) && Number(id) < 400) {
          return <span key={idx}>{idToName(menuData, Number(id))}</span>;
        }
        return null;
      })}
    </Wrapper>
  );
}

export default MenuList;
