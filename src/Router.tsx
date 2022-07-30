import { BrowserRouter, Route, Switch } from "react-router-dom";
import KioskHome from "./routes/KioskHome";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <KioskHome />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
