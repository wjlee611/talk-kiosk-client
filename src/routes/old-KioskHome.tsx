import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { GetOrdered, IOrdered, postOrdered } from "../api";
import Stt from "../components/Stt";

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
  const [list, setList] = useState<IOrdered[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const jsonData = JSON.parse(data.ordered);
    postOrdered(jsonData);
  };
  const getOrderList = async () => {
    const orderList = await GetOrdered();
    setList(orderList);
    console.log(orderList);
    setLoading(false);
  };
  return (
    <Wrapper>
      <Title>주문하기</Title>
      <form onSubmit={handleSubmit(onValid)} style={{ marginBottom: "20px" }}>
        <input
          {...register("ordered", { required: true })}
          placeholder="put in json"
        />
        <Button>Submit</Button>
      </form>
      <Stt />
    </Wrapper>
  );
}

export default KioskHome;
