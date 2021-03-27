import { AuthContext } from "Contexts/Auth";
import { useContext } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Wholeseller/Home/Home";

const classes = {
  wrapper:
    "text-white bg-general max-w-screen min-h-screen h-full bg-cover bg-center",
};

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      <HashRouter>
        <Route
          component={() => {
            const red_path = isLoggedIn ? '/app' : '/auth';
            console.log({ isLoggedIn, red_path })
            return <Redirect to={red_path} />;
          }}
        />
        <Switch>
          <Route
            path={"/"}
            exact
            component={() => {
              const red_path = isLoggedIn ? '/app' : '/auth';
              return <Redirect to={red_path} />;
            }}
          />
          <Route
            path={"/auth"}
            component={() => (
              <div className={"bg-login-bg h-screen"}>
                <Auth />
              </div>
            )}
          />
          <Route path={"/app"} component={Home} />
          <Route
            component={() => {
              return (
                <div
                  className={"text-5xl text-white font-bold tracking-widest"}
                >
                  <span className={"text-red-500"}>404</span>
                  Page not Found
                </div>
              );
            }}
          />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
