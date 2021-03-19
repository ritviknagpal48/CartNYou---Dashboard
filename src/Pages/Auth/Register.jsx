import clsx from "clsx"
import { Link } from "react-router-dom"

const classes = {
  wrapper: "",
  card: "rounded overflow-hidden shadow-lg text-black p-6 bg-white w-full pb-8",
  input: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm my-6",
  title: "text-2xl pl-2 mb-4 text-center text-gray-500",
  divider: "h-0.5 bg-gray-200 my-2",
  logo: "pl-2 text-red-500 text-4xl mb-3 font-bold text-center",
  create_account: "text-center text-gray-500 flex items-center justify-center",
  create_account_inner: "text-red-500",
  submit_button: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
}

const Register = ({ className }) => {
  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className={classes.card}>
        <div className={classes.logo}>
          CartNYou
        </div>
        <h2 className={classes.title}>Register</h2>
        <div className={classes.divider} />
        <div>
          <label for="full-name" className="sr-only">Full Name</label>
          <input id="full-name" name="fullname" type="text" autocomplete="name" required className={classes.input} placeholder="Full Name" />
        </div>
        <div>
          <label for="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required className={classes.input} placeholder="Email address" />
        </div>
        <div>
          <label for="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="none" required className={classes.input} placeholder="Password" />
        </div>
        <button type="submit" className={classes.submit_button}>
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-red-500 group-hover:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Register
        </button>
        <div className={clsx(classes.divider, "mt-6 mb-4")} />
        <span className={classes.create_account}>Already Registered? &nbsp;<Link to="/auth/login" className={classes.create_account_inner}>Login</Link></span>
      </div>
    </div>
  )
}

export default Register
