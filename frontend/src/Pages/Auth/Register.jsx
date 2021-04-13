import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { Spin, message, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";

import useAxios from "Contexts/useAxios";
import { AuthContext, AUTH_ACTIONS } from "Contexts/Auth";

const classes = {
  wrapper: "py-6",
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
  remember_me: "mb-4 ring-none",
};

const Register = ({ className }) => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const { axios, isLoading } = useAxios();

  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    mobile: "",
    type: "wholeseller",
  });

  const signInWithGoogle = async (response) => {
    // e.preventDefault();

    const { tokenId: id_token, accessToken: access_token } = response;

    const authResp = await axios.get(
      `/auth/google/callback?id_token=${id_token}&access_token=${access_token}`
    );
    const { jwt, user } = authResp.data;

    if (!payload.type) {
      return message.error(`Something Went Wrong. Please try again.`, 3, () => {
        history.push("/auth/login");
      });
    }

    if (!user.type) {
      await axios.put(`/users/${user.id}`, { type: payload.type });
    }

    // User already exists and is blocked by Admin
    if (user.isBlocked) {
      return message.error("This account is Blocked. Please contact Support Team for more information.", 3);
    }

    setAuth(AUTH_ACTIONS.LOGIN, {
      isLoggedIn: true,
      token: jwt,
      user: {
        fname: user.username,
        username: user.username,
        email: user.email,
        type: user.type || payload.type,
      },
      additionalInfo: {
        ...user,
      },
    });
    message.success(`Welcome, ${user.username}`, 1);
    history.push(`/${payload.type}/dashboard`);
  };

  const register = async () => {
    // console.log({ payload })
    const { confirm, fullname, mobile, ...toSend } = payload;

    if (!toSend.username.trim().length) {
      return message.error("Username is Required!");
    }
    if (!toSend.email.trim().length) {
      return message.error("Email is Required!");
    }
    if (!confirm.trim().length) {
      return message.error("Confirm Password is Required!");
    }
    if (!toSend.password.trim().length) {
      return message.error("Password is Required!");
    }
    if (confirm !== toSend.password)
      return message.error("Passwords do not match", 1);

    const resp1 = await axios.post("/auth/local/register", { ...toSend })
    // const resp2 = await axios.put(`/users/${resp1.data.id}`, { fullname, mobile, type })
    console.log({
      resp1,
      // resp2,
      toSend,
    })

    return null;

    const res = null;
    if (!res.data || res.status !== 200) {
      if (res.response.data.message[0].messages instanceof Array) {
        res.response.data.message[0].messages.forEach((err) =>
          message.error(err.message)
        );
      }
      return null;
    }
    const { jwt, user } = res.data;

    message.success(`Welcome, ${user.username}`, 1);
    setAuth(AUTH_ACTIONS.LOGIN, {
      isLoggedIn: true,
      token: jwt,
      user: {
        fname: user.username,
        username: user.username,
        email: user.email,
        type: payload.type,
      },
      additionalInfo: {
        ...user,
      },
    });
    history.push(`/${payload.type}/dashboard`);

  };

  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className={classes.card}>
        <div className={classes.logo}>CartNYou</div>
        <h2 className={classes.title}>Register</h2>
        <div className={classes.divider} />
        <Spin
          spinning={isLoading}
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />
          }
        >
          <div className={classes.row}>
            <div className={classes.row_item}>
              <input
                type="radio"
                name="type"
                id="wholeseller"
                className={"mr-1 text-red-500"}
                checked={payload.type === "wholeseller"}
                onChange={(e) =>
                  setPayload((p) => ({
                    ...p,
                    type: e.target.checked ? e.target.id : p.type,
                  }))
                }
              />
              <label htmlFor="wholeseller">WholeSeller</label>
            </div>
            <div className={classes.row_item}>
              <input
                type="radio"
                name="type"
                id="retailer"
                className={"mr-1 text-red-500"}
                checked={payload.type === "retailer"}
                onChange={(e) =>
                  setPayload((p) => ({
                    ...p,
                    type: e.target.checked ? e.target.id : p.type,
                  }))
                }
              />
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
              onChange={(e) =>
                setPayload((p) => ({ ...p, fullname: e.target.value }))
              }
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
              onChange={(e) =>
                setPayload((p) => ({ ...p, username: e.target.value }))
              }
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
              onChange={(e) =>
                setPayload((p) => ({ ...p, email: e.target.value }))
              }
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
              onChange={(e) =>
                setPayload((p) => ({ ...p, mobile: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={!showPass ? "text" : "password"}
              autoComplete="none"
              required
              className={classes.input}
              placeholder="Password"
              value={payload.password}
              onChange={(e) =>
                setPayload((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>
          <div style={{ textAlign: "end" }}>
            <label htmlFor="password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="password"
              type={!showPass ? "text" : "password"}
              autoComplete="none"
              required
              className={`${classes.input}  mt-6 mb-0 my-0`}
              placeholder="Confirm Password"
              value={payload.confirm}
              onChange={(e) =>
                setPayload((p) => ({ ...p, confirm: e.target.value }))
              }
            />
            {showPass ? (
              <Button
                style={{
                  fontSize: "12px",
                  color: "#ef4444",
                  paddingRight: "0px",
                  marginBottom: "10px",
                }}
                type="link"
                onClick={() => setShowPass(!showPass)}
              >
                Show Password
              </Button>
            ) : (
              <Button
                style={{
                  fontSize: "12px",
                  color: "#ef4444",
                  paddingRight: "0px",
                  marginBottom: "10px",
                }}
                type="link"
                onClick={() => setShowPass(!showPass)}
              >
                Hide Password
              </Button>
            )}
          </div>
          <button
            type="submit"
            className={classes.submit_button}
            onClick={register}
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
            Register
          </button>
          <div className={clsx(classes.divider, "mt-6 mb-4")} />
          <GoogleLogin
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            onSuccess={signInWithGoogle}
            buttonText={"Login with Google"}
            render={(renderProps) => (
              <button
                disabled={renderProps.disabled}
                onClick={renderProps.onClick}
                type="submit"
                className={classes.submit_button}
              // onClick={signInWithGoogle}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    version="1.1"
                    id="fi_299409"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    fill={"currentColor"}
                  >
                    <g>
                      <g>
                        <path
                          d="M113.597,193.064l-87.204-50.347C9.543,176.768,0.001,215.17,0,255.998c0,40.263,9.645,78.731,26.754,113.084
                      l86.837-50.135c-8.565-19.286-13.418-40.558-13.417-62.949C100.175,233.608,105.031,212.343,113.597,193.064z"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M423.925,62.768C378.935,23.634,320.145-0.043,255.823,0C167.822,0.059,89.276,44.985,43.127,113.824l87.275,50.39
                      c28.381-38.714,74.04-64.041,125.601-64.04c37.587,0.001,72.042,13.437,98.954,35.701c6.588,5.449,16.218,4.95,22.263-1.095
                      l47.531-47.531C431.605,80.395,431.238,69.128,423.925,62.768z"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M510.247,226.38c-0.997-8.475-8.122-14.89-16.653-14.89l-209.767-0.011c-9.22,0-16.696,7.475-16.696,16.696v66.727
                      c0,9.22,7.475,16.696,16.696,16.696h117.548c-10.827,28.179-29.633,52.403-53.575,70.013l49.928,86.478
                      c50.256-34.056,88.467-85.547,105.297-146.331C512.175,288.709,513.822,256.751,510.247,226.38z"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M318.93,398.381c-19.255,8.578-40.511,13.444-62.927,13.446c-51.619,0.001-97.252-25.327-125.613-64.026l-86.903,50.174
                      C89.249,466.137,166.915,512,256.001,512c40.272,0,78.603-9.845,112.889-27.084L318.93,398.381z"
                        ></path>
                      </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                </span>
                Register with Google
              </button>
            )}
          />
          <div className={clsx(classes.divider, "mt-6 mb-4")} />
          <span className={classes.create_account}>
            Already have an account? &nbsp;
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
