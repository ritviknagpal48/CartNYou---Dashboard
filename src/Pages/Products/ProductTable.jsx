import { Link } from "react-router-dom"

const classes = {
  wrapper: "",
  table_heading: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  pagination: "bg-white text-gray-600 w-full py-4 px-6",
  pagination_icons: "h-5 w-5 mx-2"
}

const ProductRow = ({ data }) => {
  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">
              Jane Cooper
            </div>
            <div class="text-sm text-gray-500">
              jane.cooper@example.com
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
        <div class="text-sm text-gray-500">Optimization</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Admin
      </td>
      <td class="whitespace-nowrap font-medium flex flex-row justify-start items-center p-6">
        <Link to="#" class="text-gray-600 hover:text-gray-900 px-2">
          <svg className={"w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </Link>
        <Link to="#" class="text-red-600 hover:text-red-900 px-2">
          <svg className={"w-5 h-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Link>
      </td>
    </tr>
  )
}

const ProductTable = ({ heading, rows }) => {
  return (
    <div className={classes.wrapper}>
      <div class="flex flex-col w-11/12 mx-auto my-2">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 bg-white">
                <thead class="bg-gray-50">
                  <tr>
                    {
                      heading && heading.map(head => <th scope="col" className={classes.table_heading}>{head}</th>)
                    }
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <ProductRow />
                </tbody>
                <tfoot className={"bg-white w-full py-4 px-8"}>
                  <tr className={"text-gray-600 bg-white text-right"}>
                    <td className={"py-4 px-8 w-full flex flex-row items-center justify-end"} colSpan={heading ? heading.length + 1 : 0}>
                      <div>
                        <svg className={classes.pagination_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      <div>
                        <svg className={classes.pagination_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
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
