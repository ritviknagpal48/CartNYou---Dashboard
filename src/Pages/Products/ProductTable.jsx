import clsx from "clsx"
import { Link } from "react-router-dom"

const classes = {
  wrapper: "",
  table_heading: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  pagination: "bg-white text-gray-600 w-full py-4 px-6",
  pagination_icons: "h-5 w-5 mx-2",
  tags: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
}

const ProductRow = ({ sno, sku, description, mrp, mp, b2b, status, admin, quantity }) => {
  return (
    <tr>
      {/* <td className="px-6 py-4 w-auto whitespace-nowrap text-sm text-gray-500">
        {sno}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {sku}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis block max-w-xs">
        <div className="text-sm text-gray-900">{description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={clsx(classes.tags, "bg-green-100 text-green-800")}>
          {mrp}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {mp}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {b2b}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {status ? "True" : "False"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className={clsx(classes.tags, { "bg-green-100 text-green-900": admin === "approved", "bg-red-100 text-red-900": admin === "rejected", "bg-yellow-100 text-yellow-900": admin === "pending" })}>
          {admin}
        </div>
      </td>
      <td className="whitespace-nowrap font-medium flex flex-row justify-start items-center p-6">
        <Link to="#" className="text-gray-500 hover:text-gray-800 px-2">
          <svg className={"w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </Link>
      </td>
    </tr>
  )
}

const ProductTable = ({ heading, rows }) => {
  return (
    <div className={classes.wrapper}>
      <div className="flex flex-col w-11/12 mx-auto my-2">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    {/* <th scope="col" className={clsx(classes.table_heading, "w-4")}>S.No</th> */}
                    {
                      heading && heading.map(head => <th scope="col" className={clsx(classes.table_heading)}>{head}</th>)
                    }
                    <th scope="col" className={clsx(classes.table_heading)}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    rows &&
                    rows.map((row, idx) => <ProductRow sno={idx + 1} {...row} />)
                  }
                </tbody>
                <tfoot className={"bg-white w-full py-4 px-8"}>
                  <tr className={"text-gray-600 bg-white text-right"}>
                    <td className={"py-4 px-8 w-full flex flex-row items-center justify-start"} colSpan={heading ? heading.length + 1 : 0}>
                      <button type={'button'} className={'outline-none focus:outline-none'}>
                        <svg className={classes.pagination_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className={'mx-1 px-4 ring-1 text-center text-sm ring-offset-gray-400 rounded-sm'}>
                        1
                      </div>
                      <button type={'button'} className={'outline-none focus:outline-none'}>
                        <svg className={classes.pagination_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
