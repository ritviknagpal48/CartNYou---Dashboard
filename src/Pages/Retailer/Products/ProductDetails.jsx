import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductData } from "./productDataDetails";
import { Tabs } from "antd";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4",
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

const parseKey = (key) => {
  // split on hyphens and/or underscores
  let parts = `${key}`.split(/-|_/);
  // capitalize first character of each word
  parts = parts.map((p) => `${p[0].toUpperCase()}${p.substr(1).toLowerCase()}`);
  return parts.join(" ");
};

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const {
    images,
    category,
    description,
    info,
    name,
    price,
    sku,
    stock,
    supplier,
    variants,
    "long-description": longDescription,
  } = ProductData[1];

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className={classes.wrapper}>
      {/* Card Here */}
      <div
        className={
          "bg-white grid grid-cols-12 grid-rows-6 w-10/12 mx-auto rounded-lg overflow-hidden px-4 py-4"
        }
      >
        <div
          className={
            "col-start-1 row-start-1 col-span-6 row-span-5 h-72 items-center justify-items-center justify-center"
          }
        >
          <img
            src={images[imageIndex].url}
            alt={images[imageIndex].alt}
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
          {images &&
            images.map((image, idx) => (
              <img
                src={image.url}
                alt={image.alt}
                className={clsx(
                  "h-12 w-12 object-cover mx-2 my-2 cursor-pointer rounded-lg shadow-lg",
                  { "ring-2 ring-red-500": idx === imageIndex }
                )}
                onClick={() => setImageIndex(idx)}
              />
            ))}
        </div>
        <div
          className={
            "col-span-6 col-start-7 row-start-1 row-span-full text-gray-700 flex flex-col items-start justify-start"
          }
        >
          <span className={"text-xl font-semibold text-gray-800"}>{name}</span>
          <span
            className={
              "text-sm font-normal text-gray-500 overflow-ellipsis mt-1"
            }
          >
            {description}
          </span>

          <div
            className={"flex flex-row w-full justify-between items-end my-4"}
          >
            <span
              className={clsx("text-sm", {
                "text-gray-500 font-light": stock > 0,
                "text-red-500 font-bold": !(stock > 0),
              })}
            >
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </span>
            <span
              className={clsx(
                "text-xs leading-3 text-white font-normal bg-red-400 rounded-full px-2 py-1"
              )}
            >
              {sku}
            </span>
          </div>
          <div className={"w-full h-px bg-gray-200 mb-2"} />
          <span className={"text-2xl text-red-500 font-semibold my-2"}>
            ₹ {price}
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
              {category}
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
              {supplier}
            </span>
          </span>
          <div
            className={"flex flex-row items-center justify-center mt-8 w-full"}
          >
            <button
              className={
                "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-5/12 mx-2 focus:outline-none ring-0 flex flex-row items-center justify-center"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                />
              </svg>
              Add to Import List
            </button>
            <button
              className={
                "px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md w-5/12 mx-2 focus:outline-none ring-0 flex flex-row items-center justify-center"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
          "text-gray-700 font-bold text-lg w-10/12 mx-auto mt-6 bg-white px-4 pt-2 pb-4"
        }
      >
        <Tabs defaultActiveKey={"1"}>
          <TabPane tab={"Product Stastics"} key={"1"}>
            <div className={"flex flex-col items-start justify-start"}>
              {Object.entries(info).map((value, idx) => {
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
              })}
            </div>
          </TabPane>
          <TabPane tab={"Product Variants"} key={"2"}>
            <div>
              {variants && variants.length > 0 && (
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
              )}
              {variants && variants.length > 0 ? (
                variants.map((variant, idx) => {
                  return (
                    <div
                      className={clsx(
                        "grid grid-cols-2 md:grid-cols-4 gap-2 w-full py-2 px-4",
                        { "bg-gray-100": idx % 2 === 0 }
                      )}
                    >
                      <span
                        className={"text-gray-600 font-normal text-sm mt-1"}
                      >
                        {variant.sku}
                      </span>
                      <span
                        className={"text-gray-600 font-normal text-sm mt-1"}
                      >
                        {variant.name}
                      </span>
                      <span
                        className={"text-gray-600 font-normal text-sm mt-1"}
                      >
                        {variant.quantity}
                      </span>
                      <span className={"text-red-500 font-normal text-sm mt-1"}>
                        ₹ {variant.price}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className={"text-gray-600 font-normal text-sm mt-1 py-2"}>
                  No Varaints Available for this Product
                </span>
              )}
            </div>
          </TabPane>
          <TabPane tab={"Product Description"} key={"3"}>
            <div
              className={"text-sm font-normal flex-wrap text-gray-500 w-full"}
            >
              {longDescription || description || "No Description Available"}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
