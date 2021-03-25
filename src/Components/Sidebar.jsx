import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const classes = {
  wrapper: "w-max bg-white shadow-md",
  wrapper_inner: "flex flex-col items-start justify-flex-start  ",
  menu_item:
    "w-full text-normal font-bold pl-6 pr-14 py-2 my-2 flex flex-row items-center justify-start font-sans-apple-system",
  menu_active: " text-red-400 hover:text-red-400",
  menu_normal: "text-gray-600  hover:text-red-400",
};

const Sidebar = ({ className }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    const page = pathname.split("/app")[1].split("/")[1].replace("/", "");
    setActiveMenu(page);
  }, [pathname]);

  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className="flex items-center" style={{ maxWidth: "180px" }}>
        <div className="logo" style={{ padding: "12px", margin: "20px 2px" }}>
          <img width="130px" src="/images/logo.png" alt="Workflow" />
        </div>
      </div>
      <div className={classes.wrapper_inner}>
        <Link
          to="/app/dashboard"
          className={clsx(classes.menu_item, {
            [classes.menu_active]: activeMenu === "dashboard",
            [classes.menu_normal]: activeMenu !== "dashboard",
          })}
        >
          <svg
            className={"h-5 w-5 mr-2"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/app/products"
          className={clsx(classes.menu_item, {
            [classes.menu_active]: activeMenu === "products",
            [classes.menu_normal]: activeMenu !== "products",
          })}
        >
          <svg
            className={"h-5 w-5 mr-2"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Products</span>
        </Link>
        <Link
          to="/app/orders"
          className={clsx(classes.menu_item, {
            [classes.menu_active]: activeMenu === "orders",
            [classes.menu_normal]: activeMenu !== "orders",
          })}
        >
          <svg
            className={"h-5 w-5 mr-2"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span>Orders</span>
        </Link>
        <Link
          to="/app/shipment-details"
          className={clsx(classes.menu_item, {
            [classes.menu_active]: activeMenu === "shipment",
            [classes.menu_normal]: activeMenu !== "shipment",
          })}
        >
          <svg
            className={"h-5 w-5 mr-2"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span>Shipment</span>
        </Link>
        <Link
          to="/app/reports"
          className={clsx(classes.menu_item, {
            [classes.menu_active]: activeMenu === "reports",
            [classes.menu_normal]: activeMenu !== "reports",
          })}
        >
          <svg
            className={"h-5 w-5 mr-2"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Reports</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
