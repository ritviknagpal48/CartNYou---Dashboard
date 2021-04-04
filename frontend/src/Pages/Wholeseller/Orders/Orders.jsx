// @ts-ignore
import dummy_data from './orders.db.json';
import OrderCard from "./OrderCard";

const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-4 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600 hidden md:block font-sans-apple-system",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500 cursor-pointer",
}

const ActionButton = ({ title, icon }) => {
  return (
    <button type="button" className={classes.button_input}>
      {icon}
      <span className={classes.button_title}>{title ?? "Button"}</span>
    </button>
  );
};

const Orders = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.title}>Orders</div>
        <div>
          <ActionButton title={'Bulk Import'} icon={
            <svg className={'h-4 w-4 mr-2'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          } />
          <ActionButton title={'Export'} icon={
            <svg className={'h-4 w-4 mr-2'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          } />
        </div>
      </div>

      <div className={'overflow-y-auto overflow-x-hidden px-4 h-full flex-auto'}>
        {
          dummy_data.map(order => <OrderCard key={order.orderId} {...order} collapse={true} />)
        }
      </div>
    </div>
  )
}

export default Orders
