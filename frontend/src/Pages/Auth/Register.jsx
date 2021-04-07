import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { Spin, message } from "antd";

import useAxios from "Contexts/useAxios";
import { AuthContext, AUTH_ACTIONS } from "Contexts/Auth";

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

const Register = ({ className }) => {

  const history = useHistory()
  const { setAuth } = useContext(AuthContext)

  const { axios, isLoading } = useAxios();

  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    type: "retailer"
  })

  const register = () => {
    console.log({ payload })
    const { confirm, password } = payload
    if (confirm !== password) return message.error("Passwords do not match", 1);

    axios.post("/auth/local/register", payload).then(res => {
      if (!res.data) return message.error(`Could not Complete registration. Please try again.`)
      const { jwt, user } = res.data;

      message.success(`Welcome, ${user.username}`, 1);
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
          type: payload.type
        },
        additionalInfo: {
          ...user
        },
      })
      history.push(`/${payload.type}/dashboard`)
    }).catch(err => {
      message.error(err.message)
    });
  };

  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className={classes.card}>
        <div className={classes.logo}>CartNYou</div>
        <h2 className={classes.title}>Register</h2>
        <div className={classes.divider} />
        <Spin spinning={isLoading} size={"large"}>
          <div className={classes.row}>
            <div className={classes.row_item}>
              <input type="radio" name="type" id="wholeseller" className={'mr-1 text-red-500'} checked={payload.type === 'wholeseller'} onChange={(e) => setPayload(p => ({ ...p, type: e.target.checked ? e.target.id : p.type }))} />
              <label htmlFor="wholeseller">WholeSeller</label>
            </div>
            <div className={classes.row_item}>
              <input type="radio" name="type" id="retailer" className={'mr-1 text-red-500'} checked={payload.type === 'retailer'} onChange={(e) => setPayload(p => ({ ...p, type: e.target.checked ? e.target.id : p.type }))} />
              <label htmlFor="retailer">Retailer</label>
            </div>
          </div>
          <div>
            <label htmlFor="full-name" className="sr-only">
              Fullname
            </label>
            <input
              id="full-name"
              name="fullname"
              type="text"
              autoComplete="fullname"
              required
              className={classes.input}
              placeholder="Fullname"
              value={payload.fullname}
              onChange={e => setPayload(p => ({ ...p, fullname: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="full-name" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className={classes.input}
              placeholder="Username"
              value={payload.username}
              onChange={e => setPayload(p => ({ ...p, username: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={classes.input}
              placeholder="Email address"
              value={payload.email}
              onChange={e => setPayload(p => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              maxLength={13}
              autoComplete="mobile"
              required
              className={classes.input}
              placeholder="Mobile Number"
              value={payload.mobile}
              onChange={e => setPayload(p => ({ ...p, mobile: e.target.value }))}
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
              value={payload.password}
              onChange={e => setPayload(p => ({ ...p, password: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="none"
              required
              className={classes.input}
              placeholder="Confirm Password"
              value={payload.confirm}
              onChange={e => setPayload(p => ({ ...p, confirm: e.target.value }))}
            />
          </div>
          <button type="submit" className={classes.submit_button} onClick={register}>
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
            Register
          </button>
          <div className={clsx(classes.divider, "mt-6 mb-4")} />
          <span className={classes.create_account}>
            Already Registered? &nbsp;
            <Link to="/auth/login" className={classes.create_account_inner}>
              Login
            </Link>
          </span>
        </Spin>
      </div>
    </div>
  );
};

export default Register;
