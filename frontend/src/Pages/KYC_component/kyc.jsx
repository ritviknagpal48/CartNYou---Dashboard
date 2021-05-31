import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Descriptions,
  Form,
  Input,
  notification,
  Popover,
  Radio,
  Select,
  Spin,
} from "antd";
import { AuthContext } from "Contexts/Auth";
import { axiosInstance } from "Contexts/useAxios";
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
    key: "aadhaar",
    label: "Aadhaar",
    value: "aadhaar",
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
    label: "Company Registration",
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

      add_id_number: "",
      add_id_url: "",
      add_id_type: "",

      doc_present: false,
      loading: false,
      is_editable: false,
      status: "",
      intial_loading: true,
    };

    this.throttledValueChanged = throttle(
      (values) => {
        const prev = this.state;
        this.setState({ ...prev, ...values });
      },
      280,
      { leading: true }
    );
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userid =
      this.context &&
      this.context.additionalInfo &&
      this.context.additionalInfo.id
        ? this.context.additionalInfo.id
        : "";

    const token = this.context && this.context.token ? this.context.token : "";

    let { data } = await axiosInstance
      .get("/kyc-informations?user=" + userid, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      // .then((response) => {
      //   this.documentFormRef.setFieldsValue({
      //     add_id_number:
      //       response.data[0] &&
      //       response.data[0].additional_id &&
      //       response.data[0].additional_id.id_number
      //         ? response.data[0].additional_id.id_number
      //         : "Lokesh",
      //   });

      //   return response;
      // })
      .catch((_e) => {
        notification.error({ message: "Please Login Again.", duration: 2 });
      });

    if (data.length) data = data[0];
    else data = null;

    if (data) {
      const {
        user,
        account_holder,
        account_number,
        ifsc_code,
        bank_details,
        cancelled_cheque_url,
        category,
        pan: { id_url: pan_id_url, id_number: pan_id_number },
        additional_id: {
          id_url: add_id_url,
          id_number: add_id_number,
          id_type: add_id_type,
        },
        verificaiton_status,
      } = data;
      this.setState({
        is_editable: verificaiton_status !== "verified",
        status: verificaiton_status,
        loading: false,
        user,
        account_holder,
        account_number,
        ifsc_code,
        bank_details,
        cancelled_cheque_url,
        category,
        pan_id_url,
        pan_id_number,
        add_id_number,
        add_id_type,
        add_id_url,
        intial_loading: false,
      });
    } else {
      this.setState({
        is_editable: true,
        loading: false,
        intial_loading: false,
      });
    }

    console.log({ data, state: this.state });
  }

  sendRequest = async (method, payload) => {
    if (method === "POST") {
      return (
        await axiosInstance.post("/kyc-informations", payload, {
          headers: {
            Authorization:
              this.context && this.context.token
                ? `Bearer ${this.context.token}`
                : null,
          },
        })
      ).data;
    } else if (method === "PUT") {
      return (
        await axiosInstance.put("/kyc-informations", payload, {
          headers: {
            Authorization:
              this.context && this.context.token
                ? `Bearer ${this.context.token}`
                : null,
          },
        })
      ).data;
    }
  };

  handleSubmit = async () => {
    try {
      this.setState({ loading: true });
      await this.accountFormRef.validateFields();
      await this.documentFormRef.validateFields();

      const {
        bank_details,
        cancelled_cheque_url,
        pan_id_url,
        add_id_url,
        user,
        account_holder,
        account_number,
        ifsc_code,
        category,
        pan_id_number,
        add_id_number,
        add_id_type,
      } = this.state;
      if (!bank_details) throw new Error();
      const additional_id_label = this.state.add_id_type
        ? this.state.add_id_type.split("_").map(capitalize).join(" ")
        : "";
      if (!pan_id_url) throw new Error("IMG: Pan Image is Required");
      if (!cancelled_cheque_url)
        throw new Error("IMG: Cancelled Cheque Image is Required");
      if (!add_id_url)
        throw new Error(`IMG: ${additional_id_label} Image is Required`);

      const payload = {
        user,
        account_holder,
        account_number,
        ifsc_code,
        bank_details,
        cancelled_cheque_url,
        category,
        pan: {
          id_url: pan_id_url,
          id_number: pan_id_number,
          id_type: "pan",
        },
        additional_id: {
          id_url: add_id_url,
          id_number: add_id_number,
          id_type: add_id_type,
        },
        verificaiton_status: "pending",
      };

      await this.sendRequest("POST", payload);
      this.setState({ loading: false });
      await this.accountFormRef.resetFields();
      await this.doc.resetFields();
    } catch (error) {
      this.setState({ loading: false });
      if (error.message && error.message.startsWith("IMG:")) {
        return notification.error({
          message: error.message.slice(4),
          description: "Please verify all the information before submitting.",
          duration: 3,
        });
      }
      notification.error({
        message: "Invalid Details Provided",
        description: "Please verify all the information before submitting.",
        duration: 3,
      });
    }
  };

  validateIFSC = async (code) => {
    if (code.length < 11) return null;

    const isValid = validate(code);
    if (!isValid) return null;

    return await fetchDetails(code);
  };

  render() {
    const {
      bank_details,
      cancelled_cheque_url,
      pan_id_url,
      add_id_url,
      account_holder,
      account_number,
      ifsc_code,
      category,
      pan_id_number,
      add_id_number,
      add_id_type,

      intial_loading,
    } = this.state;

    const additional_id_label = add_id_type
      ? add_id_type.split("_").map(capitalize).join(" ")
      : "";

    if (intial_loading)
      return (
        <Spin
          spinning={true}
          size={"large"}
          indicator={<LoadingOutlined />}
          tip={"Loading..."}
        ></Spin>
      );

    return (
      <div className={classes.wrapper} style={{ maxWidth: "92vw" }}>
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} />
          }
          spinning={this.state.loading}
        >
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
              <Form
                layout="vertical"
                name="kyc-documents"
                autoComplete={"off"}
                ref={(ref) => (this.documentFormRef = ref)}
                onValuesChange={(_changed, values) => {
                  this.throttledValueChanged(values);
                }}
                validateMessages={{
                  required: "This field is required!",
                }}
                initialValues={{
                  cancelled_cheque_url,
                  pan_id_url,
                  add_id_url,
                  category,
                  pan_id_number,
                  add_id_number,
                  add_id_type,
                }}
              >
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
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={(e) => {
                        this.setState({
                          category: e.target.value,
                          add_id_type: "",
                        });
                      }}
                      value={this.state.category}
                    >
                      <Radio value="individual">Individual</Radio>
                      <Radio value="company">Company</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <Form.Item
                  label="PAN"
                  name="pan_id_number"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    disabled={this.state.category === "unknown"}
                    placeholder="1234XXXXXXXXXX"
                  />
                </Form.Item>
                <Form.Item
                  label={`Additional ID Type`}
                  name="add_id_type"
                  required
                  rules={[
                    {
                      required: true,
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
                  label={`Additional ID Number: ${additional_id_label}`}
                  name="add_id_number"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    disabled={this.state.category === "unknown"}
                    placeholder="1234XXXXXXXXXX"
                  />
                </Form.Item>
                <div
                  className="flex flex-col border border-gray-200"
                  style={{
                    padding: "1rem",
                    borderRadius: "12px",
                  }}
                >
                  <span
                    className={
                      "font-bold text-base text-gray-700 flex space-x-2"
                    }
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#000000d9",
                    }}
                  >
                    <p className={"text-red-500 font-bold mr-1"}>*</p>
                    Upload Documents
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 items-baseline justify-items-start upload-grid mt-2">
                    <UploadSingleImage
                      title={"PAN"}
                      disabled={
                        this.state.category === "unknown" ? true : false
                      }
                      initialValue={this.state.pan_id_url}
                      handleUploadSingleImage={(value) => {
                        this.setState({
                          pan_id_url: value && value[0] ? value[0].url : "",
                        });
                      }}
                    />
                    <UploadSingleImage
                      title={"Cancelled Cheque"}
                      disabled={
                        this.state.category === "unknown" ? true : false
                      }
                      initialValue={this.state.cancelled_cheque_url}
                      handleUploadSingleImage={(value) => {
                        this.setState({
                          cancelled_cheque_url:
                            value && value[0] ? value[0].url : "",
                        });
                      }}
                    />
                    {this.state.add_id_type ? (
                      <UploadSingleImage
                        title={
                          this.state.add_id_type ? this.state.add_id_type : ""
                        }
                        initialValue={this.state.add_id_url}
                        disabled={
                          this.state.category === "unknown" ? true : false
                        }
                        handleUploadSingleImage={(value) => {
                          this.setState({
                            add_id_url: value && value[0] ? value[0].url : "",
                          });
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
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
                  autoComplete="off"
                  onValuesChange={(_changed, values) => {
                    this.throttledValueChanged(values);
                  }}
                  onError={(_event) => {
                    console.log("Form OnError");
                  }}
                  onInvalid={(_event) => {
                    console.log("Account Form Invalid");
                  }}
                  validateMessages={{
                    required: "This field is required!",
                  }}
                  initialValues={{
                    ifsc_code: ifsc_code,
                    account_holder,
                    account_number,
                    cnfm_account_number: account_number,
                  }}
                >
                  <Form.Item
                    label="Account Holder Name"
                    name="account_holder"
                    autoComplete={"off"}
                    required
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
                    required
                  >
                    <Input.Password
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
                    validateStatus={!!bank_details ? "success" : "error"}
                    rules={[
                      {
                        required: true,
                      },
                      {
                        pattern: /[A-Za-z]{4}[0-9]{7}/,
                        message: "Invalid IFSC Code",
                        len: 11,
                      },
                    ]}
                  >
                    <Input
                      // placeholder="Bank IFSC Code"
                      maxLength={11}
                      onChange={(event) =>
                        this.validateIFSC(event.target.value).then((resp) => {
                          this.setState({ bank_details: resp }, () => {
                            this.accountFormRef.validateFields();
                          });
                        })
                      }
                    />
                  </Form.Item>
                  <Descriptions
                    title={"Bank Information"}
                    column={1}
                    bordered
                    size={"small"}
                  >
                    <Descriptions.Item label={"Bank Name"}>
                      {!!bank_details ? bank_details.BANK : "NA"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Branch Name"}>
                      {!!bank_details ? bank_details.BRANCH : "NA"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Branch Address"}>
                      {!!bank_details ? bank_details.ADDRESS : "NA"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Branch MICR"}>
                      {!!bank_details ? bank_details.MICR : "NA"}
                    </Descriptions.Item>
                  </Descriptions>
                </Form>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

kyc.contextType = AuthContext;
export default withRouter(kyc);
