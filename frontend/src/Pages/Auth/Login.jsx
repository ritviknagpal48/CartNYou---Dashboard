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

  const { axios, isLoading } = useAxios()

  const signIn = (e) => {
    e.preventDefault();

    axios.post('http://localhost:1337/auth/local', {
      identifier: username,
      password: password
    }).then(res => {
      if (!res.data) {
        return message.error(`No ${capitalize(userType)} found with given credentials.`, 1)
      }

      const { jwt, user } = res.data;

      if (user.type !== userType) {
        return message.error(`No ${capitalize(userType)} found with given credentials.`, 1)
      }
      if (user.isBlocked) {
        return message.error('This account is Blocked. Please contact Support Team for more information.', 1)
      }

      message.success(`Welcome Back, ${user.username}`, 1)
      axios.defaults.headers = {
        'authorization': `Bearer ${jwt}`
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
            <input type="checkbox" name="remember-me" id="remember-me" className={'mr-1 text-red-500 border-red-500'} />
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
