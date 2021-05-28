// @ts-ignore
import OrderCard from "./OrderCard";
import { useContext, useEffect, useState } from "react";
import useAxios from "Contexts/useAxios";
import { AuthContext } from "Contexts/Auth";
import { notification, Spin } from "antd";

const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-4 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600 hidden md:block font-sans-apple-system",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
};

const ActionButton = ({ title, icon }) => {
  return (
    <button type="button" className={classes.button_input}>
      {icon}
      <span className={classes.button_title}>{title ?? "Button"}</span>
    </button>
  );
};

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const { axios } = useAxios();
  const {
    additionalInfo: { id: userid },
  } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/others/wholesalerOrders/" + userid).then((resp) => {
      const { orders, status, error } = resp.data;
      if (status === "success") {
        setOrderList(orders);
      } else {
        setOrderList([]);
        notification.error({
          message: error,
          duration: 3,
        });
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.title}>Orders</div>
        <div>
          <ActionButton
            title={"Bulk Import"}
            icon={
              <svg
                className={"h-4 w-4 mr-2"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          />
          <ActionButton
            title={"Export"}
            icon={
              <svg
                className={"h-4 w-4 mr-2"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            }
          />
        </div>
      </div>
      <Spin spinning={isLoading}>
        <div
          className={"overflow-y-auto overflow-x-hidden px-4 h-full flex-auto"}
        >
          {orderList.map((order) => (
            <OrderCard key={order.id} {...order} collapse={false} />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default Orders;
