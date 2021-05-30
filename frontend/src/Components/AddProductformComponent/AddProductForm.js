import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, message, notification, Spin, Tabs } from "antd";
import { AuthContext } from "Contexts/Auth";
import { axiosInstance as axios } from "Contexts/useAxios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./AddProduct.css";
import AttributeDetail from "./AttributeDetail/AttributeDetail";
import ImageUpload from "./ImageUploadForm/imageUpload";
import ProductCategoryForm from "./ProductCategoryForm/ProductCategoryForm";
import ProductDetail from "./ProductDetail/productDetail";
import ShippingDetails from "./ShippingDetails/shippingDetails";
import VariantsDetails from "./VariantsDetails/variantsDetails";

const { TabPane } = Tabs;

class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProduct: false,
      step: 0,
      haveCategory: false,
      haveWarehouse: false,
      warehouseSelected: false,
      warehouseList: [],

      //general details
      product_name: "",
      product_category: "",
      product_brand: "",
      product_tags: "",
      product_description: "",
      measurement_unit: "",
      sub_category: "",
      sub_sub_category: "",
      counrty_origin: "",
      gst_type: "",
      wholesaler_details: this.props.userID,

      // Numbers
      hsn_code: "",
      upc_number: "",
      ean_number: "",

      //VARIENT DETAILS
      product_main_sku: "",
      product_mrp: "",
      qunatity: "",
      colour: "",
      gst_percentage: "",

      //images
      images: [],

      //SHIPPING DETAILS
      weight: "",
      dem_length: "",
      dem_breadth: "",
      dem_height: "",

      //attributes
      custom_attribute: {},

      // warehouse info
      warehouse: "",

      subCatArray: [],
      subSubCatArray: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const productId =
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.productID
        ? this.props.match.params.productID
        : "";
    const edit =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.edit
        ? this.props.location.state.edit
        : false;

    // console.log(this.state.wholesaler_details);

    this.setState({
      loading: true,
    });

    if (edit) {
      await axios
        .get(`/product-details/`, {
          params: {
            id: productId,
          },
        })
        .then((res) => {
          this.setState({
            step: 1,
            loading: false,
            product_category:
              res.data[0] &&
              res.data[0].product_category &&
              res.data[0].product_category.id
                ? res.data[0].product_category.id
                : "",

            product_name:
              res.data[0] && res.data[0].product_name
                ? res.data[0].product_name
                : "",

            product_brand:
              res.data[0] && res.data[0].product_brand
                ? res.data[0].product_brand
                : "",

            product_description:
              res.data[0] && res.data[0].product_description
                ? res.data[0].product_description
                : "",

            product_main_sku:
              res.data[0] && res.data[0].product_main_sku
                ? res.data[0].product_main_sku
                : "",

            product_tags:
              res.data[0] && res.data[0].product_tags
                ? res.data[0].product_tags
                : "",

            counrty_origin:
              res.data[0] && res.data[0].counrty_origin
                ? res.data[0].counrty_origin
                : "",

            qunatity:
              res.data[0] && res.data[0].qunatity ? res.data[0].qunatity : "",

            product_mrp:
              res.data[0] && res.data[0].product_mrp
                ? res.data[0].product_mrp
                : "",

            weight: res.data[0] && res.data[0].weight ? res.data[0].weight : "",

            dem_length:
              res.data[0] && res.data[0].dem_length
                ? res.data[0].dem_length
                : "",

            dem_breadth:
              res.data[0] && res.data[0].dem_breadth
                ? res.data[0].dem_breadth
                : "",

            dem_height:
              res.data[0] && res.data[0].dem_height
                ? res.data[0].dem_height
                : "",

            upc_number:
              res.data[0] && res.data[0].upc_number
                ? res.data[0].upc_number
                : "",

            images: res.data[0] && res.data[0].images ? res.data[0].images : [],

            hsn_code:
              res.data[0] && res.data[0].hsn_code ? res.data[0].hsn_code : "",

            ean_number:
              res.data[0] && res.data[0].ean_number
                ? res.data[0].ean_number
                : "",

            colour: res.data[0] && res.data[0].colour ? res.data[0].colour : "",

            gst_percentage:
              res.data[0] && res.data[0].gst_percentage
                ? res.data[0].gst_percentage
                : "",

            gst_type:
              res.data[0] && res.data[0].gst_type ? res.data[0].gst_type : "",

            measurement_unit:
              res.data[0] &&
              res.data[0].measurement_unit &&
              res.data[0].measurement_unit.id
                ? res.data[0].measurement_unit.id
                : "",

            custom_attribute:
              res.data[0] && res.data[0].custom_attribute
                ? res.data[0].custom_attribute
                : "",

            warehouse:
              res.data[0] && res.data[0].warehouse && res.data[0].warehouse.id
                ? res.data[0].warehouse.id
                : "",

            sub_category:
              res.data[0] &&
              res.data[0].sub_category &&
              res.data[0].sub_category.id
                ? res.data[0].sub_category.id
                : "",

            sub_sub_category:
              res.data[0] &&
              res.data[0].sub_sub_category &&
              res.data[0].sub_sub_category.id
                ? res.data[0].sub_sub_category.id
                : "",
          });

          if (this.state.product_description === "<p><br></p>") {
            // const desc = this.state.product_description.trim();
            const desc = this.state.product_description.replace(
              /<p><br[/]?><[/]?p>/gm,
              ""
            );
            this.setState({
              product_description: desc,
            });
          }
        })
        .catch((err) => {
          message.error(err.message);
        });

      this.setState({
        editProduct: edit,
        step: 1,
      });
    } else {
      await axios
        .get(`/warehouses`, {
          params: {
            user: this.state.wholesaler_details,
          },
        })
        .then((res) => {
          this.setState({
            loading: false,
          });
          if (res.data.length) {
            this.setState({
              // step: 1,

              haveWarehouse: true,
              warehouseList: res.data ? res.data : [],
            });
            // console.log(res);
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  }

  nextstep = () => {
    if (parseInt(this.state.step) !== 6) {
      this.setState({
        step: parseInt(this.state.step) + 1,
      });
    }
  };

  prevstep = () => {
    this.setState({
      step: parseInt(this.state.step) - 1,
    });
  };

  handlechange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleNumberChange = (input) => (value) => {
    this.setState({
      [input]: value,
    });
  };

  handleValueChange = (input) => async (value) => {
    this.setState({
      [input]: value,
    });
    if (this.state.product_description === "<p><br></p>") {
      const desc = this.state.product_description.replace(
        /<p><br[/]?><[/]?p>/gm,
        ""
      );
      this.setState({
        product_description: desc,
      });
    } else if (this.state.product_description === "<p> </p>") {
      this.setState({
        product_description: "",
      });
    }

    if (input === "warehouse") {
      if (value === "") {
        this.setState({
          warehouseSelected: false,
        });
      } else if (value === undefined) {
        this.setState({
          warehouseSelected: false,
        });
      } else {
        this.setState({
          warehouseSelected: true,
        });
      }
    }
    if (input === "product_category") {
      if (value !== undefined) {
        await axios
          .get(`/product-categories/${value}`, {
            headers: {
              Authorization: `Bearer ${this.context.token}`,
            },
          })
          .then((res) => {
            this.setState({
              subCatArray:
                res.data && res.data.sub_categories
                  ? res.data.sub_categories
                  : "",
              // isLoading: false,
            });
          })
          .catch((err) => {
            message.error(err.message);
          });
      }
      if (value === "") {
        this.setState({
          haveCategory: false,
        });
      } else if (value === undefined) {
        this.setState({
          haveCategory: false,
        });
      } else {
        this.setState({
          haveCategory: true,
        });
      }
    } else if (input === "sub_category") {
      await axios
        .get(`/sub-categories/${value}`, {
          headers: {
            Authorization: `Bearer ${this.context.token}`,
          },
        })
        .then((res) => {
          this.setState({
            subSubCatArray:
              res.data && res.data.sub_sub_categories
                ? res.data.sub_sub_categories
                : "",
            // isLoading: false,
          });
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };

  handleCustomAttribute = (value) => {
    this.setState({
      custom_attribute: value ? value : {},
    });
    message.success(`Attributes Added Successfully`);
  };
  handleImageUpload = (value) => {
    // console.log("img add", value);
    this.setState({
      images: value ? value : [],
    });
  };

  callback = (key) => {
    this.setState({
      step: key,
    });
  };

  // getFormatedfields = () => {

  // }

  handleValidation = () => {
    const {
      wholesaler_details,
      product_category,
      sub_category,
      sub_sub_category,
      product_name,
      product_description,
      product_brand,
      counrty_origin,
      product_tags,
      hsn_code,
      upc_number,
      ean_number,
      gst_type,
      measurement_unit,
      colour,
      product_main_sku,
      qunatity,
      product_mrp,
      gst_percentage,
      images,
      weight,
      dem_length,
      dem_breadth,
      dem_height,
      custom_attribute,
      warehouse,
    } = this.state;

    let productData = {
      wholesaler_details,
      product_category,
      product_name,
      product_description,
      product_brand,
      counrty_origin,
      product_tags,
      hsn_code,
      upc_number,
      ean_number,
      gst_type,
      measurement_unit,
      colour,
      product_main_sku,
      qunatity,
      product_mrp,
      gst_percentage,
      images,
      weight,
      dem_length,
      dem_breadth,
      dem_height,
      custom_attribute,
      warehouse,
    };

    if (!sub_category === "") {
      productData = { sub_category };
    }

    if (!sub_sub_category === "") {
      productData = { sub_sub_category };
    }

    const error = {};
    let isError = false;

    if (product_category === "") {
      error.product_category = "select a category";
      isError = true;
      this.openNotificationWithIcon("select a category");
    }

    if (!product_name.trim()) {
      error.product_name = "Product name is required";
      isError = true;
      this.openNotificationWithIcon("Product Name is required");
    }
    if (product_description === "") {
      error.product_description = "Product description is required";
      isError = true;
      this.openNotificationWithIcon("Product description is required");
    }
    if (!product_brand.trim()) {
      error.product_brand = "Product Brand name is required";
      isError = true;
      this.openNotificationWithIcon("Product Brand name  is required");
    }
    if (counrty_origin === "") {
      error.counrty_origin = "Product country of origin is required";
      isError = true;
      this.openNotificationWithIcon("Product country of origin is required");
    }
    if (!product_tags.trim()) {
      error.product_tags = "Product tags are Required";
      isError = true;
      this.openNotificationWithIcon("Product tags is required");
    }
    if (hsn_code === "") {
      error.hsn_code = "HSN code is required";
      isError = true;
      this.openNotificationWithIcon("HSN coden is required");
    }
    if (upc_number === "") {
      error.upc_number = "UPC number is required";
      isError = true;
      this.openNotificationWithIcon("UPC number is required");
    }
    if (ean_number === "") {
      error.ean_number = "EAN number is required";
      isError = true;
      this.openNotificationWithIcon("EAN number is required");
    }
    if (gst_type === "") {
      error.gst_type = "GST type is required";
      isError = true;
      this.openNotificationWithIcon("GST type is required");
    }
    if (measurement_unit === "") {
      error.measurement_unit = "Measurement unit is required";
      isError = true;
      this.openNotificationWithIcon("Measurement unit is required");
    }
    if (!product_main_sku.trim()) {
      error.product_main_sku = "Product SKU is required";
      isError = true;
      this.openNotificationWithIcon("Product SKU is required");
    }
    if (qunatity === "") {
      error.qunatity = "Qunatity is required";
      isError = true;
      this.openNotificationWithIcon("Quantity is required");
    }
    if (product_mrp === "") {
      error.product_mrp = "Product MRP is required";
      isError = true;
      this.openNotificationWithIcon("Product MRP is required");
    }
    if (weight === "") {
      error.weight = "Product Weight is required";
      isError = true;
      this.openNotificationWithIcon("Product Weight is required");
    }
    if (dem_length === "") {
      error.dem_length = "Length dimension is required";
      isError = true;
      this.openNotificationWithIcon("Length dimension is required");
    }
    if (dem_breadth === "") {
      error.dem_breadth = "Breadth dimension is required";
      isError = true;
      this.openNotificationWithIcon("Breadth dimension is required");
    }

    if (warehouse === "") {
      error.warehouse = "Warehouse is required";
      isError = true;
      this.openNotificationWithIcon("Warehouse is required");
    }

    if (!isError) {
      this.setState({ error: {}, isError });
      return productData;
    } else {
      this.setState({ error, isError });
      return {};
    }
  };

  updateProduct = async (e) => {
    e.preventDefault();
    const productId =
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.productID
        ? this.props.match.params.productID
        : "";

    if (this.state.product_description === "<p><br></p>") {
      const desc = this.state.product_description.replace(
        /<p><br[/]?><[/]?p>/gm,
        ""
      );
      this.setState({
        product_description: desc,
      });
    }

    const productData = await this.handleValidation();

    if (!this.state.isError) {
      if (productData) {
        this.setState({
          loading: true,
        });
        axios
          .put(`/product-details/${productId}`, productData)
          .then((resp) => {
            if (resp.status === 200) {
              message.success(`Product Editted Successfully`);
              this.setState({
                editProduct: false,
              });
              // window.location = "/wholesaler/products";
              this.props.history.push("/wholesaler/products");
            }
          })
          .catch((error) => {
            if (error.status === 500) {
              message.error("Something went wrong");
            } else {
              message.error(`Please fill all the required fields`);
            }
            // console.log(error.message);
          });
      }
    } else {
      // console.log(this.state.error);
    }
  };

  openNotificationWithIcon = (error) => {
    notification["error"]({
      message: `${error}`,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();

    this.setState({
      editProduct: false,
    });

    const productData = await this.handleValidation();

    // console.log({ productData });

    if (!this.state.isError) {
      if (productData) {
        this.setState({
          loading: true,
        });
        axios
          .post("/product-details", productData)
          .then((resp) => {
            if (resp.status === 200) {
              message.success(`Product Added Successfully`);
              this.props.history.push("/wholesaler/products");
            }
          })
          .catch((error) => {
            if (error.status === 500) {
              message.error("Something went wrong");
            } else {
              message.error(`Please fill all the required fields`);
            }
          });
      }
    } else {
      // console.log(this.state.error);
    }
  };

  render() {
    const { step, subCatArray, subSubCatArray, haveCategory } = this.state;
    // console.log(this.state);
    const {
      //general details
      product_category,
      sub_category,
      sub_sub_category,
      product_name,
      product_description,
      product_brand,
      counrty_origin,
      product_tags,
      hsn_code,
      upc_number,
      ean_number,
      gst_type,
      measurement_unit,

      //VARIENT DETAILS
      colour,
      product_main_sku,
      qunatity,
      product_mrp,
      gst_percentage,

      //images
      images,

      //SHIPPING DETAILS
      weight,
      dem_length,
      dem_breadth,
      dem_height,

      // warehouse info
      warehouse,
      warehouseList,

      //attributes
      custom_attribute,
    } = this.state;
    const values = {
      //general details
      product_category,
      sub_category,
      sub_sub_category,
      product_name,
      product_description,
      product_brand,
      counrty_origin,
      product_tags,
      hsn_code,
      upc_number,
      ean_number,
      gst_type,
      measurement_unit,

      //VARIENT DETAILS
      colour,
      product_main_sku,
      qunatity,
      product_mrp,
      gst_percentage,

      //images
      images,

      //SHIPPING DETAILS
      weight,
      dem_length,
      dem_breadth,
      dem_height,

      //attributes
      custom_attribute,

      // warehouse info
      warehouse,

      subCatArray,
      subSubCatArray,
    };

    if (step === 0) {
      return (
        <ProductCategoryForm
          nextstep={this.nextstep}
          handleValueChange={this.handleValueChange}
          values={values}
          loading={this.state.loading}
          haveCategory={haveCategory}
          haveWarehouse={this.state.haveWarehouse}
          warehouseList={warehouseList}
          warehouseSelected={this.state.warehouseSelected}
        />
      );
    }

    // if (step === 6) {
    //   return <Confirm
    //     nextstep={this.nextstep}
    //     prevstep={this.prevstep}
    //     handlechange={this.handlechange}
    //     values={values}
    //   />
    // }
    return (
      <Spin
        spinning={this.state.loading}
        indicator={
          <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />
        }
      >
        <Tabs
          defaultActiveKey={"1"}
          activeKey={`${this.state.step}`}
          // onChange={this.callback}
          // onTabClick={() => {
          //   console.log("tab chanegd");
          // }}
          tabBarExtraContent={
            <div className="flex">
              <Button
                className="mx-4 h-8 w-8 flex justify-center items-center text-gray-600 border border-gray-200 bg-white rounded-full shadow-lg focus:outline-none"
                style={{ marginRight: "10px" }}
                onClick={this.prevstep}
                disabled={step === 1 || step === 0}
              >
                <LeftOutlined />
                Back
              </Button>
              <Button
                className="continue-form-button"
                onClick={
                  this.state.editProduct && this.state.step === 5
                    ? this.updateProduct
                    : this.state.step === 5
                    ? this.submitHandler
                    : this.nextstep
                }
              >
                {this.state.step === 5 ? "Submit" : "Next"}
                <RightOutlined />
              </Button>
            </div>
          }
        >
          <TabPane tab="General Details" key="1">
            <ProductDetail
              nextstep={this.nextstep}
              handlechange={this.handlechange}
              handleValueChange={this.handleValueChange}
              values={values}
            />
          </TabPane>

          <TabPane tab="Varient Details" key="2">
            <VariantsDetails
              nextstep={this.nextstep}
              prevstep={this.prevstep}
              handlechange={this.handlechange}
              handleNumberChange={this.handleNumberChange}
              values={values}
            />
          </TabPane>
          <TabPane tab="Images" key="3">
            <ImageUpload
              nextstep={this.nextstep}
              prevstep={this.prevstep}
              handlechange={this.handlechange}
              handleImageUpload={this.handleImageUpload}
              values={values}
            />
          </TabPane>
          <TabPane tab="Shipping Details" key="4">
            <ShippingDetails
              nextstep={this.nextstep}
              prevstep={this.prevstep}
              handlechange={this.handlechange}
              values={values}
            />
          </TabPane>
          <TabPane tab="Attribute Details" key="5">
            <AttributeDetail
              nextstep={this.nextstep}
              prevstep={this.prevstep}
              handlechange={this.handlechange}
              values={values}
              handleCustomAttribute={this.handleCustomAttribute}
            />
          </TabPane>
        </Tabs>
      </Spin>
    );
  }
}

AddProductForm.contextType = AuthContext;
export default withRouter(AddProductForm);
