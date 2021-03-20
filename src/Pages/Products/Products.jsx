import ProductTable from "./ProductTable"

import dummy_data from './products.db.json'

const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-3 bg-white flex flex-row items-center justify-between",
  title: "text-xl text-gray-600 font-bold hidden md:block",
  buttons: "flex item-center flex-row justify-end",
  button_input: "inline-flex items-center px-4 py-2 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block"
}

const ActionButton = ({ title, icon }) => {
  return (
    <button type="button" className={classes.button_input}>
      {icon}
      <span className={classes.button_title}>
        {title ?? "Button"}
      </span>
    </button>
  )
}

const Products = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.title}>Products</div>
        <div className={classes.buttons}>
          <ActionButton
            title={'Import Inventory'}
            icon={
              <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <ActionButton
            title={'Export'}
            icon={
              <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <ActionButton
            title={'Import'}
            icon={
              <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <ActionButton
            title={'Add'}
            icon={
              <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          />
          <ActionButton
            title={'Filters'}
            icon={
              <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            }
          />
        </div>
      </div>

      <div className={'mt-4 overflow-y-auto overflow-x-hidden'}>
        <ProductTable
          heading={Object.keys(dummy_data[0])}
          rows={dummy_data}
        />
      </div>
    </div>
  )
}

export default Products
