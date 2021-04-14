import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  LeftOutlined,
  PlusCircleOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import Flipkart from "../../../assets/flipkart.png";
import Amazon from "../../../assets/amazon.png";
import Shopify from "../../../assets/shopify.png";
import "./ChannelList.css";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
  header:
    "w-full  pt-3 pb-2 md:pr-14 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 shadow-lg bg-white hover:text-red-400 hover:border hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-6 w-6",
  button_title: "hidden md:block",
};

const ChannelData = [
  {
    id: "1",
    channelImage: "",
    channelName: "Orivial_Channel",
    storeName: "",
  },
  {
    id: "2",
    channelImage: "",
    channelName: "Womenora_Online",
    storeName: "",
  },
  {
    id: "3",
    channelImage: "",
    channelName: "Pentanic_Channel",
    storeName: "",
  },
  {
    id: "4",
    channelImage: "",
    channelName: "Watcha_Channel",
    storeName: "",
  },
];
export class ChannelList extends Component {
  state = {
    AddChannelModal: false,
    selectedShopify: false,
  };
  showModal = () => {
    this.setState({
      AddChannelModal: true,
    });
  };
  handleOk = () => {
    this.setState({
      AddChannelModal: false,
    });
  };

  handleAddNewChannel = () => {
    if (this.state.selectedShopify) {
      this.props.history.push("/retailer/add-new-channel/shopify");
    } else {
      message.info("Please select a channel to add");
    }
  };

  handleCancel = () => {
    this.setState({
      AddChannelModal: false,
      selectedShopify: false,
    });
  };
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ background: "#edf2f9" }}>
          <div className="flex " style={{ alignItems: "center" }}>
            <button
              className={
                "mx-4  px-3 py-2 text-gray-600 bg-white rounded-full shadow-lg focus:outline-none"
              }
              onClick={() => this.props.history.goBack()}
            >
              <LeftOutlined />
            </button>

            <div className={classes.title}>Channel List</div>
          </div>
          <div className={classes.buttons}>
            <button
              onClick={this.showModal}
              className={`${classes.button_input} hover:text-red-400`}
            >
              {/* {ActionIcon} */}
              <PlusCircleOutlined
                style={{ fontSize: "16px", marginRight: "5px" }}
              />
              <span className={classes.button_title}>Add New Channel</span>
            </button>
          </div>
        </div>

        <div className="body pr-4 md:pr-14 pl-4">
          <hr style={{ margin: "20px 10px", borderColor: "#dfdfdf" }} />
          {ChannelData ? (
            ChannelData.map((ChannelData, index) => {
              return (
                <div
                  key={index}
                  className="bg-white my-2 text-gray-700 text-left font-medium text-base px-4 py-3 rounded-xl shadow-lg grid grid-cols-2 gap-2 items-center md:justify-between w-full  md:flex md:flex-row"
                >
                  <div className="card-detail">
                    <div className="head-title">#Channel Id</div>
                    <div className="title-body"> {ChannelData.id}</div>
                  </div>
                  <div className="card-detail">
                    <div className="head-title">Channel Image</div>
                    <div className="title-body">
                      {" "}
                      {ChannelData.channelImage ? (
                        <img
                          src={ChannelData.channelImage}
                          alt={ChannelData.channelName}
                        />
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                  <div className="card-detail">
                    <div className="head-title">Channel Name</div>
                    <div className="title-body">{ChannelData.channelName}</div>
                  </div>
                  <div className="card-detail">
                    <div className="head-title">Store Name</div>
                    <div className="title-body">
                      {ChannelData.storeName ? ChannelData.storeName : "-"}
                    </div>
                  </div>
                  <div className="action card-detail justify-self-center mx-auto md:mx-0 col-span-2">
                    <div className={"head-title text-center"}>Actions</div>
                    <Space size="small">
                      <Button
                        type="primary"
                        style={{
                          color: " #08979c",
                          background: "#e6fffb",
                          borderColor: "#87e8de",
                          borderRadius: "6px",
                        }}
                        icon={<EditOutlined />}
                      >
                        Edit Channel
                      </Button>
                      <Button
                        style={{
                          color: "#ef4444",
                          background: "#fff0f6",
                          borderColor: "#f1a8a8",
                          borderRadius: "6px",
                        }}
                        type="primary"
                        // onClick={() => this.showModal(data.id)}
                        icon={<DeleteOutlined />}
                      >
                        Delete Channel
                      </Button>
                    </Space>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <Modal
          title={
            <div className="flex gap-x-2">
              {/* <ExclamationCircleOutlined
                size={"large"}
                style={{
                  color: "red",
                }}
              />{" "} */}
              Add New Channel
            </div>
          }
          width={"100%"}
          visible={this.state.AddChannelModal}
          onOk={this.handleAddNewChannel}
          onCancel={this.handleCancel}
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
          <div>
            <p>Choose from the below option to add a new channel</p>
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2">
              <div
                className="modal-image-card"
                onClick={() => {
                  this.setState({
                    selectedShopify: !this.state.selectedShopify,
                  });
                }}
              >
                <div className="modal-check">
                  <CheckCircleOutlined
                    style={{
                      fontSize: "22px",
                      color: `${
                        this.state.selectedShopify ? "#2dd02d" : "#dfdfdf"
                      }`,
                    }}
                  />
                </div>
                <img width="80%" src={Shopify} alt="Shopify" />
              </div>
              {/* <div
                className="modal-image-card"
                onClick={() =>
                  message.info("Amazon feature will be available soon")
                }
              >
                <img width="100%" src={Amazon} alt="Amazon" />
              </div>
              <div className="modal-image-card">
                <img width="100%" src={Flipkart} alt="Flipkart" />
              </div> */}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ChannelList);
