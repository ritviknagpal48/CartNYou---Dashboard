import React from "react";
import { Switch, Space } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "./ProductCardLayout.css";
import { Checkbox } from "antd";

class ProductCardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource,
    };
  }

  onChange(e) {
    // console.log(`checked = ${e.target.checked}`);
  }

  render() {
    const dataSource = this.state.dataSource;

    return (
      <div className="product-card">
        {dataSource.map((data, index) => {
          return (
            <div className="single-card" style={{ color: "black" }}>
              <Checkbox onChange={this.onChange}></Checkbox>
              <div className="card-detail">
                <div className="head-title">SKU</div>
                {data.sku}
              </div>
              <div className="card-detail">
                <div className="head-title">Product Info</div>
                {data.productInfo}
              </div>
              <div className="card-detail">
                <div className="head-title">MRP</div>
                {data.mrp}
              </div>
              <div className="card-detail">
                <div className="head-title">MP</div>
                {data.mp}
              </div>
              <div className="card-detail">
                <div className="head-title"> B2B</div>
                {data.b2b}
              </div>
              <div className="card-detail">
                <div className="head-title"> Quantity</div>
                {data.quantity}
              </div>
              <div className="card-detail">
                <div className="head-title"> Status</div>
                <Switch checked={data.status} size="small" />;
              </div>
              <div className="card-detail">
                <div className="head-title"> Admin Status</div>
                {data.admin}
              </div>
              <div className="action">
                <Space size="middle">
                  <EditTwoTone />
                  <DeleteTwoTone />
                </Space>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductCardLayout;
