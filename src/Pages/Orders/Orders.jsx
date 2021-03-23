import ProductTable from "../Products/ProductTable"
// import dummy_data from './orders.db.json';
import dummy_data from '../Products/products.db.json';
import OrderCard from "./OrderCard";

const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-4 bg-white flex flex-row items-center justify-between",
  title: "text-xl text-gray-600 font-bold hidden md:block",
}

const Orders = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.title}>Orders</div>
      </div>

      <div className={'mt-4 overflow-y-auto overflow-x-hidden py-3 px-4 h-full flex-auto'}>
        <OrderCard
          data={'Card 1'}
        />
      </div>
    </div>
  )
}

export default Orders
