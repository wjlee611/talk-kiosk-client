import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 150px;
  background-color: white;
  position: absolute;
  bottom: 0;
`;

function CartList() {
  return (
    <Wrapper>
      <span>Cart</span>
    </Wrapper>
  );
}

export default CartList;
