import { useLocation } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;
const Image = styled.img`
  width: auto;
  height: 400px;
  position: absolute;
  left: 50px;
  top: 150px;
  z-index: 2;
`;
const InfoWrapper = styled.div`
  width: 90%;
  height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  background-color: #a96851;
  border: 50px solid #915b4a;
  border-bottom: none;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding: 30px;
  z-index: 1;
`;
const Title = styled.h1`
  width: 90%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e64848;
  font-size: 40px;
  font-weight: 700;
  color: white;
  border: 3px solid white;
  border-top: none;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  position: absolute;
  top: 0;
  left: 5%;
  z-index: 3;
`;
const Calorie = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: white;
  position: absolute;
  top: 250px;
  z-index: 3;
`;
const Detail = styled.p`
  font-size: 20px;
  color: white;
  height: 100px;
`;
const Cost = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: white;
`;

function MenuSpec() {
  const location = useLocation();
  const queryData = queryString.parse(location.search);
  const id = queryData.menu;
  const imgUrl = process.env.PUBLIC_URL + `/images/menus/${id}.png`;
  return (
    <Wrapper>
      {id ? (
        <>
          <Title>{idToName(menuData, Number(id))}</Title>
          <Image src={imgUrl} />
          <InfoWrapper>
            <Calorie>200 kcal</Calorie>
            <Detail>이거슨 천상의 맛. 이 음식에 대한 설명인 것.</Detail>
            <Cost>5900원</Cost>
          </InfoWrapper>
        </>
      ) : null}
    </Wrapper>
  );
}

export default MenuSpec;
