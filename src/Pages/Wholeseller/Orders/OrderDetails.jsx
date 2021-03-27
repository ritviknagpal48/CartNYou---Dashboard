// @ts-nocheck
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";

const classes = {
  wrapper: "text-gray-500 text-lg pl-4 pr-14",
  header: "w-full  py-3 flex flex-row items-center ",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center py-1 mx-1 px-2 border border-transparent rounded-3xl shadow-sm bg-white text-sm font-medium text-gray-500  hover:text-red-400 focus:outline-none ",
  action_icons: "h-5 w-5",
  title: "px-3",
};

const OrderDetails = () => {
  const history = useHistory();
  const { params } = useRouteMatch();

  useEffect(() => {
    if (!params.id) history.goBack();
  }, [params]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#edf2f9" }}>
        <button
          onClick={() => {
            history.goBack();
          }}
          className={classes.button_input}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={classes.action_icons}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </button>
        <div className={classes.title}>Order Details</div>
      </div>
    </div>
  );
};

export default OrderDetails;
