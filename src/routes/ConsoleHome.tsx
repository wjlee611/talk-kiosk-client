import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { GetOrdered, IOrdered } from "../api";
import { screenUpdate } from "../atoms";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  background-color: #212121;
`;
const ListWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  overflow: auto;
  display: flex;
  justify-content: space-evenly;
`;
const CardList = styled.div`
  width: 400px;
  & > div:last-child {
    height: 100px;
  }
`;
const PendingList = styled(CardList)``;
const CompleteList = styled(CardList)``;

function ConsoleHome() {
  const forceUpdate = useRecoilValue(screenUpdate);
  const {
    data: pendingData,
    isLoading: pendingIsLoading,
    refetch: pendingRefetch,
  } = useQuery<IOrdered[]>(["order", "pending"], () => GetOrdered("pending"));
  const {
    data: completeData,
    isLoading: completeIsLoading,
    refetch: completeRefetch,
  } = useQuery<IOrdered[]>(["order", "complete"], () => GetOrdered("complete"));
  useEffect(() => {
    setTimeout(() => {
      pendingRefetch();
      completeRefetch();
    }, 1000);
  }, [forceUpdate, pendingRefetch, completeRefetch]);
  return (
    <Wrapper>
      <Header />
      <ListWrapper>
        <PendingList>
          {pendingIsLoading
            ? "Loading..."
            : pendingData?.map((item) => (
                <OrderCard
                  key={item.orderedIdx}
                  data={item}
                  status={"PENDING"}
                />
              ))}
          <div />
        </PendingList>
        <CompleteList>
          {completeIsLoading
            ? "Loading..."
            : completeData?.map((item) => (
                <OrderCard
                  key={item.orderedIdx}
                  data={item}
                  status={"COMPLETE"}
                />
              ))}
          <div />
        </CompleteList>
      </ListWrapper>
    </Wrapper>
  );
}

export default ConsoleHome;
