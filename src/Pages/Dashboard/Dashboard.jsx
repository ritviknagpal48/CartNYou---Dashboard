const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
};

const Dashboard = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#f2f3f3" }}>
        <div className={classes.title}>Dashboard</div>
      </div>

      <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4 pr-14 pl-4">
        <div class="p-4 transition-shadow rounded-lg shadow-sm hover:shadow-lg bg-white">
          <div class="flex items-start justify-between">
            <div class="flex flex-col space-y-1">
              <span class="text-gray-500">Total Shipment</span>
              <span class="text-2xl font-bold text-gray-900">1841</span>
            </div>
            <div class="rounded-md">
              <img
                style={{ height: "70px", marginRight: "10px" }}
                src="/images/truck.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div class="flex flex-row">
            <span class="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-green-600 bg-green-100 rounded-full">
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              14%
            </span>
            <span class="text-gray-400">from 2019</span>
          </div>
        </div>
        <div class="p-4 transition-shadow rounded-lg shadow-sm hover:shadow-lg bg-white">
          <div class="flex items-start justify-between">
            <div class="flex flex-col space-y-1">
              <span class="text-gray-500">Total Delivered</span>
              <span class="text-2xl font-bold text-gray-900">1240</span>
            </div>
            <div class=" rounded-md">
              <img
                style={{ height: "70px", marginRight: "10px" }}
                src="/images/sale.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div class="flex flex-row">
            <span class="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-red-600 bg-red-100 rounded-full">
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              5%
            </span>

            <span class="text-gray-400">from 2019</span>
          </div>
        </div>
        <div class="p-4 transition-shadow rounded-lg shadow-sm hover:shadow-lg bg-white">
          <div class="flex items-start justify-between">
            <div class="flex flex-col space-y-1">
              <span class="text-gray-500">Total RTO</span>
              <span class="text-2xl font-bold text-gray-900">18</span>
            </div>
            <div class="rounded-md">
              <img
                style={{ height: "70px", marginRight: "10px" }}
                src="/images/return.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div class="flex flex-row">
            <span class="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-green-600 bg-green-100 rounded-full">
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              8%
            </span>
            <span class="text-gray-400">from 2019</span>
          </div>
        </div>
        <div class="p-4 transition-shadow rounded-lg shadow-sm hover:shadow-lg bg-white">
          <div class="flex items-start justify-between">
            <div class="flex flex-col space-y-1">
              <span class="text-gray-500">Total Earning's</span>
              <span class="text-2xl font-bold text-gray-900">&#8377; 350</span>
            </div>
            <div class=" rounded-md">
              <img
                style={{ height: "70px", marginRight: "10px" }}
                src="/images/rupee.png"
                alt=""
              />
            </div>
          </div>
          <div class="flex flex-row">
            <span class="flex max-w-min items-center px-2 py-0.5 mr-2 text-sm text-green-600 bg-green-100 rounded-full">
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              20%
            </span>
            <span class="text-gray-400 ">from 2019</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 pr-14 pl-4 gap-6 mt-4 md:grid-cols-2">
        <div class="flex items-center p-6 justify-center w-full h-32 bg-white rounded-md shadow-sm">
          <div class="mb-2 pb-2">
            <h3 class="font-semibold text-lg text-gray-600">Bar Chart</h3>
            <p class="text-sm text-gray-500">Profit Share between customers</p>
          </div>
          <div id="chartdiv" class="w-full" style={{ height: "240px" }}></div>
        </div>
        <div class="flex items-center p-6 justify-center w-full h-32 bg-white rounded-md shadow-sm">
          <div class="mb-2 pb-2">
            <h3 class="font-semibold text-lg text-gray-600">Bar Chart</h3>
            <p class="text-sm text-gray-500">Profit Share between customers</p>
          </div>
          <div id="chartdiv" class="w-full" style={{ height: "240px" }}></div>
        </div>
      </div>
      <div class="container pl-4 pr-14 py-4 mx-auto">
        <h3 class="block text-xl text-gray-700 font-semibold mb-3">Bar Chart</h3>
        <div class="flex">
          <div class="w-1/2">
            <div class="rounded-md p-6 bg-white shadow">
              <div class="mb-2 pb-2">
                <h3 class="font-semibold text-lg text-gray-600">Bar Chart</h3>
                <p class="text-sm text-gray-500">
                  Profit Share between customers
                </p>
              </div>
              <div
                id="chartdiv"
                class="w-full"
                style={{ height: "240px" }}
              ></div>
            </div>
          </div>
          <div class="w-1/2 ml-4">
            <div class="rounded-md p-6 bg-white shadow">
              <div class="mb-2 pb-2">
                <h3 class="font-semibold text-lg text-gray-600">Bar Chart</h3>
                <p class="text-sm text-gray-500">
                  Profit Share between customers
                </p>
              </div>
              <div
                id="chartdiv2"
                class="w-full"
                style={{ height: "240px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
