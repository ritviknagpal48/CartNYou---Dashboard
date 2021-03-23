import React, { Component } from "react";

import ProductDetail from "./ProductDetail/productDetail";
import VariantsDetails from "./VariantsDetails/variantsDetails";
import ImageUpload from "./ImageUploadForm/imageUpload";
import ShippingDetails from "./ShippingDetails/shippingDetails";
import OtherDetails from "./OtherDetails/otherDetails";
import Confirm from "./Confirm/confirm";
import Success from "./Success/success";
import "./AddProduct.css";

class AddProductForm extends Component {
  state = {
    step: 1,
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

  render() {
    const { step } = this.state;
    const {
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

    switch (step) {
      case 1:
        return (
          <ProductDetail
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
          <ProductDetail
            nextstep={this.nextstep}
            handlechange={this.handlechange}
            handleCountryChange={this.handleCountryChange}
            values={values}
          />
        );
    }
  }
}

export default AddProductForm;
