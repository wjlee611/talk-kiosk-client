import { BrowserRouter, Route, Switch } from "react-router-dom";
import ConsoleHome from "./routes/ConsoleHome";
import KioskHome from "./routes/KioskHome";
import Processing from "./routes/Processing";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <KioskHome />
        </Route>
        <Route path="/console">
          <ConsoleHome />
        </Route>
        <Route path="/processing">
          <Processing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
