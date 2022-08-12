import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IMenuCard {
  name: string;
  index: number;
}
function MenuCard({ name, index }: IMenuCard) {
  return (
    <Wrapper>
      <span>{index}</span>
      <span>{name}</span>
    </Wrapper>
  );
}

export default MenuCard;
