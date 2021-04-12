// @ts-nocheck
import PrivateRoute from "Components/PrivateRoute";
import { AuthContext } from "Contexts/Auth";
import { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import AppDirector from "./Pages/AppDirector";
import WholesellerHome from "./Pages/Wholeseller/Home/Home";
import RetailerHome from "./Pages/Retailer/Home/Home";
import GoogleCallback from "Pages/Auth/GoogleCallback";
import { Button, Result } from "antd";

const classes = {
  wrapper:
    "text-white bg-general max-w-screen min-h-screen h-full bg-cover bg-center",
};

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      <BrowserRouter>
        <Switch>
          <Route path={"/auth/callback/google"} component={GoogleCallback} />
          <Route
            path={"/"}
            exact
            component={() => {
              return !isLoggedIn ? (
                <Redirect to={"/auth/login"} />
              ) : (
                <AppDirector />
              );
            }}
          />
          <Route
            path={"/auth"}
            component={() => (
              <div className={"bg-login-bg min-h-screen"}>
                <Auth />
              </div>
            )}
          />
          <PrivateRoute path={"/wholeseller"} component={WholesellerHome} />
          <PrivateRoute path={"/retailer"} component={RetailerHome} />
          <Route
            component={() => {
              return (
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
