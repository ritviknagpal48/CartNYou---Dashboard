import useAxios from "Contexts/useAxios"
import { useContext, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { message, Spin } from 'antd'
import { AuthContext, AUTH_ACTIONS } from "Contexts/Auth"

const capitalize = (value) => `${value}`.split('').map((x, idx) => idx === 0 ? x.toUpperCase() : x.toLowerCase()).join('')

const GoogleCallback = () => {
  const history = useHistory()
  const location = useLocation()
  const { axios, isLoading } = useAxios()
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!location) return;

    const { search } = location;
    axios
      .get(`/auth/google/callback?${search}`)
      .then(res => {
        if (!res.data) {
          return message.error(`Error Logging into Google Servers. Please try again later.`, 1)
        }

        const { jwt, user } = res.data;
        const userType = sessionStorage.getItem('CARTNYOU_SESSION_LOGIN_MODE')
        sessionStorage.removeItem('CARTNYOU_SESSION_LOGIN_MODE')

        if (!userType) {
          return message.error(`Something Went Wrong. Please try again.`, 1, () => {
            history.push('/auth/login');
          })
        }

        // make sure that if the user is already existing and is of specific type then
        // they do not wander into the other user types.
        if (!!user.type && user.type !== userType) {
          return message.error(`No ${capitalize(userType)} found with given credentials.`, 1, () => {
            history.push('/auth/login');
          })
        }

        if (user.isBlocked) {
          return message.error('This account is Blocked. Please contact Support Team for more information.', 1, () => {
            history.push('/auth/login');
          })
        }

        axios.defaults.headers = {
          'Authorization': `Bearer ${jwt}`
        }

        axios.put(`/users/${user.id}`, { type: userType }).then(() => {
          setAuth(AUTH_ACTIONS.LOGIN, {
            isLoggedIn: true,
            token: jwt,
            user: {
              fname: user.username,
              username: user.username,
              email: user.email,
              type: user.type || userType
            },
            additionalInfo: {
              ...user
            },
          })
          message.success(`Welcome Back, ${user.username}`, 1)
          history.push(`/${userType}/dashboard`)
        })
      })
  }, [location, axios, history, setAuth])

  if (isLoading) return <Spin size={'large'} className={'text-red-500'} spinning={isLoading} tip={'Waiting for Pending Operations to complete.'}></Spin>
  return null;
}

export default GoogleCallback
