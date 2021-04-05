import React, { Component } from "react";
import axios from "axios"
import { useContext, useState } from "react";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import clsx from "clsx";
import { Spin, message } from "antd";

import useAxios from "Contexts/useAxios";
import { Tabs } from 'antd';
import ProductDetail from "./ProductDetail/productDetail";
import VariantsDetails from "./VariantsDetails/variantsDetails";
import ImageUpload from "./ImageUploadForm/imageUpload";
import ShippingDetails from "./ShippingDetails/shippingDetails";
import OtherDetails from "./OtherDetails/otherDetails";
import Confirm from "./Confirm/confirm";
import Success from "./Success/success";
import { Row, Form, Input, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ProductCategoryForm from "./ProductCategoryForm/ProductCategoryForm"
import "./AddProduct.css";

const { TabPane } = Tabs;



class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      category: "",
      product_name: "",
      product_brand: "",
      product_description: "",
      product_main_sku: "",
      product_tags: "",
      counrty_origin: "",
      sku: "",
      qunatity: "",
      product_mrp: "",
      product_mp: "",
      B2BPrice: "",
      shipping_charge: 0,
      shipping_time: "",
      weight: "",
      dem_length: "",
      dem_breadth: "",
      dem_height: "",
      upc_number: "",
      ean_number: "",
      hsn_code: "",
      admin_status: "",
      product_status: "",
      TaxRate: "",
      Photo: "",
    }
  }


  nextstep = () => {
    const { step } = this.state;
    if (parseInt(this.state.step) != 5) {
      this.setState({
        step: parseInt(this.state.step) + 1,
      });
    }
  };

  prevstep = () => {
    const { step } = this.state;
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

  handleValueChange = (input) => (value) => {
    this.setState({
      [input]: {
        value,
      },
    });
  };


  callback = (key) => {
    this.setState({
      step: key,
    });

  }


  submitHandler = (e) => {


    e.preventDefault();
    // console.log("this si state data", this.state);
    axios
      .post("https://backend-cartnyou.herokuapp.com/product-details", this.state)
      .then(resp => {
        if (resp.status === 200) {
          message.success(`Product Added Successfully`);
          window.location = "/wholeseller/products";
        }
      })
      .catch(error => {
        message.error(`Please fill all the required fields`);
      })
  }

  render() {
    const { step } = this.state;
    const {
      category,
      product_name,
      product_brand,
      product_description,
      product_main_sku,
      product_tags,
      counrty_origin,
      sku,
      qunatity,
      product_mrp,
      product_mp,
      B2BPrice,
      shipping_charge,
      shipping_time,
      dem_height,
      weight,
      dem_length,
      dem_breadth,
      upc_number,
      ean_number,
      hsn_code,
      TaxRate,
      Photo,
    } = this.state;
    const values = {
      category,
      product_name,
      product_brand,
      product_description,
      product_main_sku,
      product_tags,
      counrty_origin,
      sku,
      qunatity,
      product_mrp,
      product_mp,
      B2BPrice,
      shipping_charge,
      shipping_time,
      dem_height,
      weight,
      dem_length,
      dem_breadth,
      upc_number,
      ean_number,
      hsn_code,
      TaxRate,
      Photo,
    };

    if (step === 0) {
      return <ProductCategoryForm
        nextstep={this.nextstep}
        handleValueChange={this.handleValueChange}
        values={values} />
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
      <Tabs defaultActiveKey={1}
        activeKey={`${this.state.step}`}
        onChange={this.callback}
        tabBarExtraContent={
          this.state.step === 5 ?
            <div className='flex'>
              <Button
                className="back-form-button"
                style={{ marginRight: "10px" }}
                onClick={this.prevstep}
                disabled={step === 1 || step === 0}
              >
                <LeftOutlined />
           Back
        </Button>
              <Button className="continue-form-button" onClick={this.submitHandler}>
                Submit
          <RightOutlined />
              </Button></div> :
            <div className='flex'>
              <Button
                className="back-form-button"
                style={{ marginRight: "10px" }}
                onClick={this.prevstep}
                disabled={step === 1 || step === 0}
              >
                <LeftOutlined />
               Back
            </Button>
              <Button className="continue-form-button" onClick={this.nextstep}>
                Next
              <RightOutlined />
              </Button>
            </div>}>

        <TabPane tab="General Details" key="1" >
          <ProductDetail
            nextstep={this.nextstep}
            handlechange={this.handlechange}
            handleValueChange={this.handleValueChange}
            values={values}
          />
        </TabPane>

        <TabPane tab="Varient Details" key="2" >
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
        <TabPane tab="Other Details" key="5">
          <OtherDetails
            nextstep={this.nextstep}
            prevstep={this.prevstep}
            handlechange={this.handlechange}
            values={values}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default AddProductForm;
