import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IOrdered, postOrderList } from "../api";
import {
  orderedMenu,
  processing,
  progressBarLevel,
  resultCode,
  stText,
  textProcessing,
} from "../atoms";
import menuData from "../menu-table.json";
import { idToName, calcCost } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  padding-bottom: 50px;
  overflow-y: scroll;
  position: relative;
`;
const ScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Header = styled.div`
  width: 90%;
  height: 100px;
  background: linear-gradient(90deg, #f65858, #e64848);
  border: 3px solid white;
  border-top: none;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-left: -3px;
  color: white;
  font-size: 36px;
  font-weight: 700;
  position: absolute;
  top: 0;
  z-index: 1;
`;
const PickupInfo = styled.div`
  width: 70%;
  background: linear-gradient(90deg, #f65858, #e64848);
  color: white;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 20px;
  padding-bottom: 16px;
  margin-bottom: 30px;
  border-radius: 10px;
  & > div {
    display: flex;
    align-items: center;
    &:first-child {
      justify-content: flex-start;
    }
    &:nth-child(2) {
      justify-content: center;
    }
    &:last-child {
      justify-content: flex-end;
      & > span:nth-child(2) {
        margin-right: 3px;
        margin-bottom: 3px;
      }
    }
    & > span:nth-child(2) {
      font-size: 24px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
`;
const MenuWrapper = styled.div`
  width: 70%;
  display: flex;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
`;
const IndexWrapper = styled.div`
  background: linear-gradient(#f65858, #e64848);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-right: 20px;
  & > span:last-child {
    font-size: 30px;
    font-weight: 700;
    margin-top: 10px;
  }
`;
const MenuInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;
const MenuTitle = styled.div`
  margin-bottom: 5px;
  & > span {
    font-size: 24px;
    font-weight: 700;
  }
`;
const SetOptionTitle = styled.div`
  display: flex;
  margin-bottom: 5px;
  & > span {
    width: 150px;
    background: linear-gradient(90deg, #ffffff, #e4e4e4);
    color: black;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 5px;
    padding-bottom: 2px;
    margin-right: 10px;
    border-radius: 5px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 0;
    & > span {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
const QtyTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  & > span:first-child {
    background: linear-gradient(90deg, #ffffff, #e4e4e4);
    color: black;
    border-radius: 5px;
    padding: 5px;
    padding-bottom: 2px;
    margin-right: 10px;
  }
  & > span:last-child {
    font-size: 20px;
    font-weight: 700;
  }
`;
const CostWrapper = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: linear-gradient(#f65858, #e64848);
  color: white;
  font-size: 16px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    & > span:first-child {
      font-size: 20px;
      font-weight: 700;
      padding-bottom: 5px;
    }
  }
`;

function MenuConfirm() {
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const setTextProcessing = useSetRecoilState(textProcessing);
  const setProgress = useSetRecoilState(progressBarLevel);
  const setIsProcessing = useSetRecoilState(processing);
  const history = useHistory();
  // const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    //progressBar 계산
    setProgress({
      value: 1,
      passConflict: false,
      stage: "confirm",
      progress: "",
    });

    //메뉴 가격 총 합 계산
    let totalCost = 0;
    ordered.menu.forEach((item, idx) => {
      totalCost += calcCost(ordered.menu, idx);
    });
    setOrdered((prev) => ({
      price: totalCost,
      order: prev.order,
      takeout: prev.takeout,
      menu: prev.menu,
    }));
    // eslint-disable-next-line
  }, []);

  //api 호출
  useEffect(() => {
    if (text) {
      setTextProcessing(true);
      postOrderList(text).then((res) => {
        setCode(res.code);
        setTextProcessing(false);
        let tmpOrderedMenu: IOrdered["menu"] = [];
        res.order_list.forEach((i) => {
          tmpOrderedMenu.push({
            id: i.menu,
            option: i.option,
            set: i.set,
            qty: i.qty,
          });
        });
        setOrdered((prev) => ({
          order: prev.order,
          price: prev.price,
          takeout: prev.takeout,
          menu: [...prev.menu, ...tmpOrderedMenu],
        }));
      });
    }
    // eslint-disable-next-line
  }, [text]);

  //code 확인
  useEffect(() => {
    if (code === 1001) {
      //code 1001: 성공
      setText("");
      history.push("/processing");
    } else if (code === 2001) {
      //code 2001: 주문완료
      setText("");
      setIsProcessing("DONE");
      history.push("/postOrder");
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <Wrapper>
      <Header>주문을 확인해주세요!</Header>
      <ScrollWrapper>
        <PickupInfo>
          <div>
            <span>주문번호</span>
            <span>{ordered.order}</span>
          </div>
          <div>
            <span>식사 위치</span>
            <span>{ordered.takeout ? "포장" : "매장 내 식사"}</span>
          </div>
          <div>
            <span>총</span>
            <span>
              {ordered.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span>원</span>
          </div>
        </PickupInfo>
        {ordered.menu.map((item, idx) => (
          <MenuWrapper key={idx}>
            <IndexWrapper>
              <span>No.</span>
              <span>{idx + 1}</span>
            </IndexWrapper>
            <MenuInfoWrapper>
              <MenuTitle>
                <span>{idToName(menuData, item.id[0])}</span>
              </MenuTitle>
              {item.option.length > 0 ? (
                <SetOptionTitle>
                  <span>선택하신 옵션</span>
                  <div>
                    {item.option.map((i) => (
                      <span key={i}>{idToName(menuData, i)}</span>
                    ))}
                  </div>
                </SetOptionTitle>
              ) : null}
              {item.set.length > 0 ? (
                <SetOptionTitle>
                  <span>선택하신 세트 메뉴</span>
                  <div>
                    {item.set.map((i) => (
                      <span key={i}>{idToName(menuData, i)}</span>
                    ))}
                  </div>
                </SetOptionTitle>
              ) : null}
              <QtyTitle>
                <span>수량</span>
                <span>{item.qty}</span>
              </QtyTitle>
            </MenuInfoWrapper>
            <CostWrapper>
              <span>가격</span>
              <div>
                <span>
                  {calcCost(ordered.menu, idx)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>원</span>
              </div>
            </CostWrapper>
          </MenuWrapper>
        ))}
      </ScrollWrapper>
    </Wrapper>
  );
}

export default MenuConfirm;
