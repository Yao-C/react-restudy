import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import _404Page from "../pages/_404Page";
import PrivateRoute from "./PrivateRoute";

export const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/user",
    component: UserPage,
    auth: PrivateRoute,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    component: _404Page,
  },
];

export default function Routes(props) {
  // 20201205 暗号：椰子
  const content = routes.map((route, index) => {
    return route.path === "/" ? (
      <Route exact key={index} path={route.path} component={route.component} />
    ) : route.path === "user" ? (
      <PrivateRoute key={index} path={route.path} component={route.component} />
    ) : typeof route.path !== undefined ? (
      <Route key={index} path={route.path} component={route.component} />
    ) : (
      <Route key={index} component={route.component} />
    );
  });

  console.log(content);

  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      <Link to="/login">登录</Link>

      <Switch>
        {/* <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/user" component={UserPage} />
        <Route component={_404Page} /> */}

        {/* {content} */}

        {/* 作业点播 */}
        {routes.map((Route_, index) =>
          Route_.auth ? (
            <Route_.auth key={Route_.path + index} {...Route_} />
          ) : (
            <Route key={Route_.path + index} {...Route_} />
          )
        )}
      </Switch>
    </Router>
  );
}
