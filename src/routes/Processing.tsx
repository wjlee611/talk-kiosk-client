import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/transition.css";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { orderedMenu, processing, procIdx, resultCode } from "../atoms";
import Stt from "../components/Stt";
import MenuConfirm from "./MenuConfirm";
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
  const ordered = useRecoilValue(orderedMenu);
  const processIdx = useRecoilValue(procIdx);
  const [isProcessing, setIsProcessing] = useRecoilState(processing);
  const [code, setCode] = useRecoilState(resultCode);
  const history = useHistory();

  useEffect(() => {
    if (processIdx < ordered.menu.length) {
      if (!isProcessing && code === 1001) {
        setIsProcessing(true);
        if (ordered.menu[processIdx].id.length > 1) {
          setCode(1003);
        } else {
          setCode(2003);
        }
      }
    } else {
      setCode(2001);
    }
  }, [ordered, isProcessing]);

  //code 확인
  useEffect(() => {
    if (code === 1003) {
      history.push("/processing/list");
    } else if (code === 2003) {
      history.push("/processing/option");
    } else if (code === 2001) {
      setCode(0);
      history.push("/processing/confirm");
    }
  }, [code]);

  return (
    <Wrapper>
      <Stt />
      <ComponentWrapper>
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup className="transition-group">
                <CSSTransition
                  key={location.key}
                  timeout={500}
                  classNames="scale_fade"
                  unmountOnExit
                >
                  <Switch location={location}>
                    <Route path={"/processing/list"}>
                      <div
                        style={{
                          width: "75%",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "25%",
                          left: 0,
                          top: 0,
                          overflow: "hidden",
                        }}
                      >
                        <MenuList />
                      </div>
                    </Route>
                    <Route path={"/processing/spec"}>
                      <div
                        style={{
                          width: "75%",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "25%",
                          left: 0,
                          top: 0,
                          overflow: "hidden",
                        }}
                      >
                        <MenuSpec />
                      </div>
                    </Route>
                    <Route path={"/processing/option"}>
                      <div
                        style={{
                          width: "75%",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "25%",
                          left: 0,
                          top: 0,
                          overflow: "hidden",
                        }}
                      >
                        <MenuOption />
                      </div>
                    </Route>
                    <Route path={"/processing/set"}>
                      <div
                        style={{
                          width: "75%",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "25%",
                          left: 0,
                          top: 0,
                          overflow: "hidden",
                        }}
                      >
                        <MenuSet />
                      </div>
                    </Route>
                    <Route path={"/processing/confirm"}>
                      <div
                        style={{
                          width: "75%",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "25%",
                          left: 0,
                          top: 0,
                          overflow: "hidden",
                        }}
                      >
                        <MenuConfirm />
                      </div>
                    </Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        ></Route>
      </ComponentWrapper>
    </Wrapper>
  );
}

export default Processing;
