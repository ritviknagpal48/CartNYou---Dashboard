import { LoadingOutlined } from "@ant-design/icons";
import { Button, Descriptions, InputNumber, Radio, Space, Spin } from "antd";
import { axiosInstance } from "Contexts/useAxios";
import { AuthContext } from "Contexts/Auth";
import React, { Component } from "react";
import "./PushToShopify.css";
import { addItemToLiveList } from "./PushToShopifyUtils";

export class PushToShopify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId:
        this.props && this.props.data && this.props.data.userid
          ? this.props.data.userid
          : "",
      userToken:
        this.props && this.props.data && this.props.data.token
          ? this.props.data.token
          : "",
      product_detail:
        this.props && this.props.data && this.props.data.product_id
          ? this.props.data.product_id
          : "",
      product_category:
        this.props && this.props.data && this.props.data.product_category
          ? this.props.data.product_category
          : "",
      productName:
        this.props && this.props.data && this.props.data.displayName
          ? this.props.data.displayName
          : "",
      quantity:
        this.props && this.props.data && this.props.data.quantity
          ? this.props.data.quantity
          : "",
      product_mrp:
        this.props && this.props.data && this.props.data.price
          ? this.props.data.price
          : "",
      retailer_price:
        this.props && this.props.data && this.props.data.price
          ? this.props.data.price
          : "",

      channelList: [],
      isfetching: true,
      currentPage: 1,
      pageSize: 4,
      selectedChannelID: "",
      value: 0,
      step: 1,
    };
  }

  async componentDidMount() {
    this.setState({
      step: 1,
      selectedChannelID: "",
      selectedChannel: "",
    });
    await axiosInstance
      .get(`/users/${this.state.userId}`, {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          channelList:
            response && response.data && response.data.retailer_shopify_channels
              ? response.data.retailer_shopify_channels
              : [],

          selectedChannelID:
            response &&
            response.data &&
            response.data.retailer_shopify_channels &&
            response.data.retailer_shopify_channels[0] &&
            response.data.retailer_shopify_channels[0].id
              ? response.data.retailer_shopify_channels[0].id
              : "",
          selectedChannel:
            response &&
            response.data &&
            response.data.retailer_shopify_channels &&
            response.data.retailer_shopify_channels[0]
              ? response.data.retailer_shopify_channels[0]
              : "",
          isfetching: false,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  handlePageChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
      pageSize: pageSize,
    });
  };

  onPriceChange = (e) => {
    if (!!e) {
      this.setState({ retailer_price: e });
    } else {
      this.setState({ retailer_price: this.state.product_mrp });
    }
  };

  onChannelChange = (e) => {
    const ch = this.state.channelList.find((x) => x.id === e.target.value);
    this.setState({
      selectedChannel: ch,
      selectedChannelID: e.target.value,
    });
  };

  handleNext = () => {
    this.setState({
      step: 2,
    });
  };
  handleBack = () => {
    this.setState({
      step: 1,
    });
  };
  render() {
    const {
      productName,
      channelList,
      isfetching,
      step,
      product_detail,
      product_mrp,
      quantity,
      userId,
      userToken,
      selectedChannel,
      retailer_price,
      product_category,
    } = this.state;

    const { onSuccess, onError, onBegin } = this.props;

    const channelListLength = channelList && channelList.length;
    // const index = (this.state.currentPage - 1) * this.state.pageSize;

    // const radioStyle = {
    //   display: "block",
    //   border: "1px solid #"
    //   height: "30px",
    //   lineHeight: "30px",
    // };

    if (step === 1) {
      return (
        <div className="addtochannel">
          <span>Select a channel to add</span>
          <hr style={{ margin: "10px 0px", borderColor: "transparent" }} />
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} />
            }
            spinning={isfetching}
          >
            {channelList && channelList.length ? (
              <div>
                <Radio.Group
                  onChange={this.onChannelChange}
                  value={this.state.selectedChannelID}
                  style={{ width: "100%" }}
                >
                  {channelList
                    //   .slice(index, index + this.state.pageSize)
                    .map((data, index) => {
                      return (
                        <Radio
                          key={index}
                          // style={radioStyle}
                          checked={index === 0}
                          value={data.id}
                          className={`channel-info-card ${
                            this.state.selectedChannelID === data.id
                              ? `selected`
                              : ``
                          } `}
                        >
                          <div

                          // onClick={() => {
                          //   this.setState({
                          //     selectedChannel: !this.state.selectedChannel,
                          //   });
                          // }}
                          >
                            <div
                              className={"text-gray-400"}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                fontsize: "13px",
                                fontWeight: 500,
                                width: "100%",
                                marginLeft: "8px",
                              }}
                            >
                              <div className="card-detail ">
                                <div className="head-title">Channel Name</div>
                                <div className="title-body font-bold">
                                  {data.channel_name}
                                </div>
                              </div>
                              {/* <div className="card-detail">
                              <div className="head-title">Store URL</div>
                              <div className="title-body">{data.store_url}</div>
                            </div>
                           */}
                            </div>
                          </div>
                        </Radio>
                      );
                    })}
                </Radio.Group>
                <hr
                  style={{ margin: "10px 10px", borderColor: "transparent" }}
                />
                {/* <Pagination
                total={channelListLength}
                defaultCurrent={1}
                // pageSizeOptions={[2, 5, 8]}
                pageSize={this.state.pageSize}
                current={this.state.currentPage}
                onChange={this.handlePageChange}
                // showSizeChanger
                // showQuickJumper
                responsive
                style={{ textAlign: "center" }}
                // showTotal={(total) => `Total ${total} products`}
              /> */}
              </div>
            ) : (
              <>No channel found</>
            )}
          </Spin>

          {channelListLength && channelListLength > 0 ? (
            <div style={{ textAlign: "right", width: "100%" }}>
              <Button
                onClick={this.handleNext}
                style={{
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 25px",
                  border: "1px solid transparent",
                  float: "right",
                  // width: "33%",
                }}
              >
                Next
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }

    console.log({
      retailer_price,
      product_detail,
      selectedChannel,
      wholesaler_name: this.context.user.fname,
      product_category,
    });
    if (step === 2) {
      return (
        <div className="addtochannel" style={{ cursor: "default" }}>
          {/* <span>Confirm product details</span> */}
          {/* <hr style={{ margin: "10px 0px", borderColor: "transparent" }} /> */}

          <Descriptions
            title="Confirm product details"
            bordered
            layout={"horizontal"}
            column={1}
            style={{ borderRadius: "8px" }}
          >
            <Descriptions.Item label="Product Name">
              {productName}
            </Descriptions.Item>
            <Descriptions.Item label="Available Quantity">
              {quantity}
            </Descriptions.Item>
            <Descriptions.Item label="Product MRP">
              &#8377; {product_mrp}
            </Descriptions.Item>
          </Descriptions>

          <div>
            <div
              className=" font-bold"
              style={{
                color: "#000000d9",
                fontSize: "16px",
                margin: "20px 0px",
              }}
            >
              Update Price
            </div>

            <div
              style={{
                display: "flex",
                flexdirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  background: "#fafafa",
                  minWidth: "209px",
                  borderRight: "1px solid #f0f0f0",
                }}
              >
                Update product price
              </div>
              <div
                style={{
                  padding: "0px 24px",
                  display: "flex",
                  alignItems: "center",
                  //   background: "#fafafa",
                  //   width: "100%",
                }}
              >
                <span style={{ fontSize: "18px", marginRight: "6px" }}>
                  &#8377;
                </span>

                <InputNumber
                  required
                  min={0}
                  defaultValue={product_mrp}
                  onChange={this.onPriceChange}
                ></InputNumber>
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#787878",
                margin: "12px 0px 20px",
              }}
            >
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                *
              </span>{" "}
              Add the updated price before publishing the product to shopify.
              Default price will be product MRP. You won't be able to change it
              later.
            </div>
          </div>
          <Space direction="horizontal" style={{ float: "right" }}>
            <Button
              onClick={this.handleBack}
              style={{
                background: "#fff",
                color: "#ef4444",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                padding: "4px 25px",
                border: "1px solid #ef4444",
                //   float: "right",
                // width: "33%",
              }}
            >
              Back
            </Button>
            <Button
              onClick={(e) => {
                onBegin && onBegin();
                addItemToLiveList(
                  userId,
                  { retailer_price, product_detail },
                  userToken,
                  selectedChannel
                )
                  .then(() => {
                    onSuccess && onSuccess(product_detail);
                  })
                  .catch(() => onError && onError());
              }}
              style={{
                background: "#ef4444",
                color: "white",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                padding: "4px 25px",
                border: "1px solid transparent",
                float: "right",
                // width: "33%",
              }}
            >
              Publish
            </Button>
            {/* </div> */}
          </Space>
        </div>
      );
    }
  }
}

PushToShopify.contextType = AuthContext;
export default PushToShopify;
