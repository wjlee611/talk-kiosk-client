import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100px;
  background-color: #fec260;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 99;
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-left: 30px;
`;

function Header() {
  return (
    <Wrapper>
      <Title>Console</Title>
    </Wrapper>
  );
}

export default Header;
