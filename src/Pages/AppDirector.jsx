import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext, USER_TYPES } from 'Contexts/Auth'

const AppDirector = () => {
  const { user, isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) return <Redirect to={'/auth/login'} />
  if (user.type === USER_TYPES.RETAILER) return <Redirect to={'/retailer'} />
  return <Redirect to={'/wholeseller'} />
}

export default AppDirector
