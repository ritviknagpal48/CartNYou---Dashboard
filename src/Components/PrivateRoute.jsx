import { AuthContext } from 'Contexts/Auth'
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

const PrivateRoute = ({ component: Component, path: pathProp, exact, redirectPath, ...rest }) => {

  const { pathname } = useLocation()
  const { isLoggedIn, user: { type } } = useContext(AuthContext)

  if (!isLoggedIn) return <Redirect to={redirectPath} />

  if (type === pathname.split('/')[1])
    return (
      <Route
        path={pathProp}
        exact={exact}
        component={Component}
        {...rest}
      />
    )

  return <Redirect to={`/${type}/dashboard`} />

}

PrivateRoute.defaultProps = {
  redirectPath: '/auth/login',
  component: () => <h1>Private Route</h1>,
  exact: false,
}

export default PrivateRoute
