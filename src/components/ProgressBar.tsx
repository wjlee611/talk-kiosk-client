import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
`;

function ProgressBar() {
  return (
    <Wrapper>
      <span>ProgressBar</span>
    </Wrapper>
  );
}

export default ProgressBar;
