import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  const [text, setText] = useRecoilState(stText);
  const [code, setCode] = useRecoilState(resultCode);
  const history = useHistory();
  const [isFirst, setIsFirst] = useState(true);

  //api 호출
  useEffect(() => {
    if (!isFirst && code !== 2001) {
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
    if (code === 1001 || code === 2001) {
      //code 1001: 성공, 2001: 주문완료
      setText("");
      history.push("/processing");
    }
  }, [code]);

  return (
    <Wrapper>
      <Stt />
    </Wrapper>
  );
}

export default KioskHome;
