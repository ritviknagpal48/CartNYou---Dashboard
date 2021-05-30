import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Descriptions, Form, Input, Popover, Radio, Select } from "antd";
import { AuthContext } from "Contexts/Auth";
import { fetchDetails, validate } from "ifsc";
import { capitalize, throttle } from "lodash";
import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import UploadSingleImage from "../../Components/SingleImageUpload";
import "./kyc.css";

const classes = {
  wrapper: "mx-auto md:mx-0 md:pr-4  pl-4 ",
  header:
    "w-full  pt-3 pb-2 md:pr-14 flex flex-row items-center justify-between",
  title:
    "text-xl text-gray-600 hidden md:block font-sans-apple-system flex items-center justify-start",
  buttons: "flex item-center flex-row justify-end items-center",
  button_input:
    "inline-flex items-center px-5 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-white  shadow-lg bg-white hover:text-red-500  bg-red-500 hover:bg-red-100 hover:border hover:border-red-300 focus:outline-none",
  button_cancel:
    "inline-flex items-center px-5 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-gray-700 border  shadow-lg bg-white text-red-400 border-red-400 hover:text-red-500 focus:outline-none hover:bg-red-100 hover:border hover:border-red-100 ",

  action_icons: "md:-ml-1 md:mr-2 h-6 w-6",
  button_title: "hidden md:block",
  icon_title: "block md:hidden",
};

const AdditionalID = [
  {
    key: "adhaar",
    label: "Adhaar",
    value: "adhaar",
    target: "individual",
  },
  {
    key: "passport",
    label: "Passport",
    value: "passport",
    target: "individual",
  },
  {
    key: "driving_licence",
    label: "Driving Licence",
    value: "driving_licence",
    target: "individual",
  },
  {
    key: "company_registration_certificate",
    label: "Company Registration Certificate",
    value: "company_registration_certificate",
    target: "company",
  },
  {
    key: "gst_number",
    label: "GST Number",
    value: "gst_number",
    target: "company",
  },
];

// const { Option } = Select;

class kyc extends Component {
  accountFormRef = null;
  documentFormRef = null;
  add_item_ref = null;

  throttledValueChanged = () => {};
  throttledValidator = () => {};

  constructor(props, context) {
    super(props);

    this.accountFormRef = createRef();
    this.documentFormRef = createRef();
    this.add_item_ref = createRef();

    this.state = {
      user: context.additionalInfo.id,
      account_holder: "",
      account_number: "",
      cnfm_account_number: "",
      ifsc_code: "",
      bank_details: null,
      cancelled_cheque_url: "",
      category: "unknown",
      pan_id_number: "",
      pan_id_url: "",
      pan_id_type: "",

      add_id_number: "",
      add_id_url: "",
      add_id_type: "",
    };

    this.throttledValueChanged = throttle(
      (values) => {
        const prev = this.state;
        this.setState({ ...prev, ...values });
      },
      280,
      { leading: true }
    );

    this.throttledValidator = throttle(
      (value) => this.validateIFSC(value),
      280,
      {
        trailing: true,
      }
    );
  }

  handleImageUpload = (value) => {};

  handleSubmit = () => {
    this.accountFormRef.validateFields();
    this.documentFormRef.validateFields();
    console.log(this.state);
  };

  validateIFSC = async (code) => {
    const isValid = validate(code);
    if (!isValid) return null;

    return await fetchDetails(code);
  };

  render() {
    const additional_id_label = this.state.add_id_type
      ? this.state.add_id_type.split("_").map(capitalize).join(" ")
      : "";

    return (
      <div className={classes.wrapper} style={{ maxWidth: "92vw" }}>
        <div className={classes.header} style={{ background: "#fff" }}>
          <div
            className={classes.title}
            style={{ lineHeight: "1em", display: "flex" }}
          >
            <span style={{ marginRight: "6px" }}>KYC Information</span>
            <Popover
              title={
                <span className={"text-sm font-gray-500"}>
                  KYC Verification Status
                </span>
              }
              content={
                <span className={"text-green-600 text-base font-bold"}>
                  Verified
                </span>
              }
              placement="right"
            >
              <CheckCircleOutlined
                style={{ color: "#5ca75c", fontSize: "18px" }}
              />
            </Popover>
          </div>
          <div className={classes.buttons}>
            <button
              onClick={() => this.props.history.goBack()}
              className={`${classes.button_cancel}`}
            >
              <span>Cancel</span>
            </button>
            <button
              onClick={() => this.handleSubmit()}
              className={`${classes.button_input}`}
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
        <div className="body  pr-4 md:pr-14 ">
          <hr style={{ margin: "8px 0px 16px", borderColor: "#dfdfdf" }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4 md:pr-14  mb-6">
          <div
            className=" bg-white w-full rounded-lg shadow-xl px-6 pb-6 pt-4 text-gray-600"
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div
              className="text-lg text-gray-600 pb-2 md:pb-4"
              style={{ fontWeight: "bold" }}
            >
              Upload Documents
              <br />
              <span
                style={{
                  fontWeight: "500",
                  color: "#00000090",
                  fontSize: "14px",
                }}
              >
                Upload the required documents to get verified
              </span>
            </div>
            <hr
              style={{
                borderColor: "transparent",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            />
            <div className={"categoryStyle"}>
              <div style={{ fontWeight: "600", padding: "0.5rem 0" }}>
                Select Category
                <Popover
                  title={
                    <span className={"font-bold"}>
                      Select a category first to continue
                    </span>
                  }
                  content={
                    <span className={"text-gray-500"}>
                      Account category once selected cannot be changed later
                      <br />
                      Contact support for any assistance
                    </span>
                  }
                  placement="bottomRight"
                  defaultVisible
                  overlayStyle={{
                    // background: "#ef4444",
                    borderRadius: "8px",
                    // overflow: "hidden",
                    border: "1ps solid black",
                  }}
                >
                  <InfoCircleOutlined
                    style={{
                      color: "#bdbdbd",
                      marginLeft: "4px",
                      fontSize: "16px",
                    }}
                  />
                </Popover>
              </div>
              <Radio.Group
                onChange={(e) => {
                  this.setState({ category: e.target.value, add_id_type: "" });
                  console.log(this.add_item_ref);
                }}
                value={this.state.category}
              >
                <Radio value="individual">Individual</Radio>
                <Radio value="company">Company</Radio>
              </Radio.Group>
            </div>
            <Form
              layout="vertical"
              name="kyc-documents"
              autoComplete={"off"}
              ref={(ref) => (this.documentFormRef = ref)}
              onValuesChange={(_changed, values) => {
                this.throttledValueChanged(values);
              }}
            >
              <Form.Item
                label="PAN"
                name="pan"
                rules={[
                  {
                    required: true,
                    message: "Please Enter PAN",
                  },
                ]}
              >
                <Input
                  disabled={this.state.category === "unknown"}
                  placeholder="1234XXXXXXXXXX"
                />
              </Form.Item>
              <Form.Item
                label={`Additional ID`}
                name="add_id_type"
                required
                rules={[
                  {
                    required: true,
                    message: "Please Select an ID type",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => {
                    this.setState({
                      add_id_type: e,
                    });
                  }}
                  disabled={this.state.category === "unknown"}
                  value={this.state.add_id_type}
                  options={AdditionalID.filter(
                    (x) => x.target === this.state.category
                  )}
                ></Select>
              </Form.Item>
              <Form.Item
                label={`Additional ID: ${additional_id_label}`}
                name="add_id_number"
                rules={[
                  {
                    required: true,
                    message: "Please Enter " + additional_id_label,
                  },
                ]}
              >
                <Input
                  disabled={this.state.category === "unknown"}
                  placeholder="1234XXXXXXXXXX"
                />
              </Form.Item>
              <div
                className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-start border border-gray-200"
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                }}
              >
                <UploadSingleImage
                  title={"PAN"}
                  disabled={this.state.category === "unknown" ? true : false}
                  handleUploadSingleImage={(value) => {
                    this.setState({
                      pan_id_url: value && value[0] ? value[0].url : "",
                    });
                  }}
                />
                {this.state.add_id_type ? (
                  <UploadSingleImage
                    title={this.state.add_id_type ? this.state.add_id_type : ""}
                    disabled={this.state.category === "unknown" ? true : false}
                    handleUploadSingleImage={(value) => {
                      this.setState({
                        add_id_url: value && value[0] ? value[0].url : "",
                      });
                    }}
                  />
                ) : (
                  <></>
                )}
                <UploadSingleImage
                  title={"Cancelled Cheque"}
                  disabled={this.state.category === "unknown" ? true : false}
                  handleUploadSingleImage={(value) => {
                    this.setState({
                      cancelled_cheque_url:
                        value && value[0] ? value[0].url : "",
                    });
                  }}
                />
              </div>
            </Form>
          </div>

          <div
            className=" bg-white w-full rounded-lg shadow-xl px-6 pb-6 pt-4 text-gray-600"
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div className="h-full">
              <div
                className="text-lg text-gray-600 pb-2 md:pb-4"
                style={{ fontWeight: "bold" }}
              >
                Account Details
                <br />
                <span
                  style={{
                    fontWeight: "500",
                    color: "#00000090",
                    fontSize: "14px",
                  }}
                >
                  Complete Account details here to proceed with your KYC
                  verification.
                </span>
              </div>
              <hr
                style={{
                  borderColor: "transparent",
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              />
              <Form
                layout="vertical"
                name="kyc-accounts"
                ref={(ref) => (this.accountFormRef = ref)}
                autoComplete={"off"}
                onValuesChange={(_changed, values) => {
                  this.throttledValueChanged(values);
                }}
                // initialValues={{
                //   channel_name: channel_name,
                //   api_key: api_key,
                //   store_url: store_url,
                //   key: key,
                //   shared_secret: shared_secret,
                // }}
              >
                <Form.Item
                  shouldUpdate
                  label="Account Holder Name"
                  name="account_holder"
                  autoComplete={"off"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter account holder name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Account Holder Name"
                    autoComplete={"off"}
                  />
                </Form.Item>
                <Form.Item
                  label="Account Number"
                  name="account_number"
                  autoComplete={"off"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Account Number!",
                    },
                  ]}
                >
                  <Input.Password
                    visibilityToggle={false}
                    placeholder="1234XXXXXXXXXX"
                    autoComplete={"off"}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Account Number"
                  name="cnfm_account_number"
                  dependencies={["account_number"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your Account Number!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("account_number") === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Account numbers do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input placeholder="1234XXXXXXXXXX" />
                </Form.Item>
                <Form.Item
                  tooltip="Your Bank IFSC code should be available on your passbook"
                  label="IFSC Code"
                  name="ifsc_code"
                  hasFeedback
                  help={
                    !!this.state.bank_details ? null : "Enter a Valid IFSC Code"
                  }
                  validateStatus={
                    !!this.state.bank_details ? "success" : "error"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your branch IFSC code!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Bank IFSC Code"
                    onChange={(event) =>
                      this.throttledValidator(event.target.value).then(
                        (resp) => {
                          this.setState({ bank_details: resp }, () => {
                            console.log(this.state.bank_details);
                            this.accountFormRef.validateFields();
                          });
                        }
                      )
                    }
                  />
                </Form.Item>
                {this.state.bank_details ? (
                  <Descriptions
                    title={"Bank Information"}
                    column={1}
                    bordered
                    size={"small"}
                  >
                    <Descriptions.Item label={"Bank Name"}>
                      {this.state.bank_details.BANK}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Branch Name"}>
                      {this.state.bank_details.BRANCH}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Branch Address"}>
                      {this.state.bank_details.ADDRESS}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Branch MICR"}>
                      {this.state.bank_details.MICR}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  <></>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

kyc.contextType = AuthContext;
export default withRouter(kyc);
