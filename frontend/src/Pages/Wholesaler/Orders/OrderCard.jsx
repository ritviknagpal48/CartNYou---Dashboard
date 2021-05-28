import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { message, notification, Radio } from "antd";

const classes = {
  wrapper:
    "text-gray-700 px-6 py-4 shadow-xl border border-gray-200 bg-white rounded-xl mx-6 my-4  divide-red-100",
  title: "text-sm pl-3 text-left w-3/12 py-2",
  card_info: "mt-2 leading-6",
  card_title: "font-bold tracking-wide",
};

const ItemRow = ({
  product_sku,
  product_name,
  product_mrp: price,
  product_quantity,
  images,
}) => {
  return (
    <div className={"flex flex-row items-center justify-start"}>
      <div
        className={clsx(
          classes.title,
          classes.card_title,
          "w-9/12 grid grid-cols-2"
        )}
      >
        <img
          src={images[0].url}
          alt={images[0].uid}
          className={
            "h-16 max-h-16 w-auto col-auto col-start-1 row-start-1 row-span-3 self-center"
          }
        />
        <span className={"text-sm font-light mb-1"}>{product_name}</span>
        <span className={"text-sm font-normal mb-l"}>SKU: {product_sku}</span>
        <span
          className={
            "text-xs font-bold bg-green-200 text-gray-700 rounded-lg w-max px-2"
          }
        >
          ₹ {price}
        </span>
      </div>
      <div className={clsx(classes.title, classes.card_title)}>
        {product_quantity}
      </div>
      <div className={clsx(classes.title, classes.card_title)}>
        ₹ {price * product_quantity}
      </div>
    </div>
  );
};

const OrderCard = ({
  id,
  className,
  collapse,
  product_quantity,
  order_response,
  shipping_address,
  product_id,
  createdAt,
  status,
}) => {
  const [isExpanded] = useState(!collapse);
  const [newStatus, setValue] = useState(status);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    message.success("API under development");
  };

  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className={"flex flex-row mx-auto items-start pb-2 relative"}>
        <div className={classes.title}>
          <span className={classes.card_title}>Order Details</span>
          <div className={classes.card_info}>
            <Link to={`/wholesaler/orders/${id}`}>{id.toUpperCase()}</Link>
            <br />
            {new Date(createdAt).toLocaleString("en-IN", {
              dateStyle: "long",
              timeStyle: "short",
              hour12: true,
            })}
          </div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Ship To</span>
          <div className={classes.card_info}>{shipping_address.name}</div>
          <div className={classes.card_info} style={{ marginTop: 0 }}>
            {shipping_address.city}
          </div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Traking Details</span>
          <div className={classes.card_info}>
            <Link to={`/wholesaler/track-order/${order_response.tracking_id}`}>
              {order_response.tracking_id}
            </Link>
          </div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Status</span>

          <div className={classes.card_info}>
            <Radio.Group onChange={onChange} value={newStatus}>
              <Radio value={"accepted"}>Accept</Radio>
              <Radio value={"pending"}>Pending</Radio>
              <Radio value={"rejected"}>Reject</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <hr className={"text-red-400"} />
      <div className={"flex flex-row items-center justify-start -mb-2"}>
        <div
          className={clsx(
            classes.title,
            classes.card_title,
            "w-9/12 transition",
            { "opacity-0": !isExpanded }
          )}
        >
          Items
        </div>
        <div className={clsx(classes.title, classes.card_title)}>Qty</div>
        <div className={clsx(classes.title, classes.card_title)}>Amount</div>
      </div>
      <hr className={"text-red-400"} />
      <ItemRow {...product_id} product_quantity={product_quantity} />
      {isExpanded && <hr className={"text-red-400"} />}
      <div className={"flex flex-row items-center justify-start"}>
        <div
          className={clsx(
            classes.title,
            classes.card_title,
            "w-9/12 text-center"
          )}
        ></div>
        <div
          className={clsx(
            classes.title,
            classes.card_title,
            "flex flex-col items-start justify-center"
          )}
        >
          <span>Total</span>
        </div>
        <div
          className={clsx(
            classes.title,
            classes.card_title,
            "flex flex-col items-start justify-center"
          )}
        >
          <span className={"text-red-400"}>
            ₹{" "}
            {(
              parseFloat(product_id.product_mrp) * parseFloat(product_quantity)
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
