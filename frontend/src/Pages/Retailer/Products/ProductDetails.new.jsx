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
    "pr-2 mx-4 md:pr-6  pt-4 mb-8 pb-8 relative  rounded-xl bg-white h-full ",
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
    url: "/images/no_image.png",
  },
];

const parseKey = (key) => {
  // split on hyphens and/or underscores
  let parts = `${key}`.split(/-|_/g);
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
    product_category,
    product_name,
    product_description,
    product_tags,
    product_main_sku,
    qunatity,
    product_mrp,
    //attributes
    custom_attribute,
  } = location.state.detail;

  const history = useHistory();

  const {
    additionalInfo: { id: userid },
    token,
  } = useContext(AuthContext);

  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const product_images = images && images.length > 0 ? images : defaultImages;

  return (
    <div className={classes.wrapper} style={{ maxWidth: "95vw" }}>
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
          "upper-block flex lg:flex-row w-full flex-col  border border-gray-200  sm:p-6 p-3 rounded-xl "
        }
      >
        <div className={"image-block lg:w-1/2 w-full"}>
          <div className={"container sm:hidden"} style={{ marginTop: 64 }}>
            <Carousel infinite={true} lazyLoad={true}>
              {product_images.map((image) => (
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
          <div className="flex">
            <div
              className={"hidden sm:flex flex-col items-center justify-start"}
              style={{ marginTop: 64, marginRight: 24 }}
            >
              {product_images.map((image, idx) => (
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
            <div className={"hidden sm:block"}>
              <Image
                style={{ maxWidth: 520, height: "auto" }}
                className={"rounded-xl"}
                src={product_images[imageIndex].url}
                placeholder={true}
                loading={"eager"}
              />
            </div>
          </div>
        </div>
        <div className={"content-block lg:ml-3 lg:w-1/2 w-full"}>
          <div className={"flex flex-col justify-between w-full pt-2 lg:flex-row"}>
            <div className={"flex flex-col"}>
              <span className={"text-4xl font-semibold text-gray-700"}>
                {product_name}
              </span>
              <span className={"text-xl text-red-500 font-semibold my-2"}>
                ₹ {product_mrp}
                <span className={"text-xs text-gray-400 font-normal ml-2"}>
                  Incl. of all taxes.
                </span>
              </span>
              <hr style={{ borderColor: "transparent", marginTop: "10px" }} />
              <span
                className={"text-xs grid grid-cols-4 lg:grid-cols-5 items-center justify-start"}
              >
                {product_tags
                  .split(",")
                  .filter((x) => x)
                  .map((tag) => (
                    <span
                      className={
                        "text-gray-500 text-xs bg-gray-100 rounded-md m-1  px-4 py-2"
                      }
                    >
                      {tag}
                    </span>
                  ))}
              </span>
            </div>

            <div className={"flex lg:flex-col flex-row  lg:justify-start items-center   justify-around mt-3 lg:mt-0 "}
              // style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
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
              style={{ width: "100%", maxWidth:"400px" }}
              defaultValue={product_description}
              // value={values.product_description}
              // onChange={handleValueChange("product_description")}
            />
          </div>
        </div>
      </div>

      <div className={"flex flex-col gap-4 lg:flex-row pt-2"} style={{ width: "100%" }}>
        <div  className={" my-3 border border-gray-200 w-full lg:w-2/3 lg:p-6 p-3 rounded-xl  "}
         
        >
          <Tabs defaultActiveKey={"1"} tabPosition={"top"}>
            <TabPane tab={"Product Variants"} key={"1"}>
              <div>
              <Descriptions
            // title="Product Details"
            layout="horizontal"
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            bordered
          >
            <Descriptions.Item label="Product SKU">
            {product_main_sku}
            </Descriptions.Item>
            <Descriptions.Item label="Product Name">
            {product_name}
            </Descriptions.Item>
            <Descriptions.Item label="Available Quantity">{qunatity}</Descriptions.Item>
            <Descriptions.Item label="Price"> ₹ {product_mrp}</Descriptions.Item>
          </Descriptions>
                {/* <div
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
                   
                  </span>
                  <span className={"text-gray-600 font-normal text-sm mt-1"}>

                  </span>
                  <span className={"text-gray-600 font-normal text-sm mt-1"}>
                    {qunatity}
                  </span>
                  <span className={"text-red-500 font-normal text-sm mt-1"}>
                    ₹ {product_mrp}
                  </span>
                </div> */}
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
                  "text-sm font-normal flex-wrap text-gray-500 max-w-sm md:max-w-4xl"
                }
              >
                <ReactQuill
                  readOnly={true}
                  theme="bubble"
                  // modules={this.modules}
                  // formats={this.formats}
                  style={{ width: "100%", height: "auto", maxWidth:"100%" }}
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

        <div className={" my-3 w-full lg:w-1/3 border border-gray-200  lg:p-6 p-3 rounded-xl  "}
         
        >
          <Descriptions
            title="Product Details"
            layout="horizontal"
            column={1}
            bordered
          >
            <Descriptions.Item label="Available Quantity">
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
        onOk={() => {
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
