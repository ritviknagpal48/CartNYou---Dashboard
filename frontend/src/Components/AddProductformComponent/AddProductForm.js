import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { message, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { axiosInstance as axios } from "Contexts/useAxios";
import { Tabs } from "antd";
import ProductDetail from "./ProductDetail/productDetail";
import VariantsDetails from "./VariantsDetails/variantsDetails";
import ImageUpload from "./ImageUploadForm/imageUpload";
import ShippingDetails from "./ShippingDetails/shippingDetails";
import { axiosInstance } from "../../Contexts/useAxios"
import AttributeDetail from "./AttributeDetail/AttributeDetail"
import ProductCategoryForm from "./ProductCategoryForm/ProductCategoryForm";
import "./AddProduct.css";

const { TabPane } = Tabs;

class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProduct: false,
      step: 0,

      //general details
      product_category: "",
      sub_category: "",
      sub_sub_category: "",
      product_name: "",
      product_description: "",
      product_brand: "",
      counrty_origin: "",
      product_tags: "",
      hsn_code: "",
      upc_number: "",
      ean_number: "",
      gst_type: "",
      measurement_unit: "",

      //VARIENT DETAILS
      colour: "",
      product_main_sku: "",
      qunatity: "",
      product_mrp: "",
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


      admin_status: "",
      product_status: "",

      subCatArray: [],
      subSubCatArray: [],
    };
  }

  async componentDidMount() {
    const productId = this.props && this.props.match && this.props.match.params && this.props.match.params.productID ? this.props.match.params.productID : "";
    const edit = this.props && this.props.location &&
      this.props.location.state &&
      this.props.location.state.edit
      ? this.props.location.state.edit
      : false;;

    if (edit) {

      await axiosInstance
        .get(`/product-details/`, {
          params: {
            id: productId
          }
        })
        .then((res) => {

          this.setState({
            step: 1,
            product_category: res.data[0] &&
              res.data[0].product_category &&
              res.data[0].product_category.id ?
              res.data[0].product_category.id : "",

            product_name: res.data[0] &&
              res.data[0].product_name ?
              res.data[0].product_name : "",

            product_brand: res.data[0] &&
              res.data[0].product_brand ?
              res.data[0].product_brand : "",

            product_description: res.data[0] &&
              res.data[0].product_description ?
              res.data[0].product_description : "",

            product_main_sku: res.data[0] &&
              res.data[0].product_main_sku ?
              res.data[0].product_main_sku : "",

            product_tags: res.data[0] &&
              res.data[0].product_tags ?
              res.data[0].product_tags : "",

            counrty_origin: res.data[0] &&
              res.data[0].counrty_origin ?
              res.data[0].counrty_origin : "",

            qunatity: res.data[0] &&
              res.data[0].qunatity ?
              res.data[0].qunatity : "",

            product_mrp: res.data[0] &&
              res.data[0].product_mrp ?
              res.data[0].product_mrp : "",

            weight: res.data[0] &&
              res.data[0].weight ?
              res.data[0].weight : "",

            dem_length: res.data[0] &&
              res.data[0].dem_length ?
              res.data[0].dem_length : "",

            dem_breadth: res.data[0] &&
              res.data[0].dem_breadth ?
              res.data[0].dem_breadth : "",

            dem_height: res.data[0] &&
              res.data[0].dem_height ?
              res.data[0].dem_height : "",

            upc_number: res.data[0] &&
              res.data[0].upc_number ?
              res.data[0].upc_number : "",

            hsn_code: res.data[0] &&
              res.data[0].hsn_code ?
              res.data[0].hsn_code : "",

            ean_number: res.data[0] &&
              res.data[0].ean_number ?
              res.data[0].ean_number : "",

            colour: res.data[0] &&
              res.data[0].colour ?
              res.data[0].colour : "",

            gst_percentage: res.data[0]
              && res.data[0].gst_percentage ?
              res.data[0].gst_percentage : "",

            gst_type: res.data[0] &&
              res.data[0].gst_type ?
              res.data[0].gst_type : "",

            measurement_unit: res.data[0] &&
              res.data[0].measurement_unit &&
              res.data[0].measurement_unit.id ?
              res.data[0].measurement_unit.id : "",

            custom_attribute: res.data[0] &&
              res.data[0].custom_attribute ?
              res.data[0].custom_attribute : "",

            sub_category: res.data[0] &&
              res.data[0].sub_category &&
              res.data[0].sub_category.id ?
              res.data[0].sub_category.id : "",

            sub_sub_category: res.data[0] &&
              res.data[0].sub_sub_category &&
              res.data[0].sub_sub_category.id ?
              res.data[0].sub_sub_category.id : ""
          });
        })
        .catch((err) => {
          message.error(err.message)
        });

      this.setState({
        editProduct: edit,
        step: 1
      })

    }
  }

  nextstep = () => {
    // const { step } = this.state;
    if (parseInt(this.state.step) !== 5) {
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
      [input]: {
        value,
      },
    });
  };

  handleValueChange = (input) => async (value) => {
    this.setState({
      [input]: {
        value,
      },
    });

    if (input === "product_category") {
      await axiosInstance
        .get(`/product-categories/${value}`
          // , {
          //   headers: {
          //     Authorization:
          //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
          //   },
          // }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            subCatArray: res.data && res.data.sub_categories ? res.data.sub_categories : ""
            // isLoading: false,
          });
        })
        .catch((err) => {
          message.error(err.message)
        });
    }
    else if (input === "sub_category") {
      await axiosInstance
        .get(`/sub-categories/${value}`
          // , {
          //   headers: {
          //     Authorization:
          //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjlhMGU3MzMwNjY3MzZjMGNlNzRhNSIsImlhdCI6MTYxNzgxNTc2OCwiZXhwIjoxNjIwNDA3NzY4fQ.DmAFeVgwlNsTRS8yiBwHfzWmXJZXh3wv1ahXfjeiWAo",
          //   },
          // }
        )
        .then((res) => {
          this.setState({
            subSubCatArray: res.data && res.data.sub_sub_categories ? res.data.sub_sub_categories : ""
            // isLoading: false,
          });
        })
        .catch((err) => {
          message.error(err.message)
        });
    }
  };


  handleCustomAttribute = (value) => {
    this.setState({
      custom_attribute: value ? value : {}
    })
    message.success(`Attributes Added Successfully`);
  }
  handleImageUpload = (value) => {
    // console.log("img add", value);
    // this.setState({
    //   images: value ? value : []
    // })
  }

  callback = (key) => {
    this.setState({
      step: key,
    });
  };

  // getFormatedfields = () => {

  // }

  updateProduct = () => {
    const productId = this.props && this.props.match && this.props.match.params && this.props.match.params.productID ? this.props.match.params.productID : "";

    console.log("Update", this.state);
    const measur = this.state.measurement_unit && this.state.measurement_unit.value ? this.state.measurement_unit.value : this.state.measurement_unit;
    const desc = this.state.product_description && this.state.product_description.value ? this.state.product_description.value : this.state.product_description;

    this.setState({
      measurement_unit: measur,
      product_description: desc,
      editProduct: false,
    })
    axios
      .put(`/product-details/${productId}`, this.state)
      .then((resp) => {
        if (resp.status === 200) {
          message.success(`Product Editted Successfully`);
          this.setState({
            editProduct: false
          })
          window.location = "/wholeseller/products";
        }
      })
      .catch((error) => {
        console.log(error.message);
        message.error(`Please fill all the required fields`);
      });

  }
  submitHandler = (e) => {
    e.preventDefault();
    const desc = this.state.product_description && this.state.product_description.value ? this.state.product_description.value : "";
    const cat = this.state.product_category && this.state.product_category.value ? this.state.product_category.value : "";
    const subcat = this.state.sub_category && this.state.sub_category.value ? this.state.sub_category.value : "";
    const subsubcat = this.state.sub_sub_category && this.state.sub_sub_category.value ? this.state.sub_sub_category.value : "";
    const measur = this.state.measurement_unit && this.state.measurement_unit.value ? this.state.measurement_unit.value : "";

    this.setState({
      editProduct: false,
      product_description: desc,
      product_category: cat,
      sub_category: subcat,
      sub_sub_category: subsubcat,
      measurement_unit: measur
    })
    axios
      .post("/product-details", this.state)
      .then((resp) => {
        if (resp.status === 200) {
          message.success(`Product Added Successfully`);
          window.location = "/wholeseller/products";
        }
      })
      .catch((error) => {
        console.log(error.message);
        message.error(`Please fill all the required fields`);
      });
  };

  render() {



    const { step, subCatArray,
      subSubCatArray, } = this.state;
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

      //attributes
      custom_attribute

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


      subCatArray,
      subSubCatArray,

    };

    if (step === 0) {
      return (
        <ProductCategoryForm
          nextstep={this.nextstep}
          handleValueChange={this.handleValueChange}
          values={values}
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
      <Tabs
        defaultActiveKey={"1"}
        activeKey={`${this.state.step}`}
        onChange={this.callback}
        onTabClick={(key) => {
          const newStep = parseInt(key);
          if (newStep > 0) {
            this.setState({ step: newStep });
          } else {
            this.setState({ step: 1 });
          }
          // console.log({ key, newStep, step: this.state.step });
        }}
        tabBarExtraContent={

          <div className="flex">
            <Button
              className="back-form-button"
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
                this.state.editProduct && this.state.step === 5 ? this.updateProduct :
                  this.state.step === 5 ? this.submitHandler : this.nextstep}
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
    );
  }
}

export default withRouter(AddProductForm);
