import { Redirect, Route } from 'react-router-dom'
import Login from "./Login"
import Register from "./Register"

const classes = {
  wrapper: "w-full h-full overflow-hidden flex items-center justify-center",
  form: "mx-auto my-auto justify-self-start w-10/12 md:w-1/4",
}

const Auth = () => {
  return (
    <div className={classes.wrapper}>
      <Route path={'/auth'} exact component={() => {
        const isLoggedIn = true;

        if (isLoggedIn) {
          return <Redirect to={'/app/dashboard'} />
        }
        return <Redirect to={'/auth/login'} />
      }} />
      <Route path={'/auth/login'} >
        <Login className={classes.form} />
      </Route>
      <Route path={'/auth/register'} >
        <Register className={classes.form} />
      </Route>
    </div>
  )
}

export default Auth