import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";

const classes = {
  wrapper: "text-white bg-general w-screen min-h-screen h-full bg-cover bg-center"
}

function App() {
  return (
    <div className={classes.wrapper}>
      <HashRouter>
        <Switch>
          <Route path={'/'} exact component={() => {
            const isLoggedIn = false;

            if (isLoggedIn) {
              return <Redirect to={'/app/dashboard'} />
            }

            return <Redirect to={'/auth'} />
          }} />
          <Route path={'/auth'} component={() =>
            <div className={'bg-login-bg h-full'}>
              <Auth />
            </div>
          } />
          <Route path={'/app'} component={Home} />
          <Route component={() => {
            return (
              <div className={'text-5xl text-white font-bold tracking-widest'}>
                <span className={'text-red-500'}>404</span>
                Page not Found
              </div>
            )
          }} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
