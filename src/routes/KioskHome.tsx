import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { IOrdered, postOrderList } from "../api";
import { orderedMenu, resultCode, stText } from "../atoms";
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
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const text = useRecoilValue(stText);
  const [code, setCode] = useRecoilState(resultCode);

  //api 호출
  useEffect(() => {
    setCode(0); // for test
    if (code === 0) {
      //code 0: 주문대기(only local)
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
  }, [text]);

  //code 확인
  useEffect(() => {
    if (code === 1001) {
      //code 1001: 성공
      //TODO: menu 객체 배열의 id 배열 조사해서 길이가 2 이상이면 메뉴 충돌 api 호출해 해결하기
    }
  }, [code]);
  return (
    <Wrapper>
      <Stt />
      <CartList />
    </Wrapper>
  );
}

export default KioskHome;
