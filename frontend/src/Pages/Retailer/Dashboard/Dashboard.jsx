const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
};

const Dashboard = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#fff" }}>
        <div className={classes.title}>Dashboard Retailer</div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4 pr-4 md:pr-14 pl-4">
        <div className="p-4 transition-shadow rounded-lg  border border-gray-200 shadow-sm hover:shadow-lg bg-white">
          <div className="flex items-start justify-between mx-auto">
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500">Total Shipment</span>
              <span className="text-2xl font-bold text-gray-900">1841</span>
            </div>
            <div className="rounded-md">
              <img
                style={{ height: "50px", marginRight: "10px" }}
                src="/images/truck.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <span className="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-green-600 bg-green-100 rounded-full">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              14%
            </span>
            <span className="text-gray-400">from 2019</span>
          </div>
        </div>
        <div className="p-4 transition-shadow rounded-lg  border border-gray-200 shadow-sm hover:shadow-lg bg-white">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500">Total Delivered</span>
              <span className="text-2xl font-bold text-gray-900">1240</span>
            </div>
            <div className=" rounded-md">
              <img
                style={{ height: "50px", marginRight: "10px" }}
                src="/images/sale.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <span className="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-red-600 bg-red-100 rounded-full">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              5%
            </span>

            <span className="text-gray-400">from 2019</span>
          </div>
        </div>
        <div className="p-4 transition-shadow rounded-lg  border border-gray-200 shadow-sm hover:shadow-lg bg-white">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500">Total RTO</span>
              <span className="text-2xl font-bold text-gray-900">18</span>
            </div>
            <div className="rounded-md">
              <img
                style={{ height: "50px", marginRight: "10px" }}
                src="/images/return.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <span className="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-green-600 bg-green-100 rounded-full">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              8%
            </span>
            <span className="text-gray-400">from 2019</span>
          </div>
        </div>
        <div className="p-4 transition-shadow rounded-lg  border border-gray-200 shadow-sm hover:shadow-lg bg-white">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500">Total Earning's</span>
              <span className="text-2xl font-bold text-gray-900">
                &#8377; 350
              </span>
            </div>
            <div className=" rounded-md">
              <img
                style={{ height: "50px", marginRight: "10px" }}
                src="/images/rupee.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-row">
            <span className="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-green-600 bg-green-100 rounded-full">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              20%
            </span>
            <span className="text-gray-400 ">from 2019</span>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 pr-4 md:pr-14 pl-4 gap-6 mt-4 md:grid-cols-2">
        <div className="flex items-center p-6 justify-center w-full h-32 bg-white rounded-md shadow-sm">
          <div className="mb-2 pb-2">
            <h3 className="font-semibold text-lg text-gray-600">Bar Chart</h3>
            <p className="text-sm text-gray-500">
              Profit Share between customers
            </p>
          </div>
          <div
            id="chartdiv"
            className="w-full"
            style={{ height: "240px" }}
          ></div>
        </div>
        <div className="flex items-center p-6 justify-center w-full h-32 bg-white rounded-md shadow-sm">
          <div className="mb-2 pb-2">
            <h3 className="font-semibold text-lg text-gray-600">Bar Chart</h3>
            <p className="text-sm text-gray-500">
              Profit Share between customers
            </p>
          </div>
          <div
            id="chartdiv"
            className="w-full"
            style={{ height: "240px" }}
          ></div>
        </div>
      </div>
      <div className="container pl-4 pr-4 md:pr-14 py-4 mx-auto">
        <h3 className="block text-center md:text-left text-xl text-gray-700 font-semibold mb-3">
          Bar Chart
        </h3>
        <div className="flex">
          <div className="w-1/2">
            <div className="rounded-md p-6 bg-white shadow">
              <div className="mb-2 pb-2">
                <h3 className="font-semibold text-lg text-gray-600">
                  Bar Chart
                </h3>
                <p className="text-sm text-gray-500">
                  Profit Share between customers
                </p>
              </div>
              <div
                id="chartdiv"
                className="w-full"
                style={{ height: "240px" }}
              ></div>
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <div className="rounded-md p-6 bg-white shadow">
              <div className="mb-2 pb-2">
                <h3 className="font-semibold text-lg text-gray-600">
                  Bar Chart
                </h3>
                <p className="text-sm text-gray-500">
                  Profit Share between customers
                </p>
              </div>
              <div
                id="chartdiv2"
                className="w-full"
                style={{ height: "240px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    */}
    </div>
  );
};

export default Dashboard;
