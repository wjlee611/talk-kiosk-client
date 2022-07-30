import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getOrdered, postOrdered } from "../api";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 10px;
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;
const Button = styled.button`
  width: 100px;
`;

interface IForm {
  ordered: string;
}
function KioskHome() {
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const jsonData = JSON.parse(data.ordered);
    postOrdered(jsonData);
  };
  const getOrderList = async () => {
    const orderList = await getOrdered();
    console.log(orderList);
  };
  return (
    <Wrapper>
      <Title>주문하기</Title>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("ordered", { required: true })}
          placeholder="put in json"
        />
        <Button>Submit</Button>
      </form>
      <Title>주문내역</Title>
      <Button onClick={getOrderList}>Get from server</Button>
    </Wrapper>
  );
}

export default KioskHome;
