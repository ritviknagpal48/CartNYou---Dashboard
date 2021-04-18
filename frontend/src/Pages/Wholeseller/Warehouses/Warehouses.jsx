// @ts-nocheck
import { Switch } from "antd";
import clsx from "clsx";

const classes = {
  wrapper: "w-full pr-14 pl-4",
  card_item: "h-full px-4 py-2 flex-auto font-bold text-sm",
  card:
    "bg-white my-2 text-gray-700 font-medium text-base px-4 py-4 rounded-md shadow-lg flex flex-row items-center justify-start w-full text-left divide-x divide-red-300",
  tiny_header: "block w-full mb-2 text-xs text-gray-400 font-normal"
};

const WarehouseCards = ({ name, address, contact, pickup, rto }) => {
  return (
    <div className={classes.card}>
      <span className={clsx(classes.card_item, "w-2/12")}>
        <span className={classes.tiny_header}>Warehouse</span>
        <span className={'block w-full font-medium'}>{name}</span>
      </span>
      <span className={clsx(classes.card_item, "w-2/12")}>
        <span className={classes.tiny_header}>Contact</span>
        <span className={'block w-full font-medium'}>{contact}</span>
      </span>
      <span className={clsx(classes.card_item, "w-6/12")}>
        <span className={classes.tiny_header}>Address</span>
        <span className={'block w-full font-medium'}>{address}</span>
      </span>
      <span className={clsx(classes.card_item, "w-1/12")}>
        <span className={classes.tiny_header}>Pickup</span>
        <Switch checked={pickup} />
      </span>
      <span className={clsx(classes.card_item, "w-1/12")}>
        <span className={classes.tiny_header}>RTO</span>
        <Switch checked={rto} />
      </span>
    </div>
  );
};

WarehouseCards.defaultProps = {
  name: "Warehouse Name",
  address: "Warehouse Address",
  contact: "Contact Person",
  pickup: true,
  rto: true,
};

const Warehouses = () => {
  const warehouses = [
    {
      name: "Warehouse Name",
      address: "Warehouse Address",
      contact: "Contact Person",
      pickup: true,
      rto: true,
    },
    {
      name: "Warehouse Name",
      address: "Warehouse Address",
      contact: "Contact Person",
      pickup: true,
      rto: true,
    },
    {
      name: "Warehouse Name",
      address: "Warehouse Address",
      contact: "Contact Person",
      pickup: true,
      rto: true,
    },
  ];

  return (
    <div className={classes.wrapper}>
      <div
        className="w-full  py-3 flex flex-row items-center justify-between"
        style={{ background: "#fff" }}
      >
        <div className="text-2xl text-gray-600  hidden md:block font-sans-apple-system">
          Warehouses
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">
        {warehouses.map((wh) => {
          return <WarehouseCards {...wh} />;
        })}
      </div>
    </div>
  );
};

export default Warehouses;
