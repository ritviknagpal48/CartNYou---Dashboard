import React from "react";
import { Checkbox, Tag, Button } from "antd";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1590192746144-b92a837f8ddf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1059&q=80",
  "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80",
  "https://picsum.photos/200/300?random=1",
  "https://picsum.photos/200/300?random=5",
  "https://picsum.photos/200/300?random=7",
  "https://picsum.photos/200/300?random=6",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=3",
  "https://picsum.photos/200/300?random=4",
];

class ProductCard extends React.Component {
  render() {
    const randomImg = Math.floor(Math.random() * images.length);
    const productCard = this.props.ProductData;

    return (
      <div className="product-card shadow-xl my-2 bg-white rounded cursor-pointer hover:shadow-2xl max-w-xs">
        <div className="layout">
          <div
            className="checkbox"
            style={{
              position: "absolute",
              padding: "9px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "260px",
              width: "100%",
            }}
          >
            <Checkbox />
            <Tag
              // color={productCard.tagColor}
              style={{ borderRadius: "4px", margin: "4px 0px" }}
            >
              {productCard &&
              productCard.product_category &&
              productCard.product_category.categoryName
                ? productCard.product_category.categoryName
                : ""}
            </Tag>
          </div>
          {/* <Link to="/retailer/products/producyId"> */}
          <Link
            to={{
              pathname: "/retailer/products/productId",
              search: `?id=${productCard.id}+Sku=${productCard.product_main_sku}`,
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
                className={"object-cover object-top"}
                // style={{ height: "fit-content" }}
                src={images[randomImg]}
                alt=""
              />
            </div>

            <div className="body" style={{ padding: "10px" }}>
              <div
                className="name text-gray-700"
                style={{
                  fontSize: "15px",
                  // fontFamily: "poppins",
                  fontWeight: "600",
                  padding: "8px 0px 5px 0",
                }}
              >
                {productCard.product_name}
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
                    fontSize: "16px",
                    fontWeight: "500",
                    //   padding: "8px 0px",
                  }}
                >
                  &#x20b9; {productCard.product_mrp}
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
