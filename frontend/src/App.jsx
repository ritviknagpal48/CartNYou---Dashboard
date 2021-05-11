// @ts-nocheck
import PrivateRoute from "Components/PrivateRoute";
import { AuthContext } from "Contexts/Auth";
import { useContext } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import AppDirector from "./Pages/AppDirector";
import WholesellerHome from "./Pages/Wholeseller/Home/Home";
import RetailerHome from "./Pages/Retailer/Home/Home";
import { Result } from "antd";

import './App.css'

const classes = {
  wrapper:
    "text-white bg-general max-w-screen min-h-screen h-full bg-cover bg-center",
  submit_button:
    "group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none",
};

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      <BrowserRouter>
        <Switch>
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
          <Route path={"/confirm-email"} exact component={(renderProps) => (
            <div className={'grid place-items-center h-full'}>
              <Result
                {...renderProps}
                status={'success'}
                title={'Yaaayyy! Your Email has been verified.'}
                subTitle={'If you were unable to login, Please try again. If you still face issues, We are there to help.'}
                extra={[
                  <Link to={'/auth/login'} className={classes.submit_button}>Login Now</Link>
                ]}
              />
            </div>
          )} />
          <Route path={"/verify-email"} exact component={(renderProps) => (
            <div className={'grid place-items-center h-full'}>
              <Result
                {...renderProps}
                status={'info'}
                title={'Please Confirm your Email.'}
                subTitle={'Please check your inbox for our Confirmation mail. Also consider checking your SPAM folder.'}
                extra={[
                  <Link to={'/auth/login'} className={classes.submit_button}>Login Now</Link>
                ]}
              />
            </div>
          )} />
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
