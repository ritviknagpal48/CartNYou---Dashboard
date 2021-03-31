import React from "react";
import { Checkbox, Tag, Button } from "antd";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  render() {
    const productCard = this.props.ProductData;
    console.log(this.props);

    return (
      <div
        className="product-card shadow-xl my-2 bg-white rounded cursor-pointer hover:shadow-2xl"
        style={{ maxWidth: "100%" }}
      >
        <div className="layout">
          <div
            className="checkbox"
            style={{
              position: "absolute",
              padding: "9px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "260px",
            }}
          >
            <Checkbox />
            <Tag
              // color={productCard.tagColor}
              style={{ borderRadius: "4px", margin: "4px 0px" }}
            >
              {productCard.category}
            </Tag>
          </div>
          {/* <Link to="/retailer/products/producyId"> */}
          <Link
            to={{
              pathname: "/retailer/products/productId",
              search: `?id=${productCard.id}+sku=${productCard.sku}`,
              state: { detail: productCard },
            }}
          >
            <div
              className="image-layout"
              style={{
                display: "flex",
                height: "220px",
                borderRadius: "4px 4px 0 0",
                overflow: "hidden",
              }}
            // onClick={() => {
            //   this.props.history.push(`${productCard.sku}`);
            // }}
            >
              <img
                width="100%"
                className={'object-cover object-top'}
                // style={{ height: "fit-content" }}
                src={productCard.images[0].url}
                alt=""
              />
            </div>

            <div className="body" style={{ padding: "10px" }}>
              <div
                className="name text-gray-500"
                style={{
                  fontSize: "15px",
                  // fontFamily: "poppins",
                  fontWeight: "500",
                  padding: "8px 0px 5px 0",
                }}
              >
                {productCard.name}
              </div>
              <div
                className="price text-gray-500"
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  // padding: "8px 0px",
                }}
              >
                Price{" "}
                <span
                  className="text-gray-700"
                  style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    //   padding: "8px 0px",
                  }}
                >
                  &#x20b9; {productCard.price}
                </span>
              </div>
            </div>
          </Link>
          <div
            className="bottom-button"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // marginTop: "5px",
              padding: "5px 10px 10px 10px",
              flexDirection: "row",
            }}
          >
            <Button
              style={{
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              Bulk Enquiry
            </Button>
            <Button
              // className="hover:bg-black"
              type="primary"
              style={{
                //   marginLeft: "8px",
                borderRadius: "4px",
                fontSize: "12px",
                background: "#fc573b",
                border: "1px solid #fc573b",
              }}
            >
              Add to Import List
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
