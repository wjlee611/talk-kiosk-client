import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IOrdered, postOrderList } from "../api";
import { orderedMenu, resultCode, stText } from "../atoms";
import menuData from "../menu-table.json";
import { idToName } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  padding-bottom: 50px;
  overflow-y: scroll;
`;
const ScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Header = styled.div`
  width: 60%;
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
  position: fixed;
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
  margin-bottom: 30px;
  border-radius: 10px;
  & > div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > span:last-child {
      font-size: 30px;
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
    background: linear-gradient(90deg, #f65858, #e64848);
    color: white;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 5px;
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
    background: linear-gradient(90deg, #f65858, #e64848);
    color: white;
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
  }
  & > span:last-child {
    font-size: 20px;
    font-weight: 700;
  }
`;

function MenuConfirm() {
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const history = useHistory();
  const [isFirst, setIsFirst] = useState(true);

  //api 호출
  useEffect(() => {
    if (!isFirst) {
      postOrderList(text).then((res) => {
        setCode(res.code);
        let tmpOrderedMenu: IOrdered["menu"] = [];
        res.order_list.map((i) => {
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
    setIsFirst(false);
  }, [text, isFirst]);

  //code 확인
  useEffect(() => {
    if (code === 1001) {
      //code 1001: 성공
      setText("");
      history.push("/processing");
    } else if (code === 2001) {
      //code 2001: 주문완료
      console.log("final result:", ordered);
    }
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
          </MenuWrapper>
        ))}
      </ScrollWrapper>
    </Wrapper>
  );
}

export default MenuConfirm;
