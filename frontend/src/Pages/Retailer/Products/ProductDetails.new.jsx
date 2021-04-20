import {
  Image,
  message,
  Modal,
  Tabs,
  Carousel,
  Divider,
  Descriptions,
} from "antd";
import clsx from "clsx";
// import { AddToImportListModal } from 'Components/Modals/AddToImportListModal';
import { AuthContext } from "Contexts/Auth";
import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import { useHistory, useLocation } from "react-router-dom";
import { addItemToImportList } from "../ImportList/importListUtils";
import "./ProductDetails.css";

// import { addItemToImportList } from "../ImportList/importListUtils";

const classes = {
  wrapper:
    "pr-2 md:pr-14  pt-4 mb-8 pb-8 relative w-11/12 mx-auto rounded-xl bg-white h-full ",
  header: "w-full py-3 flex flex-row items-center justify-between",
  title:
    "text-2xl text-gray-600  hidden md:block font-sans-apple-system md:flex flex-row",
  main_card: "bg-white",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const { TabPane } = Tabs;

const defaultImages = [
  {
    url:
      "https://images.unsplash.com/photo-1590192746144-b92a837f8ddf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    url:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1059&q=80",
  },
  {
    url:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    url:
      "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    url:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80",
  },
];

const parseKey = (key) => {
  // split on hyphens and/or underscores
  let parts = `${key}`.split(/-|_/);
  // capitalize first character of each word
  parts = parts.map((p) => `${p[0].toUpperCase()}${p.substr(1).toLowerCase()}`);
  return parts.join(" ");
};

const ProductDetails = () => {
  const location = useLocation();
  // console.log(location.state.detail);
  // const { id, sku: paramSKU } = useParams();

  const {
    //general details
    id: product_id,
    product_status,
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
    admin_status,
  } = location.state.detail;

  const history = useHistory();

  const {
    additionalInfo: { id: userid },
    token,
  } = useContext(AuthContext);

  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);

  return (
    <div className={classes.wrapper} style={{ maxWidth: "90vw" }}>
      <button
        className={
          "m-4 px-3 py-3 text-gray-600 bg-gray-100 border border-gray-400 rounded-full shadow-lg focus:outline-none absolute left-2 top-2"
        }
        onClick={() => history.goBack()}
      >
        <svg
          className={"h-5 w-5"}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div
        className={
          "bg-white flex flex-row flex-wrap  border border-gray-200  px-6 py-6 rounded-xl "
        }
      >
        <div className={"container md:hidden"} style={{ marginTop: 64 }}>
          <Carousel infinite={true} lazyLoad={true}>
            {defaultImages.map((image) => (
              <div className={"object-cover w-auto h-auto"}>
                <Image
                  style={{ maxWidth: 480, height: "auto" }}
                  className={"rounded-xl"}
                  src={image.url}
                  placeholder={true}
                  loading={"eager"}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div
          className={"hidden md:flex flex-col items-center justify-start"}
          style={{ marginTop: 64, marginRight: 24 }}
        >
          {defaultImages.map((image, idx) => (
            <img
              onClick={() => setImageIndex(idx)}
              src={image.url}
              alt={image.url}
              className={
                "my-2 w-12 cursor-pointer h-auto object-cover rounded-md"
              }
            />
          ))}
        </div>
        <div className={"hidden md:block"}>
          <Image
            style={{ maxWidth: 480, height: "auto" }}
            className={"rounded-xl"}
            src={defaultImages[imageIndex].url}
            placeholder={true}
            loading={"eager"}
          />
        </div>
        <div className={"ml-6 w-11/12 md:w-1/2 "}>
          <div className={"flex flex-row justify-between w-full pt-2"}>
            <div className={"flex flex-col"}>
              <span className={"text-4xl font-semibold text-gray-800"}>
                {product_name}
              </span>
              <span className={"text-xl text-red-500 font-semibold my-2"}>
                ₹ {product_mrp}
                <span className={"text-xs text-gray-400 font-normal ml-2"}>
                  Incl. of all taxes.
                </span>
              </span>

              <hr style={{ borderColor: "transparent", marginTop: "20px" }} />
              <span
                className={"text-xs flx flex-row items-center justify-start"}
              >
                {product_tags
                  .split(",")
                  .filter((x) => x)
                  .map((tag) => (
                    <span
                      className={
                        "text-gray-500 text-xs bg-gray-100 rounded-md mx-1 my-2 px-4 py-2"
                      }
                    >
                      {tag}
                    </span>
                  ))}
              </span>
            </div>

            <div
              className={"flex flex-col items-start"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className={
                  " transition text-white text-sm flex flex-row items-center justify-center px-2 py-2 focus:outline-none"
                }
                style={{
                  background: "#ef4444",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => setShowModal((p) => !p)}
              >
                <svg
                  className={"h-4 w-4 mr-2"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                  />
                </svg>
                Add to Import List
              </button>
              <button
                className={
                  " transition font-medium text-sm flex flex-row items-center justify-center px-2 py-2 my-3 rounded-2xl focus:outline-none"
                }
                style={{
                  color: "#ef4444",

                  fontWeight: 600,
                }}
              >
                <svg
                  className={"h-4 w-4 mr-2"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                Bulk Enquiry
              </button>
            </div>
          </div>

          <hr style={{ borderColor: "transparent", marginTop: "20px" }} />
          {/* <Divider orientation="left">Description</Divider> */}
          <div
            className={"text-sm font-normal text-gray-500 overflow-ellipsis"}
          >
            <ReactQuill
              readOnly={true}
              theme="bubble"
              // modules={this.modules}
              // formats={this.formats}
              style={{ width: "550px" }}
              defaultValue={product_description}
              // value={values.product_description}
              // onChange={handleValueChange("product_description")}
            />
          </div>
        </div>
      </div>
      <div className={"flex flex-row  pt-2"} style={{ width: "100%" }}>
        <div
          className={" my-3 border border-gray-200  px-6 py-6 rounded-xl  "}
          style={{ width: "70%" }}
        >
          <Tabs defaultActiveKey={"1"} tabPosition={"top"}>
            <TabPane tab={"Product Variants"} key={"1"}>
              <div>
                <div
                  className={clsx(
                    "grid grid-cols-2 md:grid-cols-4 gap-2 w-full py-2 px-4"
                  )}
                >
                  <label className={"text-gray-400 font-normal text-xs"}>
                    SKU
                  </label>
                  <label className={"text-gray-400 font-normal text-xs"}>
                    Name
                  </label>
                  <label className={"text-gray-400 font-normal text-xs"}>
                    Quantity
                  </label>
                  <label className={"text-gray-400 font-normal text-xs"}>
                    Price
                  </label>
                </div>

                <div
                  className={clsx(
                    "grid grid-cols-2 md:grid-cols-4 gap-2 w-full py-2 px-4",
                    "bg-gray-100"
                  )}
                >
                  <span className={"text-gray-600 font-normal text-sm mt-1"}>
                    {product_main_sku}
                  </span>
                  <span className={"text-gray-600 font-normal text-sm mt-1"}>
                    {product_name}
                  </span>
                  <span className={"text-gray-600 font-normal text-sm mt-1"}>
                    {qunatity}
                  </span>
                  <span className={"text-red-500 font-normal text-sm mt-1"}>
                    ₹ {product_mrp}
                  </span>
                </div>
                {/* ) : (
              <span className={"text-gray-600 font-normal text-sm mt-1 py-2"}>
              No Varaints Available for this Product
              </span>
            )} */}
              </div>
            </TabPane>
            <TabPane tab={"Product Description"} key={"2"}>
              <div
                className={
                  "text-sm font-normal flex-wrap text-gray-500 max-w-sm md:max-w-full"
                }
              >
                <ReactQuill
                  readOnly={true}
                  theme="bubble"
                  // modules={this.modules}
                  // formats={this.formats}
                  style={{ width: "100%", height: "auto" }}
                  defaultValue={
                    product_description || "No Description Available"
                  }
                  // value={values.product_description}
                  // onChange={handleValueChange("product_description")}
                />
              </div>
            </TabPane>
            <TabPane tab={"Additional Attributes"} key={"3"}>
              {custom_attribute && custom_attribute.attribute
                ? custom_attribute.attribute.map((value, idx) => {
                    return (
                      <div
                        className={clsx(
                          "grid grid-cols-2 md:grid-cols-4 w-full py-2 px-4",
                          { "bg-gray-100": idx % 2 === 0 }
                        )}
                      >
                        <label
                          className={"text-gray-600 font-semibold text-sm"}
                        >
                          {parseKey(value.title)}
                        </label>
                        <span
                          className={"text-gray-600 font-normal text-sm ml-6"}
                        >
                          {value.value}
                        </span>
                      </div>
                    );
                  })
                : "No Attributes Added by seller"}
            </TabPane>
          </Tabs>
        </div>

        <div style={{ width: "2%", height: "2px", maxWidth: "22px" }} />
        <div
          className={" my-3  border border-gray-200  px-6 py-6 rounded-xl  "}
          style={{ width: "28%" }}
        >
          <Descriptions
            title="Product Details"
            layout="horizontal"
            column={1}
            bordered
          >
            <Descriptions.Item label="Available Ouantity">
              {qunatity > 0 ? `In Stock (${qunatity})` : "Out of Stock"}
            </Descriptions.Item>
            <Descriptions.Item label=" Category">
              {product_category && product_category.categoryName
                ? product_category.categoryName
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Wholesaler">Default</Descriptions.Item>
          </Descriptions>

          {/* <span
            className={clsx("text-sm", {
              "text-gray-500 font-light": qunatity > 0,
              "text-red-500 font-bold": !(qunatity > 0),
            })}
          >
            {qunatity > 0 ? `In Stock (${qunatity})` : "Out of Stock"}
          </span> */}
          {/* <span
              className={clsx(
                "text-xs leading-3 text-white font-normal bg-red-400 rounded-full px-2 py-1"
              )}
            >
              {product_main_sku}
            </span> */}
          {/* <span
            className={"text-gray-600 flex flex-row items-center justify-start"}
          >
            <label className={"text-gray-400 text-xs font-semibold"}>
              Category
            </label>
            <span
              className={
                "text-xs bg-green-400 text-white py-1 px-2 rounded-full ml-2"
              }
            >
              {product_category && product_category.categoryName
                ? product_category.categoryName
                : ""}
            </span>
          </span> */}
          {/* <span
            className={"text-gray-600 flex flex-row items-center justify-start"}
          >
            <label className={"text-gray-400 text-xs font-semibold"}>
              Supplier
            </label>
            <span
              className={
                "text-xs bg-red-400 text-white py-1 px-2 rounded-full ml-2"
              }
            >
              Default Suplier
            </span>
          </span> */}
        </div>
      </div>

      <Modal
        title={<div className="flex gap-x-2">Add To Import List</div>}
        width={"100%"}
        visible={showModal}
        confirmLoading={isProductAdded}
        onOk={(e) => {
          setIsProductAdded(true);
          addItemToImportList(userid, [product_id], token)
            .then(() => {
              message.success("Product added successfully");
              setShowModal(false);
              setIsProductAdded(false);
            })
            .catch((err) => {
              message.error(err.message);
              setShowModal(false);
              setIsProductAdded(false);
            });
        }}
        onCancel={() => setShowModal(false)}
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
        Add <span className="font-semibold">{product_name}</span> to your import
        list?
      </Modal>
    </div>
  );
};

export default ProductDetails;
