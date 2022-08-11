import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
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
  background-color: #00000033;
`;

function Processing() {
  //   const listMatch = useRouteMatch("/processing/list");
  //   const specMatch = useRouteMatch("/processing/spec");
  //   const optionMatch = useRouteMatch("/processing/option");
  //   const setMatch = useRouteMatch("/processing/set");

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
