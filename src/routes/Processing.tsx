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
import ProgressBar from "../components/ProgressBar";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fec260;
`;
const ComponentWrapper = styled.div`
  width: calc(100% - 360px);
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
          setCode(1004);
        }
      }
    } else if (code !== 1002) {
      setCode(1005);
    }
  }, [ordered, isProcessing]);

  //code 확인
  useEffect(() => {
    if (code !== 1002 && isProcessing !== "DONE") {
      if (code === 1003) {
        history.push("/processing/list");
      } else if (code === 1004) {
        history.push("/processing/option");
      } else if (code === 1005) {
        history.push("/processing/confirm");
      }
    }
  }, [code]);

  return (
    <Wrapper>
      <div style={{ width: "360px", height: "100%", marginTop: "50px" }}>
        <Stt />
      </div>
      <ComponentWrapper>
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup className="transition-group">
                <CSSTransition
                  key={location.key}
                  timeout={200}
                  classNames="scale_fade"
                  unmountOnExit
                >
                  <Switch location={location}>
                    <Route path={"/processing/list"}>
                      <div
                        style={{
                          width: "calc(100% - 360px)",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "360px",
                          paddingTop: "50px",
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
                          width: "calc(100% - 360px)",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "360px",
                          paddingTop: "50px",
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
                          width: "calc(100% - 360px)",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "360px",
                          paddingTop: "50px",
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
                          width: "calc(100% - 360px)",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "360px",
                          paddingTop: "50px",
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
                          width: "calc(100% - 360px)",
                          height: "100%",
                          position: "fixed",
                          marginLeft: "360px",
                          paddingTop: "50px",
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
      <ProgressBar />
    </Wrapper>
  );
}

export default Processing;
