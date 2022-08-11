import styled from "styled-components";
import CartList from "../components/CartList";
import Stt from "../components/Stt";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fec260;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function KioskHome() {
  return (
    <Wrapper>
      <Stt />
      <CartList />
    </Wrapper>
  );
}

export default KioskHome;
