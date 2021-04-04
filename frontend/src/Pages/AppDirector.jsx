import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from 'Contexts/Auth'

const AppDirector = () => {
  const { user, isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn || !user.type) return <Redirect to={'/auth/login'} />
  return <Redirect to={`/${user.type}`} />
}

export default AppDirector
