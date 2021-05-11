import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";

const classes = {
  wrapper: "text-white bg-login-bg w-screen h-screen bg-cover bg-center"
}

function App() {
  return (
    <div className={classes.wrapper}>
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={() => {
            const isLoggedIn = false;

            if (isLoggedIn) {
              return <Redirect to={'/app/dashboard'} />
            }

            return <Redirect to={'/auth'} />
          }} />
          <Route path={'/auth'} component={Auth} />
          <Route path={'/app'} component={Home} />
          <Route path={'/**'} component={() => {
            return (
              <div className={'text-5xl text-white font-bold tracking-widest'}>
                <span className={'text-red-500'}>404</span>
                Page not Found
              </div>
            )
          }} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
