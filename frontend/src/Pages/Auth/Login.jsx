// @ts-nocheck
import { useContext, useState } from "react";
import { Spin, message } from "antd";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";

import { AuthContext, AUTH_ACTIONS } from "Contexts/Auth";
import useAxios from "Contexts/useAxios";

const classes = {
  wrapper: "",
  card: "rounded overflow-hidden shadow-lg text-black p-6 bg-white w-full pb-8",
  input:
    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm my-6",
  title: "text-2xl pl-2 mb-4 text-center text-gray-500",
  divider: "h-0.5 bg-gray-200 my-2",
  logo: "pl-2 text-red-500 text-4xl mb-3 font-bold text-center",
  create_account: "text-center text-gray-500 flex items-center justify-center",
  create_account_inner: "text-red-500",
  submit_button:
    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none",
  row: "flex flex-row justify-center items-center",
  row_item: "mx-3 my-2 flex items-center justify-start",
  remember_me: "mb-4 ring-none"
};

const capitalize = (value) => `${value}`.split('').map((x, idx) => idx === 0 ? x.toUpperCase() : x.toLowerCase()).join('')

const Login = ({ className }) => {

  const history = useHistory()
  const { setAuth } = useContext(AuthContext)

  const [userType, setUserType] = useState("wholeseller")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const { axios, isLoading } = useAxios()

  const signInWithGoogle = (e) => {
    e.preventDefault();

    sessionStorage.setItem('CARTNYOU_SESSION_LOGIN_MODE', userType);

    if (process.env.NODE_ENV === 'production') history.push('/connect/google')
    else window.location = 'http://localhost:1337/connect/google'
  }

  const signIn = (e) => {
    e.preventDefault();

    axios.post('/auth/local', {
      identifier: username,
      password: password
    }).then(res => {
      console.log({ authData: res.data })
      if (!res.data) {
        return message.error(`No ${capitalize(userType)} found with given credentials.`, 1)
      }

      const { jwt, user } = res.data;

      if (user.type !== userType) {
        return message.error(`No ${capitalize(userType)} found with given credentials.`, 1)
      }
      if (user.blocked) {
        return message.error('This account is Blocked. Please contact Support Team for more information.', 1)
      }
      if (!user.confirmed) {
        return message.error('Please check your email for verification.', 1)
      }

      axios.defaults.headers = {
        'Authorization': `Bearer ${jwt}`
      }
      setAuth(AUTH_ACTIONS.LOGIN, {
        isLoggedIn: true,
        token: jwt,
        user: {
          fname: user.username,
          username: user.username,
          email: user.email,
          type: userType
        },
        additionalInfo: {
          ...user
        },
      })

      if (!rememberMe) {
        setAuth(AUTH_ACTIONS.REMOVE_LOCAL);
      }
      message.success(`Welcome Back, ${user.username}`, 1)
      history.push(`/${userType}/dashboard`)
    }).catch(err => {
      message.error(err.message, 1);
    })
  };

  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className={classes.card}>
        <div className={classes.logo}>CartNYou</div>
        <h2 className={classes.title}>Login</h2>
        <div className={classes.divider} />
        <Spin spinning={isLoading} size={'large'}>
          <div className={classes.row}>
            <div className={classes.row_item}>
              <input type="radio" name="type" id="wholeseller" className={'mr-1 text-red-500'} checked={userType === 'wholeseller'} onChange={(e) => setUserType(p => e.target.checked ? e.target.id : p)} />
              <label htmlFor="wholeseller">WholeSeller</label>
            </div>
            <div className={classes.row_item}>
              <input type="radio" name="type" id="retailer" className={'mr-1 text-red-500'} checked={userType === 'retailer'} onChange={(e) => setUserType(p => e.target.checked ? e.target.id : p)} />
              <label htmlFor="retailer">Retailer</label>
            </div>
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Username
            </label>
            <input
              id="email-address"
              name="email"
              type="text"
              autoComplete="username"
              required
              className={classes.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="none"
              required
              className={classes.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.remember_me}>
            <input type="checkbox" name="remember-me" id="remember-me" className={'mr-1 text-red-500 border-red-500'} onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe} />
            <label htmlFor="remember-me">Remember Me</label>
          </div>
          <button
            type="submit"
            className={classes.submit_button}
            onClick={signIn}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-red-500 group-hover:text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
          <div className={clsx(classes.divider, "mt-6 mb-4")} />
          <button
            type="submit"
            className={classes.submit_button}
            onClick={signInWithGoogle}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" version="1.1" id="fi_299409" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" fill={'currentColor'}>
                <g>
                  <g>
                    <path d="M113.597,193.064l-87.204-50.347C9.543,176.768,0.001,215.17,0,255.998c0,40.263,9.645,78.731,26.754,113.084
			l86.837-50.135c-8.565-19.286-13.418-40.558-13.417-62.949C100.175,233.608,105.031,212.343,113.597,193.064z"></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M423.925,62.768C378.935,23.634,320.145-0.043,255.823,0C167.822,0.059,89.276,44.985,43.127,113.824l87.275,50.39
			c28.381-38.714,74.04-64.041,125.601-64.04c37.587,0.001,72.042,13.437,98.954,35.701c6.588,5.449,16.218,4.95,22.263-1.095
			l47.531-47.531C431.605,80.395,431.238,69.128,423.925,62.768z"></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M510.247,226.38c-0.997-8.475-8.122-14.89-16.653-14.89l-209.767-0.011c-9.22,0-16.696,7.475-16.696,16.696v66.727
			c0,9.22,7.475,16.696,16.696,16.696h117.548c-10.827,28.179-29.633,52.403-53.575,70.013l49.928,86.478
			c50.256-34.056,88.467-85.547,105.297-146.331C512.175,288.709,513.822,256.751,510.247,226.38z"></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M318.93,398.381c-19.255,8.578-40.511,13.444-62.927,13.446c-51.619,0.001-97.252-25.327-125.613-64.026l-86.903,50.174
			C89.249,466.137,166.915,512,256.001,512c40.272,0,78.603-9.845,112.889-27.084L318.93,398.381z"></path>
                  </g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
              </svg>
            </span>
            Login with Google
          </button>
          <div className={clsx(classes.divider, "mt-6 mb-4")} />
          <span className={classes.create_account}>
            New here? &nbsp;
            <Link to="/auth/register" className={classes.create_account_inner}>
              Register Now
            </Link>
          </span>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
