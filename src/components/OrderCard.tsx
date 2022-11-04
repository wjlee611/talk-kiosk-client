import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IOrdered, setOrderStatus } from "../api";
import { screenUpdate } from "../atoms";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 400px;
  min-height: 200px;
  background-color: #ffedda;
  border: 2px solid white;
  border-radius: 10px;
  margin: 20px 0;
`;
const Header = styled.div<{ status: IOrderCard["status"] }>`
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.status === "PENDING" ? "#EB4747" : "#57cc99"};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;
const TakeoutHeader = styled.div<{ takeout: boolean }>`
  width: 100%;
  height: 25px;
  background-color: ${(props) => (props.takeout ? "#ABC9FF" : "#FFF80A")};
  display: flex;
  align-items: center;
  color: black;
  font-size: 18px;
  font-weight: 700;
  padding-left: 10px;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: white;
  padding-top: 5px;
`;
const Button = styled.button`
  width: 150px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  border: none;
  border-top-right-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  transition: filter 0.2s ease-out;
  will-change: filter;
  &:hover {
    filter: brightness(70%);
  }
`;
const OrderList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
const MenuWrapper = styled.div<{ idx: number }>`
  background-color: ${(props) =>
    props.idx % 2 === 1 ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)"};
  padding: 5px 10px;
  & > span {
    color: black;
    display: flex;
    padding-top: 3px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
  }
`;
const MenuChildWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  & > span {
    margin-left: 20px;
    padding: 3px 0;
    font-size: 20px;
    font-weight: 700;
  }
  & > span:first-child {
    width: 350px;
    background-color: white;
    border-radius: 3px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 3px;
    margin-left: 0;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 400;
  }
`;

interface IOrderCard {
  data: IOrdered;
  status: "PENDING" | "COMPLETE" | "processing";
}
function OrderCard({ data, status }: IOrderCard) {
  const forceUpdate = useSetRecoilState(screenUpdate);
  const [proc, setProc] = useState(false);
  const onClick = () => {
    setOrderStatus(
      data.orderedIdx,
      status === "PENDING" ? "COMPLETE" : "DELETED"
    );
    setProc(true);
    forceUpdate((prev) => !prev);
  };
  return (
    <Wrapper>
      <Header status={status}>
        <Title>No. {data.order}</Title>
        <Button onClick={onClick} disabled={proc}>
          {proc
            ? "processing..."
            : status === "PENDING"
            ? "〉〉 조리 완료"
            : "〉〉 픽업 완료"}
        </Button>
      </Header>
      <TakeoutHeader takeout={data.takeout}>
        {data.takeout ? "Take Out" : "Eat in Store"}
      </TakeoutHeader>
      <OrderList>
        {data.menu.map((menu, idx) => (
          <MenuWrapper key={idx} idx={idx}>
            <span>{idToName(menuData, menu.id[0])}</span>
            <MenuChildWrapper>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#c5fcda",
                }}
              >
                <span>Quantity</span>
                <span style={{ fontWeight: 700 }}>{menu.qty}</span>
              </span>
            </MenuChildWrapper>
            {menu.id[0] < 200 ? (
              <>
                {menu.option?.length ? (
                  <MenuChildWrapper>
                    <span>Option</span>
                    {menu.option.map((option, idx2) => (
                      <span key={idx2}>{idToName(menuData, option)}</span>
                    ))}
                  </MenuChildWrapper>
                ) : null}
                {menu.set?.length ? (
                  <MenuChildWrapper>
                    <span>Set Menu</span>
                    {menu.set.map((set, idx2) => (
                      <span key={idx2}>{idToName(menuData, set)}</span>
                    ))}
                  </MenuChildWrapper>
                ) : null}
              </>
            ) : null}
          </MenuWrapper>
        ))}
      </OrderList>
    </Wrapper>
  );
}

export default OrderCard;
