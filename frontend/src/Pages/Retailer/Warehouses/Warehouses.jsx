// @ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Empty, message, Spin } from "antd";
import clsx from "clsx";
import { AuthContext } from "Contexts/Auth";
import useAxios from "Contexts/useAxios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const classes = {
  wrapper: "w-full pr-14 pl-4",
  card_item: "h-full px-4 py-2 flex-auto font-bold text-sm",
  card:
    "bg-white my-2 text-gray-700 font-medium text-base px-4 py-4 rounded-md shadow-lg flex flex-row items-center justify-start w-full text-left divide-x divide-red-300 font-sans-apple-system",
  tiny_header: "block w-full mb-2 text-xs text-gray-400 font-normal",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  button_title: "hidden md:block",
};

const WarehouseCards = ({
  name,
  address_1,
  address_2,
  contact_name,
  contact_number,
  pickup,
  rto,
}) => {
  return (
    <div className={classes.card}>
      <span className={clsx(classes.card_item, "w-2/12")}>
        <span className={classes.tiny_header}>Warehouse</span>
        <span className={"block w-full font-medium"}>{name}</span>
      </span>
      <span className={clsx(classes.card_item, "w-3/12")}>
        <span className={classes.tiny_header}>Contact</span>
        <span className={"block w-full font-medium"}>{contact_name}</span>
        <span
          className={
            "block w-full font-medium text-xs text-gray-400 uppercase mt-1"
          }
        >
          {contact_number}
        </span>
      </span>
      <span className={clsx(classes.card_item, "w-6/12")}>
        <span className={classes.tiny_header}>Address</span>
        <span className={"block w-full font-medium"}>{address_1}</span>
        <span className={"block w-full font-medium"}>{address_2}</span>
      </span>
      <span
        className={clsx(
          classes.card_item,
          "w-1/12 flex flex-row justify-around items-center h-full"
        )}
      >
        {/* <span className={classes.tiny_header}>Edit</span> */}
        <EditOutlined
          className="text-red-500"
          onClick={() => message.info("Feature Coming Soon.")}
        />
        <DeleteOutlined
          className="text-red-500"
          onClick={() => message.info("Feature Coming Soon.")}
        />
      </span>
    </div>
  );
};

WarehouseCards.defaultProps = {
  name: "Warehouse Name",
  address: "Warehouse Address",
  contact: "Contact Person",
  pickup: true,
  rto: true,
};

const Warehouses = () => {
  const [warehouseList, setWarehouseList] = useState(null);

  const {
    additionalInfo: { id: userid },
  } = useContext(AuthContext);
  const { axios, isLoading } = useAxios();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/warehouses?user=${userid}`)
      .then((res) => res.data)
      .then(setWarehouseList)
      .catch((err) => message.error(err.message));
  }, []);

  return (
    <div className={classes.wrapper}>
      <div
        className="w-full  py-3 flex flex-row items-center justify-between"
        style={{ background: "#fff" }}
      >
        <div className="text-2xl text-gray-600  hidden md:block font-sans-apple-system">
          Warehouses
        </div>
        <div className="flex flex-row justify-end items-center">
          <div className={classes.buttons}>
            <button
              onClick={() =>
                history.push("/retailer/add-warehouse", {
                  edit: false,
                  initalValues: {},
                })
              }
              className={`${classes.button_input} hover:text-red-400`}
            >
              {/* {ActionIcon} */}
              <PlusCircleOutlined
                style={{ fontSize: "16px", marginRight: "5px" }}
              />
              <span className={classes.button_title}>Add New Warehouse</span>
            </button>
          </div>
        </div>
      </div>
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined color="primary" />}
      >
        <div className="flex flex-col items-start justify-start">
          {warehouseList && warehouseList.length ? (
            warehouseList.map((wh) => {
              return <WarehouseCards {...wh} />;
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default Warehouses;
