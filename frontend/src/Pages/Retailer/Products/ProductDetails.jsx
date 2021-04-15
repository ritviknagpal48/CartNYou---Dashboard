import clsx from "clsx";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Tabs } from "antd";
import ReactQuill from "react-quill";

const classes = {
  wrapper: "pr-2 md:pr-14 md:pl-4 pl-2 mb-8",
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
    id,
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

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className={classes.wrapper}>
      {/* Card Here */}
      <button
        className={
          "m-4 px-3 py-3 text-gray-600 bg-white rounded-full shadow-lg focus:outline-none"
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
          "bg-white grid grid-cols-6 md:grid-cols-12 row-auto md:grid-rows-6 w-11/12 md:w-10/12 mx-auto rounded-lg overflow-hidden px-4 py-4"
        }
      >
        <div
          className={
            "col-start-1 row-start-1 col-span-6 row-span-5 h-72 items-center justify-items-center justify-center"
          }
        >
          <img
            src={defaultImages[2].url}
            alt=""
            className={
              "h-full object-cover cursor-pointer rounded-lg shadow-xl mx-auto"
            }
          />
        </div>
        <div
          className={
            "col-start-1 row-start-6 col-span-6 flex flex-row items-center justify-center"
          }
        >
          {
            // images && images.length ?
            //   (images.map((image, idx) => (
            //     <img
            //       src={image.url}
            //       alt={image.alt}
            //       className={clsx(
            //         "h-12 w-12 object-cover mx-2 my-2 cursor-pointer rounded-lg shadow-lg",
            //         { "ring-2 ring-red-500": idx === imageIndex }
            //       )}
            //       onClick={() => setImageIndex(idx)}
            //     />
            //   )) ):(
            defaultImages.map((image, idx) => (
              <img
                src={image.url}
                alt={image.alt}
                className={clsx(
                  "h-12 w-12 object-cover mx-2 my-2 cursor-pointer rounded-lg shadow-lg",
                  { "ring-2 ring-red-500": idx === imageIndex }
                )}
                onClick={() => setImageIndex(idx)}
              />
            ))
            // )}
          }
        </div>
        <div
          className={
            "col-span-6 col-start-1 mt-8 md:mt-0 md:col-start-7 md:row-start-1 md:row-span-full text-gray-700 flex flex-col items-start justify-start"
          }
        >
          <span className={"text-xl font-semibold text-gray-800"}>
            {product_name}
          </span>
          <span
            className={
              "text-sm font-normal text-gray-500 overflow-ellipsis mt-1"
            }
          >
            <ReactQuill
              readOnly={true}
              theme="bubble"
              // modules={this.modules}
              // formats={this.formats}
              style={{ width: "500px" }}
              defaultValue={product_description}
            // value={values.product_description}
            // onChange={handleValueChange("product_description")}
            />
          </span>

          <div
            className={"flex flex-row w-full justify-between items-end my-4"}
          >
            <span
              className={clsx("text-sm", {
                "text-gray-500 font-light": qunatity > 0,
                "text-red-500 font-bold": !(qunatity > 0),
              })}
            >
              {qunatity > 0 ? `In Stock (${qunatity})` : "Out of Stock"}
            </span>
            <span
              className={clsx(
                "text-xs leading-3 text-white font-normal bg-red-400 rounded-full px-2 py-1"
              )}
            >
              {product_main_sku}
            </span>
          </div>
          <div className={"w-full h-px bg-gray-200 mb-2"} />
          <span className={"text-2xl text-red-500 font-semibold my-2"}>
            ₹ {product_mrp}
            <span className={"text-sm text-gray-400 font-normal ml-2"}>
              Incl. of all taxes.
            </span>
          </span>
          <span
            className={
              "text-gray-600 mt-6 mb-2 flex flex-row items-center justify-start"
            }
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
          </span>
          <span
            className={
              "text-gray-600 my-2 flex flex-row items-center justify-start"
            }
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
          </span>
          <div
            className={"flex flex-row items-center justify-center mt-8 w-full"}
          >
            <button
              className={
                "px-4 py-2 hover:bg-red-50 text-red-600 border border-red-600 rounded-md w-auto md:w-5/12 mx-2 focus:outline-none ring-0 flex flex-row items-center justify-center"
              }
            >
              <svg
                className={"h-5 w-5 mr-2"}
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
                "px-4 py-2 hover:bg-gray-50 border-gray-600 border text-gray-600 rounded-md w-auto md:w-5/12 mx-2 focus:outline-none ring-0 flex flex-row items-center justify-center"
              }
            >
              <svg
                className={"h-5 w-5 mr-2"}
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
      </div>

      {/* Tabs Here */}
      <div
        className={
          "text-gray-700 font-normal text-lg w-11/12 md:w-10/12 mx-auto mt-6 bg-white px-4 pt-2 pb-4 rounded-lg"
        }
      >
        <Tabs defaultActiveKey={"1"}>
          <TabPane tab={"Product Stastics"} key={"1"}>
            <div className={"flex flex-col items-start justify-start"}>
              {/* {Object.entries(info).map((value, idx) => {
                return (
                  <div
                    className={clsx(
                      "grid grid-cols-2 md:grid-cols-4 w-full py-2 px-4",
                      { "bg-gray-100": idx % 2 === 0 }
                    )}
                  >
                    <label className={"text-gray-500 font-semibold text-sm"}>
                      {parseKey(value[0])}
                    </label>
                    <span className={"text-gray-700 font-normal text-sm ml-6"}>
                      {value[1]}
                    </span>
                  </div>
                );
              })} */}
            </div>
          </TabPane>
          <TabPane tab={"Product Variants"} key={"2"}>
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
          <TabPane tab={"Product Description"} key={"3"}>
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
                style={{ width: "500px" }}
                defaultValue={product_description || "No Description Available"}
              // value={values.product_description}
              // onChange={handleValueChange("product_description")}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
