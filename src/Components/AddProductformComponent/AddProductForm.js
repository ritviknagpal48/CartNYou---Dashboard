import React, { Component } from "react";
import { Tabs } from 'antd';
import ProductDetail from "./ProductDetail/productDetail";
import VariantsDetails from "./VariantsDetails/variantsDetails";
import ImageUpload from "./ImageUploadForm/imageUpload";
import ShippingDetails from "./ShippingDetails/shippingDetails";
import OtherDetails from "./OtherDetails/otherDetails";
import Confirm from "./Confirm/confirm";
import Success from "./Success/success";
import ProductCategoryForm from "./ProductCategoryForm/ProductCategoryForm"
import "./AddProduct.css";

const { TabPane } = Tabs;

class AddProductForm extends Component {
  state = {
    step: 0,
    Category: "",
    ProductName: "",
    Brand: "",
    Description: "",
    ProductMainSKU: "",
    ProductTags: "",
    CountryOfOrigin: "",
    ProductSKU: "",
    Quantity: "",
    ProductMrp: "",
    Maritalstatus: "",
    MPPrice: "",
    B2BPrice: "",
    ShippingCharge: "",
    ShippingTime: "",
    Weight: "",
    DimensionLength: "",
    DimensionBreadth: "",
    DimensionHeight: "",
    UPC: "",
    EAN: "",
    HSNcode: "",
    TaxRate: "",
    Photo: "",
  };

  nextstep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevstep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
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

  handleCountryChange = (input) => (value) => {
    this.setState({
      [input]: {
        value,
      },
    });
  };

  callback(key) {
    console.log(key);
  }

  render() {
    const { step } = this.state;
    const {
      Category,
      ProductName,
      Brand,
      Description,
      ProductMainSKU,
      ProductTags,
      CountryOfOrigin,
      ProductSKU,
      Quantity,
      ProductMrp,
      Maritalstatus,
      MPPrice,
      B2BPrice,
      ShippingCharge,
      ShippingTime,
      DimensionHeight,
      Weight,
      DimensionLength,
      DimensionBreadth,
      UPC,
      EAN,
      HSNcode,
      TaxRate,
      Photo,
    } = this.state;
    const values = {
      Category,
      ProductName,
      Brand,
      Description,
      ProductMainSKU,
      ProductTags,
      CountryOfOrigin,
      ProductSKU,
      Quantity,
      ProductMrp,
      Maritalstatus,
      MPPrice,
      B2BPrice,
      ShippingCharge,
      ShippingTime,
      DimensionHeight,
      Weight,
      DimensionLength,
      DimensionBreadth,
      UPC,
      EAN,
      HSNcode,
      TaxRate,
      Photo,
    };
    // return (
    //   <Tabs defaultActiveKey="1" activeKey={step.toString()} onChange={this.callback}>
    //     <TabPane tab="General Details" key="1" >
    //       <ProductDetail
    //         nextstep={this.nextstep}
    //         handlechange={this.handlechange}
    //         handleCountryChange={this.handleCountryChange}
    //         values={values}
    //       />
    //     </TabPane>
    //     {/* {
    //       step===2?<></>:<></>
    //     } */}
    //     <TabPane tab="Varient Details" key="2" >
    //       <VariantsDetails
    //         nextstep={this.nextstep}
    //         prevstep={this.prevstep}
    //         handlechange={this.handlechange}
    //         handleNumberChange={this.handleNumberChange}
    //         values={values}
    //       />
    //     </TabPane>
    //     <TabPane tab="Images" key="3">
    //       <ImageUpload
    //         nextstep={this.nextstep}
    //         prevstep={this.prevstep}
    //         handlechange={this.handlechange}
    //         values={values}
    //       />
    //     </TabPane>
    //     <TabPane tab="Shipping Details" key="4">
    //       <ShippingDetails
    //         nextstep={this.nextstep}
    //         prevstep={this.prevstep}
    //         handlechange={this.handlechange}
    //         values={values}
    //       />
    //     </TabPane>
    //     <TabPane tab="Other Details" key="5">
    //       <OtherDetails
    //         nextstep={this.nextstep}
    //         prevstep={this.prevstep}
    //         handlechange={this.handlechange}
    //         values={values}
    //       />
    //     </TabPane>
    //   </Tabs>
    //   // <ProductDetail
    //   //   nextstep={this.nextstep}
    //   //   handlechange={this.handlechange}
    //   //   handleCountryChange={this.handleCountryChange}
    //   //   values={values}
    //   // />
    // );
    switch (step) {
      case 0: return (<ProductCategoryForm
        nextstep={this.nextstep}
        handlechange={this.handlechange}

        values={values} />);
      case 1:
        return (
          <ProductDetail
            prevstep={this.prevstep}
            nextstep={this.nextstep}
            handlechange={this.handlechange}
            handleCountryChange={this.handleCountryChange}
            values={values}
          />
        );
      case 2:
        return (
          <VariantsDetails
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            handleNumberChange={this.handleNumberChange}
            values={values}
          />
        );
      case 3:
        return (
          <ImageUpload
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            values={values}
          />
        );
      case 4:
        return (
          <ShippingDetails
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            values={values}
          />
        );
      case 5:
        return (
          <OtherDetails
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            values={values}
          />
        );
      case 6:
        return (
          <Confirm
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            values={values}
          />
        );
      case 7:
        return (
          <Success
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            values={values}
          />
        );

      default:
        return (
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              <ProductDetail
                nextstep={this.nextstep}
                handlechange={this.handlechange}
                handleCountryChange={this.handleCountryChange}
                values={values}
              />
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <VariantsDetails
                nextstep={this.nextstep}
                prevstep={this.prevstep}
                handlechange={this.handlechange}
                handleNumberChange={this.handleNumberChange}
                values={values}
              />
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              <ImageUpload
                nextstep={this.nextstep}
                prevstep={this.prevstep}
                handlechange={this.handlechange}
                values={values}
              />
            </TabPane>
          </Tabs>
          // <ProductDetail
          //   nextstep={this.nextstep}
          //   handlechange={this.handlechange}
          //   handleCountryChange={this.handleCountryChange}
          //   values={values}
          // />
        );
    }
  }
}

export default AddProductForm;
