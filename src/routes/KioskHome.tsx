import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { GetOrdered, IOrdered, postOrdered } from "../api";

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
      <Title>주문내역</Title>
      {loading ? (
        <Button onClick={getOrderList}>Get from server</Button>
      ) : (
        <ul>
          {list.map((order, idx) => (
            <li key={idx} style={{ marginBottom: "10px" }}>
              <div>
                <span>{order.orderedIdx}, </span>
                <span>{order.order}, </span>
                <span>{order.takeout ? "takeout" : "eat in store"}, </span>
                <span>{order.price}</span>
                <div>
                  {order.menu.map((item, idx2) => (
                    <div key={idx2}>
                      <span>{item.id} - </span>
                      <span>
                        option:{" "}
                        {item?.option?.map((i, idx3) => (
                          <span key={idx3}>{i}, </span>
                        ))}{" "}
                        /{" "}
                      </span>
                      <span>
                        set:{" "}
                        {item?.set?.map((i, idx3) => (
                          <span key={idx3}>{i}, </span>
                        ))}{" "}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
}

export default KioskHome;
