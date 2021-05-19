// @ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Empty, message, Modal, Pagination, Space, Spin } from "antd";
import clsx from "clsx";
import { AuthContext } from "Contexts/Auth";
import useAxios from "Contexts/useAxios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const classes = {
  wrapper: "w-full pr-14 pl-4",
  card_item: "h-full px-4 py-2 flex-auto font-bold text-sm",
  card: "bg-white my-2 text-gray-700 font-medium text-base px-4 py-4 rounded-xl border border-gray-200 shadow-lg md:flex md:flex-row grid grid-cols-1 items-start justify-start w-full text-left font-sans-apple-system",
  tiny_header: "block w-full mb-2 text-xs text-gray-400 font-normal",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  button_title: "hidden md:block",
};

const WarehouseCards = (props) => {
  const {
    id,
    name,
    address_1,
    address_2,
    contact_name,
    contact_number,
    pincode,
    city,
    state,
    gst_number,
  } = props;

  const { axios, isLoading } = useAxios();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className={classes.card}>
      <span className={clsx(classes.card_item, "md:w-2/12 w-full")}>
        <span className={classes.tiny_header}>Warehouse</span>
        <span className={"block w-full font-medium"}>{name}</span>
      </span>
      <span className={clsx(classes.card_item, "md:w-3/12 w-full")}>
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
      <span className={clsx(classes.card_item, "md:w-6/12 w-full")}>
        <span className={classes.tiny_header}>Address</span>
        <span className={"block w-full font-medium"}>{address_1}</span>
        <span className={"block w-full font-medium"}>{address_2}</span>
        <span className={"block w-full font-medium"}>{pincode}</span>
      </span>
      <span className={classes.card_item}>
        <Space size="small" direction="vertical">
          <Link
            to={{
              pathname: `/wholeseller/update-warehouse`,
              state: {
                edit: true,
                initalValues: {
                  id,
                  name,
                  address_1,
                  address_2,
                  contact_name,
                  contact_number,
                  city,
                  state,
                  pincode,
                  gst_number,
                },
              },
            }}
          >
            <Button
              type="primary"
              style={{
                color: " #08979c",
                background: "#e6fffb",
                borderColor: "#87e8de",
                borderRadius: "6px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              icon={<EditOutlined />}
            >
              Edit Warehouse
            </Button>
          </Link>
          <Button
            style={{
              color: "#ef4444",
              background: "#fff0f6",
              borderColor: "#f1a8a8",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              borderRadius: "6px",
            }}
            type="primary"
            onClick={() => setModalVisible(true)}
            icon={<DeleteOutlined />}
          >
            Delete Warehouse
          </Button>
        </Space>
      </span>
      <Modal
        title={
          <div className="flex gap-x-2">
            <ExclamationCircleOutlined
              size={"large"}
              style={{
                color: "red",
              }}
            />{" "}
            Confirm Delete
          </div>
        }
        visible={modalVisible}
        onOk={() =>
          axios
            .delete("/warehouses/" + id)
            .then(() => {
              message.success(`Warehouse '${name}' Deleted Successfully`);
              setModalVisible(false);
            })
            .catch(() => {
              message.error(`Failed to delete warehouse. Please try again.`);
            })
        }
        onCancel={() => setModalVisible(false)}
        confirmLoading={isLoading}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "none",
          maxWidth: "460px",
          paddingBottom: "0px",
        }}
        bodyStyle={{
          boxShadow: "none",
          height: "100%",
        }}
        maskStyle={{ background: "#00000034" }}
      >
        <p>Warehouse once deleted can not be recovered again.</p>
      </Modal>
    </div>
  );
};

const Warehouses = () => {
  const [warehouseList, setWarehouseList] = useState(null);
  const [pagination, setPagination] = useState({ pageSize: 3, currentPage: 1 });

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
                history.push("/wholeseller/add-warehouse", {
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
        <div className={`flex flex-col items-start w-full justify-start`}>
          {warehouseList && warehouseList.length ? (
            warehouseList.map((wh) => {
              return <WarehouseCards {...wh} />;
            })
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="flex-auto"
              style={{ marginRight: "auto", marginLeft: "auto" }}
            />
          )}
          <div className="flex flex-row justify-end w-full mt-4">
            <Pagination
              total={
                warehouseList && warehouseList.length ? warehouseList.length : 0
              }
              defaultCurrent={1}
              pageSizeOptions={[3, 6, 10]}
              pageSize={pagination.pageSize}
              current={pagination.currentPage}
              onChange={(page, pageSize) =>
                setPagination({
                  currentPage: page,
                  pageSize,
                })
              }
              showSizeChanger
              // showQuickJumper
              responsive
              style={{ textAlign: "center" }}
              showTotal={(total) => `Total ${total} Warehouses`}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Warehouses;
