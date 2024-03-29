import { AuthContext } from "Contexts/Auth";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
// import GoogleCallback from './GoogleCallback'
import Login from "./Login";
import Register from "./Register";

const classes = {
  wrapper:
    "w-full h-full min-h-screen overflow-hidden flex items-center justify-center",
  form: "flex mx-auto my-auto w-10/12 md:w-1/4",
};

const Auth = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      <Route
        path={"/auth"}
        exact
        component={() => {
          // console.log({ isLoggedIn, path: window.location })
          if (isLoggedIn) return <Redirect to={"/"} />;
          return <Redirect to={"/auth/login"} />;
        }}
      />
      <Route path={"/auth/login"}>
        <Login className={classes.form} />
      </Route>
      <Route path={"/auth/register"}>
        <Register className={classes.form} />
      </Route>
      {/* <Route path={'/auth/callback/google'} >
        <GoogleCallback className={classes.form} />
      </Route> */}
    </div>
  );
};

export default Auth;
