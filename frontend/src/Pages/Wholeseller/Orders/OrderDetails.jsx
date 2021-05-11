// @ts-nocheck
import clsx from "clsx";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import ordersDummyData from "./orders.db.json";
import OrderCard from "./OrderCard";

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

  const orderInfo = ordersDummyData[0];

  useEffect(() => {
    if (!params.id) history.goBack();
  }, [params, history]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#fff" }}>
        <button
          onClick={history.goBack}
          className={clsx(classes.button_input, "px-2 py-2")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={classes.action_icons}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className={classes.title}>Order Details</div>

        <div className="font-bold text-sm bg-white rounded-lg px-3 py-1">
          <span className="font-normal text-sm text-gray-400"> ID:</span>{" "}
          {params.id}
        </div>
      </div>
      <div className="track-order grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
        <div className="flex items-center p-6  col-span-2 w-full  bg-white rounded-md shadow-sm  mb-5">
          <div className="mb-2 pb-1 w-full">
            <div className="font-semibold text-lg text-gray-600 pb-5">
              Order Information
            </div>
            <hr />
          </div>
        </div>

        <div className="flex items-center p-6  w-full  bg-white rounded-md mb-5">
          <div className="mb-2 pb-1 w-full">
            <div className="font-semibold text-lg text-gray-600 pb-5">
              Warehouse Detail
            </div>
          </div>
        </div>
      </div>

      <div className={"flex flex-col items-center justify-start"}>
        <OrderCard {...orderInfo} className={"w-full"} collapse={false} />
      </div>
    </div>
  );
};

export default OrderDetails;
