import { useLocation } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;
const Image = styled.img`
  width: auto;
  height: 400px;
  position: absolute;
  left: 0;
`;
const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 500px;
  z-index: 1;
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: white;
  border-bottom: 1px solid white;
  padding-left: 10px;
`;
const Calorie = styled.span`
  font-size: 20px;
  color: white;
  margin-left: 10px;
  margin-bottom: 20px;
`;
const Detail = styled.p`
  font-size: 20px;
  color: white;
  height: 100px;
  margin-left: 10px;
`;
const Cost = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: white;
  margin-left: 100px;
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
          <Image src={imgUrl} />
          <InfoWrapper>
            <Title>{idToName(menuData, Number(id))}</Title>
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
