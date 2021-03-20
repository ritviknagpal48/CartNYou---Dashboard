import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";

const classes = {
  wrapper: "text-white bg-login-bg w-screen h-screen bg-cover bg-center"
}

function App() {
  return (
    <div className={classes.wrapper}>
      <BrowserRouter>
        <Route path={'/'} exact component={() => {
          const isLoggedIn = false;

          if (isLoggedIn) {
            return <Redirect to={'/app/dashboard'} />
          }

          return <Redirect to={'/auth'} />
        }} />
        <Route path={'/auth'} component={Auth} />
        <Route path={'/app'} component={Home}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
