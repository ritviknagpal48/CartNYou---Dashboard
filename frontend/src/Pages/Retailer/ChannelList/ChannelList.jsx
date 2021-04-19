import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  LeftOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Empty, message, Pagination, Space, Spin } from "antd";
import { axiosInstance as axios } from "Contexts/useAxios";
import Modal from "antd/lib/modal/Modal";
import Shopify from "../../../assets/shopify.png";
import "./ChannelList.css";
import { AuthContext } from "Contexts/Auth";

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

export class ChannelList extends Component {
  state = {
    AddChannelModal: false,
    selectedShopify: false,
    ChannelData: [],
    isfetching: true,
    deleteProductModal: false,
    deleteProductID: "",
    currentPage: 1,
    pageSize: 4,
  };

  async componentDidMount() {
    await axios
      .get(
        `/shopifychannels?retailersdetails=${this.context.additionalInfo.id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
          },
        }
      )
      .then((res) => {
        this.setState({
          ChannelData: res.data,
          isfetching: false,
        });
      })
      .catch((err) => {
        message.error(err.message);
        this.setState({ isfetching: false });
      });
  }
  deleteModal = (data) => {
    this.setState({
      deleteProductModal: true,
      deleteProductID: data,
    });
  };

  handleOk = () => {
    this.setState({
      deleteProductModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      deleteProductModal: false,
    });
  };

  confirmDelete = () => {
    this.setState({
      isfetching: true,
    });
    if (this.state.deleteProductID !== "") {
      axios
        .delete(`/shopifychannels/${this.state.deleteProductID}`)
        .then((res) => {
          this.setState({
            isfetching: false,
            deleteProductID: "",
            deleteProductModal: false,
          });
          message.success("Channel deleted successfully");
          this.componentDidMount();
        })
        .catch((err) => {
          // message.error(err.message);
        });
    }
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

  handlePageChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
      pageSize: pageSize,
    });
  };

  render() {
    const { ChannelData } = this.state;
    const channelListLength = ChannelData && ChannelData.length;
    const index = (this.state.currentPage - 1) * this.state.pageSize;
    ChannelData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ background: "#fff" }}>
          <div className="flex " style={{ alignItems: "center" }}>
            <button
              className={
                "mx-4  px-3 py-2 text-gray-600 border border-gray-200 bg-white rounded-full shadow-lg focus:outline-none"
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
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />
          }
          spinning={this.state.isfetching}
        >
          <div className="body pr-4 md:pr-14  pl-4">
            <hr style={{ margin: "20px 10px", borderColor: "#dfdfdf" }} />
            {ChannelData && ChannelData.length ? (
              <div style={{ marginBottom: "50px" }}>
                <div>
                  {ChannelData.slice(index, index + this.state.pageSize).map(
                    (ChannelData, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-white my-2 text-gray-700 border border-gray-200 text-left font-medium text-base px-4 py-3 rounded-xl shadow-lg grid grid-cols-2  items-center  w-full  md:grid-cols-5"
                        >
                          <div
                            className="card-detail"
                            style={{ maxWidth: "90px" }}
                          >
                            <div className="head-title">#Channel Id</div>
                            <div className="title-body"> {index + 1}</div>
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
                            <div className="title-body">
                              {ChannelData.channel_name}
                            </div>
                          </div>
                          <div className="card-detail">
                            <div className="head-title">Store Name</div>
                            <div className="title-body">
                              {ChannelData.storeName
                                ? ChannelData.store_name
                                : "-"}
                            </div>
                          </div>
                          <div className="action card-detail">
                            {/* <div className={"head-title text-center"}>
                              Actions
                            </div> */}
                            <Space size="small" direction="vertical">
                              <Link
                                to={{
                                  pathname: `/retailer/edit-channel/${ChannelData.id}`,
                                  // search: `?id=${data.id}`,
                                  state: {
                                    edit: true,
                                    channelData: ChannelData,
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
                                    justifyContent: "center",
                                  }}
                                  icon={<EditOutlined />}
                                >
                                  Edit Channel
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
                                onClick={() => this.deleteModal(ChannelData.id)}
                                icon={<DeleteOutlined />}
                              >
                                Delete Channel
                              </Button>
                            </Space>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <hr style={{ margin: "25px 10px" }} />
                {channelListLength < 4 ? (
                  <></>
                ) : (
                  <Pagination
                    total={channelListLength}
                    defaultCurrent={1}
                    pageSizeOptions={[2, 4, 10, 20]}
                    pageSize={this.state.pageSize}
                    current={this.state.currentPage}
                    onChange={this.handlePageChange}
                    showSizeChanger
                    // showQuickJumper
                    responsive
                    style={{ textAlign: "center" }}
                    // showTotal={(total) => `Total ${total} products`}
                  />
                )}
              </div>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 80,
                }}
                description={<span>No Channels to display</span>}
              ></Empty>
            )}
          </div>
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
            visible={this.state.deleteProductModal}
            onOk={this.confirmDelete}
            onCancel={() => this.setState({ deleteProductModal: false })}
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
            <p>Product once deleted can not be recovered again.</p>
          </Modal>
        </Spin>
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
ChannelList.contextType = AuthContext;
export default withRouter(ChannelList);
