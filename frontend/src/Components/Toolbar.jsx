import React from "react";
import { Link } from "react-router-dom";

const classes = {
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const Toolbar = ({ title, actions }) => {
  return (
    <React.Fragment>
      <div className={classes.header} style={{ background: "#fff" }}>
        <div className={classes.title}>{title}</div>
        <div className={classes.buttons}>
          {
            !!actions &&
            !!actions.length &&
            actions.map(({ onClick, name, icon: ActionIcon, redirect }) => {
              if (typeof onClick === 'function') {
                return (
                  <button
                    onClick={onClick}
                    className={`${classes.button_input} hover:text-red-400`}
                  >
                    {ActionIcon}
                    <span className={classes.button_title}>{name}</span>
                  </button>
                );
              }
              return (
                <Link
                  to={redirect}
                  className={`${classes.button_input} hover:text-red-400`}
                >
                  {ActionIcon}
                  <span className={classes.button_title}>{name}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

Toolbar.defaultProps = {
  title: "Page",
  actions: [
    {
      redirect: "/action1",
      name: "Action 1",
      icon: (
        <svg
          className={classes.action_icons}
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
        </svg>
      ),
    },
  ],
};

export default Toolbar;
