// @ts-nocheck
import clsx from "clsx";
import { AuthContext, AUTH_ACTIONS } from "Contexts/Auth";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, message, notification, Modal, Input, InputNumber } from "antd";
import { usePayment } from "Contexts/usePayment";

const Navbar = ({ menuList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState(100.0);
  const [paymentDescription, setPaymentDescription] = useState("");

  const { user, setAuth, wallet } = useContext(AuthContext);

  const { pathname } = useLocation();

  const { openPaymentWindow } = usePayment();

  useEffect(() => {
    const s1 = pathname.replace("/app/", "");
    const s2 = s1.split("/")[0];
    const page = s2.replace("/", "");
    setActiveMenu(page);
    console.log(user, wallet);
  }, [pathname]);

  const signOut = () => {
    setAuth(AUTH_ACTIONS.LOGOUT);
  };

  const getUserNameInitials = (name) =>
    name
      .split(" ")
      .map((x) => x.charAt(0))
      .join("")
      .substr(0, 2)
      .toUpperCase();

  return (
    <div>
      <nav className="bg-transparent">
        <div className="w-full flex-auto mx-auto px-4 sm:pr-6 lg:pr-14 h-20">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-auto"
                  src="/images/logo.png"
                  alt="Workflow"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div
                  className="flex flex-row pr-20 bg-white border border-gray-200 rounded-lg p-2 cursor-pointer hover:shadow-lg transition"
                  style={{ alignItems: "center" }}
                  onClick={() => {
                    user.type === "retailer" && setIsPaymentModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-center flex-shrink-0 h-7 w-7 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow mx-2">
                    <div className="text-sm text-gray-500">Wallet Balance</div>
                  </div>
                  <div className="font-bold text-lg text-gray-600">
                    {" "}
                    &#8377; {wallet}
                  </div>
                </div>

                <button className="mx-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none ">
                  <span className="sr-only">View notifications</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bell align-middle"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </button>

                <div className=" relative ">
                  <div>
                    <button
                      type="button"
                      className="max-w-xs bg-white text-gray-500  rounded-full flex items-center text-sm focus:outline-none hover:text-gray-700"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsOpen((p) => !p)}
                      // style={{
                      //   border: "1px solid #e2e2e2",
                      // }}
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
                      <Avatar
                        size="small"
                        style={{
                          margin: "5px",
                          // backgroundColor: "rgb(229,231,225)",
                          backgroundColor: "white",
                          color: "rgb(156,163,175)",
                          fontSize: "18px",
                          border: "1px solid rgba(156,163,175)",
                          fontWeight: 600,
                          verticalAlign: "middle",
                        }}
                      >
                        {getUserNameInitials(user.fname)}
                      </Avatar>

                      <div className="text-sm py-3  px-2 font-medium leading-none hover:text-gray-700">
                        {user.fname}
                      </div>
                    </button>
                  </div>
                  <div
                    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md z-30 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      isOpen ? "block" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      onClick={() => {
                        // console.log({ additionalInfo })
                      }}
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Wallet
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>

                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </Link>

                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={signOut}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsMainMenuOpen((p) => !p)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={clsx("block md:hidden bg-gray-700", {
            hidden: !isMainMenuOpen,
          })}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuList.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={clsx(
                  "hover:bg-gray-700 text-gray-300 block px-3 py-2 rounded-md text-base font-medium",
                  { "bg-gray-900 text-white": activeMenu === item.key }
                )}
              >
                {item.displayName}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div
                className="flex-shrink-0"
                onClick={() => setIsOpen((p) => !p)}
              >
                {/* <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> */}
                <Avatar
                  size="small"
                  style={{
                    margin: "5px",
                    // backgroundColor: "rgb(229,231,225)",
                    backgroundColor: "white",
                    color: "rgb(156,163,175)",
                    fontSize: "20px",
                    border: "1px solid rgba(156,163,175)",
                    fontWeight: "bold",
                    verticalAlign: "middle",
                  }}
                >
                  {getUserNameInitials(user.fname)}
                </Avatar>
              </div>
              <div className="ml-3" onClick={() => setIsOpen((p) => !p)}>
                <div className="text-base font-medium leading-none text-white">
                  {user.fname}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {user.email}
                </div>
              </div>
              <svg
                className={clsx("h-5 w-5 ml-2", { "rotate-180": isOpen })}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
            <div
              className={clsx("mt-3 px-2 space-y-1", {
                hidden: !isOpen,
                block: isOpen,
              })}
            >
              <Link
                to="#"
                onClick={() => {
                  // console.log({ additionalInfo });
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Wallet
              </Link>
              <Link
                to="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Your Profile
              </Link>
              <Link
                to="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Settings
              </Link>
              <Link
                to="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={signOut}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Modal
        title={<div className="flex gap-x-2">Wallet Recharge</div>}
        width={"100%"}
        visible={isPaymentModalOpen}
        onOk={() => {
          setIsPaymentModalOpen(false);
          openPaymentWindow({
            currency: "INR",
            amount: rechargeAmount,
            description: paymentDescription || "Wallet Recharge",
          })
            .then((resp) => {
              // console.log(resp);
              notification.success({
                placement: "topRight",
                description: "Wallet Recharge successfull",
                message: "Successfull",
              });
            })
            .catch((err) => {
              // console.error(err);
              message.error("Something went wrong. Please Try Again");
            });
        }}
        onCancel={() => {
          setIsPaymentModalOpen(false);
        }}
        style={{
          // width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "none",
          maxWidth: "520px",
          paddingBottom: "0px",
        }}
        bodyStyle={{
          boxShadow: "none",
          height: "100%",
        }}
        maskStyle={{ background: "#00000034" }}
      >
        <div className={"mb-2"}>Enter Amount to Recharge</div>
        <InputNumber
          value={rechargeAmount}
          placeholder={"Enter Amount"}
          size={"large"}
          step={10}
          min={1}
          max={99999}
          onChange={(e) => setRechargeAmount(parseFloat(e))}
        />

        <div className={"mt-6 mb-2"}>
          Description{" "}
          <span className={"text-xs text-gray-400 font-medium"}>
            (optional)
          </span>
        </div>
        <Input
          value={paymentDescription}
          placeholder={"Description"}
          size={"large"}
          onChange={(e) => setPaymentDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Navbar;
