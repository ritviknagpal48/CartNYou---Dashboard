import { AuthContext } from 'Contexts/Auth'
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({ component: Component, path: pathProp, exact, redirectPath, ...rest }) => {

  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) return <Redirect to={redirectPath} />

  return (
    <Route
      path={pathProp}
      exact={exact}
      component={Component}
      {...rest}
    />
  )
}

PrivateRoute.defaultProps = {
  redirectPath: '/auth/login',
  component: () => <h1>Private Route</h1>,
  exact: false,
}

export default PrivateRoute
