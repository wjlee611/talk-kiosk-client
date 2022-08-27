import { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { orderedMenu, processing, procIdx, resultCode } from "../atoms";
import Stt from "../components/Stt";
import MenuList from "./MenuList";
import MenuOption from "./MenuOption";
import MenuSet from "./MenuSet";
import MenuSpec from "./MenuSpec";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fec260;
`;
const ComponentWrapper = styled.div`
  width: 300%;
  height: 100%;
`;

function Processing() {
  const [ordered, setOrdered] = useRecoilState(orderedMenu);
  const [processIdx, setProcessIdx] = useRecoilState(procIdx);
  const [isProcessing, setIsProcessing] = useRecoilState(processing);
  const [code, setCode] = useRecoilState(resultCode);
  const history = useHistory();

  useEffect(() => {
    if (processIdx < ordered.menu.length) {
      if (!isProcessing && code === 1001) {
        setIsProcessing(true);
        if (ordered.menu[processIdx].id.length > 1) {
          setCode(1003);
          history.push("/processing/list");
        } else {
          setCode(2003);
          history.push("/processing/option");
        }
      }
    } else {
      console.log("final result:", ordered);
    }
  }, [ordered, isProcessing, code]);

  return (
    <Wrapper>
      <Stt />
      <ComponentWrapper>
        <Switch>
          <Route path={"/processing/list"}>
            <MenuList />
          </Route>
          <Route path={"/processing/spec"}>
            <MenuSpec />
          </Route>
          <Route path={"/processing/option"}>
            <MenuOption />
          </Route>
          <Route path={"/processing/set"}>
            <MenuSet />
          </Route>
        </Switch>
      </ComponentWrapper>
    </Wrapper>
  );
}

export default Processing;
