import styled from "styled-components";

const Wrapper = styled.div<{ imgUrl: string }>`
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  border: 2px solid white;
`;
const Index = styled.span`
  margin-top: 30px;
  font-size: 150px;
  font-weight: 700;
  font-style: italic;
  color: rgba(0, 0, 0, 0.5);
`;
const Name = styled.h1`
  width: 100%;
  height: 50px;
  background-color: #e64848;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
`;

interface IMenuCard {
  name: string;
  index: number;
  id: number;
}
function MenuCard({ name, index, id }: IMenuCard) {
  const imgUrl = process.env.PUBLIC_URL + `/images/menus/${id}.png`;
  return (
    <Wrapper imgUrl={imgUrl}>
      <Index>{index}</Index>
      <Name>{name}</Name>
    </Wrapper>
  );
}

export default MenuCard;
