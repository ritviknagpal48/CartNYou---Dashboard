import { message, Modal, Space, Button, Empty, Checkbox } from "antd";
import { AuthContext } from "Contexts/Auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { removeItemFromImportList } from "./importListUtils";
import PushToShopify from "Components/Retailer/PushToShopify";

import ShopifyIcon from "../../../assets/shopify.svg";
// import { useState } from 'react'

const classes = {
  wrapper:
    "grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-0 items-center justify-start mt-4 bg-white rounded-md shadow-lg py-4",
};

const ImportListCard = ({
  product_name: displayName,
  qunatity: quantity,
  product_mrp: price,
  images,
  id: product_id,
  onDeleted,
  onSelected,
  // id: prodId
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showPushToShopifyModal, setshowPushToShopifyModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const {
    additionalInfo: { id: userid },
    token,
  } = useContext(AuthContext);

  return (
    <div className={"relative"}>
      <div className={"absolute"} style={{ left: "1.5rem", top: "0.5rem" }}>
        <Checkbox
          className={"focus:outline-none text-red-500 border-red-400"}
          onChange={(e) => {
            setIsSelected(e.target.checked);
            if (!!onSelected && typeof onSelected === "function") {
              onSelected(product_id, e.target.checked);
            }
          }}
        />
      </div>
      <div className={"mb-2 ml-3"}>
        <div className="bg-white my-2 text-gray-700 border border-gray-200 text-left font-medium text-base px-4 py-3 rounded-xl shadow-lg grid grid-cols-2 items-center  w-full  md:grid-cols-5">
          <div className="card-detail">
            <div className="title-body">
              {" "}
              {images && images.length > 0 ? (
                <img
                  className={"w-full h-auto rounded-md "}
                  src={images[0].url}
                  alt={displayName}
                  style={{ width: 74, margin: "auto" }}
                />
              ) : (
                <Empty
                  // className={"text-sm"}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"No Image"}
                  imageStyle={{ height: "52px" }}
                  style={{ margin: "2px" }}
                />
              )}
            </div>
          </div>
          <div className="card-detail">
            <div className="head-title">Product Name</div>
            <div className="title-body">{displayName}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Quantity</div>
            <div className="title-body">{quantity}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Price</div>
            <div className="title-body">{price}</div>
          </div>
          <div className="action card-detail">
            <Space size="small" direction="vertical">
              <Link
              // to={{
              //   pathname: `/retailer/edit-channel/${ChannelData.id}`,
              //   // search: `?id=${data.id}`,
              //   state: {
              //     edit: true,
              //     channelData: ChannelData,
              //   },
              // }}
              >
                <Button
                  type="primary"
                  disabled={isSelected}
                  onClick={() => setshowPushToShopifyModal(true)}
                  style={{
                    color: " #08979c",
                    background: "#e6fffb",
                    borderColor: "#87e8de",
                    borderRadius: "6px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={<SendOutlined />}
                >
                  Push Item
                </Button>
              </Link>
              <Button
                style={{
                  color: "#ef4444",
                  background: "#fff0f6",
                  borderColor: "#f1a8a8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: "6px",
                }}
                type="primary"
                onClick={() => {
                  setShowModal(true);
                }}
                icon={<DeleteOutlined />}
              >
                Delete Item
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <Modal
        title={<div className="flex gap-x-2">Remove from Import List</div>}
        width={"100%"}
        visible={showModal}
        confirmLoading={isProductAdded}
        onOk={(e) => {
          setIsProductAdded(true);
          removeItemFromImportList(userid, product_id, token)
            .then(() => {
              message.success("Product removed successfully");
              if (!!onDeleted && typeof onDeleted === "function")
                onDeleted(product_id);
              setShowModal(false);
              setIsProductAdded(false);
            })
            .catch((err) => {
              message.error(err.message);
              setShowModal(false);
              setIsProductAdded(false);
            });
        }}
        onCancel={() => setShowModal(false)}
        style={{
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
        Remove <span className="font-semibold">{displayName}</span> from your
        import list?
        <br />
        <br />
        <span className="text-gray-400 font-normal text-sm">
          Once removed, it cannot be recovered.
        </span>
      </Modal>

      <Modal
        title={
          <div
            className="flex gap-x-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={ShopifyIcon} style={{ height: "28px" }} />
            Publish to shopify
          </div>
        }
        width={"100%"}
        visible={showPushToShopifyModal}
        footer={null}
        // confirmLoading={isProductAdded}
        // onOk={(e) => {
        //   setIsProductAdded(true);
        // removeItemFromImportList(userid, product_id, token)
        //   .then(() => {
        //     message.success("Product removed successfully");
        //     if (!!onDeleted && typeof onDeleted === "function")
        //       onDeleted(product_id);
        //     setShowModal(false);
        //     setIsProductAdded(false);
        //   })
        //   .catch((err) => {
        //     message.error(err.message);
        //     setShowModal(false);
        //     setIsProductAdded(false);
        //   });
        // }}

        onCancel={() => setshowPushToShopifyModal(false)}
        style={{
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
        <PushToShopify
          data={{ userid, token, product_id, displayName, quantity, price }}
        />
        {/* Select a channel to add the product */}
        <br />
        <br />
        {/* <span className="text-gray-400 font-normal text-sm">
          Once removed, it cannot be recovered.
        </span> */}
      </Modal>
    </div>
  );
};

export default ImportListCard;
