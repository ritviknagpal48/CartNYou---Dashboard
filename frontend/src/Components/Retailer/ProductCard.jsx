import React from "react";
import { Checkbox, Tag, Button, message, Modal } from "antd";
import { Link } from "react-router-dom";
import { addItemToImportList } from "Pages/Retailer/ImportList/importListUtils";
import { AuthContext } from "Contexts/Auth";

const defaultImage = "/images/no_image.png";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalLoading: false,
    };
  }

  render() {
    const productCard = this.props.ProductData;
    const image =
      productCard.images && productCard.images.length > 0
        ? productCard.images[0].url
        : defaultImage;
    return (
      <div className="product-card border border-gray-200 my-2 bg-white rounded cursor-pointer hover:shadow-2xl max-w-xs">
        <div className="layout" style={{ position: "relative" }}>
          <div
            className="checkbox"
            style={{
              position: "absolute",
              padding: "9px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                src={image}
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
                background: "#ef4444",
                border: "1px solid #ef4444",
              }}
              onClick={() => {
                this.setState({ modalVisible: true });
              }}
            >
              Add to Import List
            </Button>
          </div>
        </div>
        <Modal
          title={<div className="flex gap-x-2">Add To Import List</div>}
          width={"100%"}
          visible={this.state.modalVisible}
          confirmLoading={this.state.modalLoading}
          onOk={(e) => {
            this.setState({ modalLoading: true });
            addItemToImportList(
              this.context.additionalInfo.id,
              [productCard.id],
              this.context.token
            )
              .then(() => {
                message.success("Product added successfully");
                this.setState({ modalVisible: false, modalLoading: false });
              })
              .catch((err) => {
                message.error(err.message);
                this.setState({ modalVisible: false, modalLoading: false });
              });
          }}
          onCancel={() =>
            this.setState({ modalVisible: false, modalLoading: false })
          }
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: "none",
            maxWidth: "520px",
            paddingBottom: "0px",
          }}
          bodyStyle={{
            boxShadow: "none",
            height: "100%",
          }}
          maskStyle={{ background: "#00000034" }}
        >
          Add <span className="font-semibold">{productCard.product_name}</span>{" "}
          to your import list?
        </Modal>
      </div>
    );
  }
}

ProductCard.contextType = AuthContext;

export default ProductCard;
