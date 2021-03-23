import React from "react";
import ProductTable from "./ProductTable";
import AddProductForm from "../../Components/AddProductformComponent/AddProductForm";
import { Button, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dummy_data from "./products.db.json";
import { Link } from "react-router-dom";

const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const ActionButton = ({ title, icon }) => {
  return (
    <button type="button" className={classes.button_input}>
      {icon}
      <span className={classes.button_title}>{title ?? "Button"}</span>
    </button>
  );
};

const Products = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#f2f3f3" }}>
        <div className={classes.title}>Products</div>
        <div className={classes.buttons}>
          <Link
            to="/app/add-new-product"
            className={`${classes.button_input} hover:text-red-400`}
          >
            <svg
              className={classes.action_icons}
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
            </svg>
            <span className={classes.button_title}>Add new product</span>
          </Link>
          {/* <button
            onClick={() => setShowModal(true)}
            className={classes.button_input}
          >
            <svg className={classes.action_icons} viewBox="0 0 20 20">
              <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
            </svg>
            Add new product
          </button> */}
          <button
            onClick={() => setShowModal(true)}
            className={classes.button_input}
          >
            <svg
              className={classes.action_icons}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Import Inventory
          </button>
          <ActionButton
            title={"Export"}
            icon={
              <svg
                className={classes.action_icons}
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
            title={"Import"}
            icon={
              <svg
                className={classes.action_icons}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          />
          <ActionButton
            title={"Delete"}
            icon={
              <svg
                className={classes.action_icons}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            }
          />

          {/* <ActionButton
            title={'Add'}
            icon={
              <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            }
          /> */}
        </div>
      </div>

      <div className={"mt-4 overflow-y-auto overflow-x-hidden"}>
        <ProductTable heading={Object.keys(dummy_data[0])} rows={dummy_data} />
      </div>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>

      {/* {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-4/5">
              {/*content*
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header/}
                <div className="flex items-start text-black justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3l font-semibold">Add New Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-7 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-8 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body/}
                <div
                  className="relative p-6 flex-auto"
                  style={{ minHeight: "400px" }}
                >
                  <AddProductForm />
                </div>
                {/*footer*}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} */}
    </div>
  );
};

export default Products;
