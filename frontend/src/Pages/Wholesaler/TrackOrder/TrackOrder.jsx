// @ts-nocheck
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Timeline } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import TrackOrderDetail from "./trackOrderDummyData";
import "./TrackOrder.css";
import clsx from "clsx";

const classes = {
  wrapper: "text-gray-500 text-lg pl-4 pr-14",
  header: "w-full  py-3 flex flex-row items-center ",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center py-1 mx-1 px-2 border border-transparent rounded-3xl shadow-sm bg-white text-sm font-medium text-gray-500  hover:text-red-400 focus:outline-none ",
  action_icons: "h-5 w-5",
  title: "px-3",
};

const TrackOrder = () => {
  const history = useHistory();
  const { params } = useRouteMatch();
  const reverseTracking = TrackOrderDetail.slice();

  useEffect(() => {
    if (!params.id) history.goBack();
  }, [params, history]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#fff" }}>
        <button
          onClick={history.goBack}
          className={clsx(classes.button_input, "px-2 py-2")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={classes.action_icons}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className={classes.title}>Track Order</div>
      </div>

      <div className="track-order grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
        <div>
          <div className="flex items-center border shadow-lg border-gray-200 p-6  w-full  bg-white rounded-md ">
            <div className="mb-2 pb-2 w-full">
              <h3 className="font-semibold text-lg text-gray-600 ">
                Order Information
              </h3>
              <hr />
              <p className="text-sm text-gray-500 my-3">
                <span className="font-bold pr-2">Order Id:</span>
                {params.id}
              </p>
              <hr />
              <p className="text-sm text-gray-500 my-3">
                <span className="font-bold pr-2">Courier:</span>
                Delhivery
              </p>
              <hr />
              <p className="text-sm text-gray-500 my-3">
                <span className="font-bold pr-2">AWB number:</span>
                {params.id}
              </p>
              <hr />
            </div>
          </div>
          <div className="flex items-center pl-3 border shadow-lg border-gray-200 mt-4 w-full h-16 bg-white rounded-md ">
            <div className="font-semibold text-md text-gray-600">
              Shopping Solutions by Nimbus
            </div>
          </div>
        </div>

        <div className="flex items-center px-6 pb-6 pt-0 w-full col-span-2  bg-white rounded-md mb-5">
          <div className="mb-2 pb-1 w-full">
            <h3 className="font-semibold text-lg text-gray-600 pb-5">
              Tracking History
            </h3>

            <Timeline>
              {reverseTracking ? (
                reverseTracking.map((data) => {
                  return (
                    <Timeline.Item
                      key={data.key}
                      dot={
                        <CheckCircleTwoTone
                          style={{
                            //   color: "red",
                            fontSize: "20px",
                            marginTop: "15px",
                          }}
                          twoToneColor="#52c41a"
                        />
                      }
                    >
                      <div
                        className="flex items-center  w-full px-4  border-gray-200 shadow-lg  border py-2 rounded-xl mx-2"
                        // style={{
                        //   boxShadow: "0 10px 20px rgb(8 21 66 / 6%)",
                        //   zIndex: 9,
                        // }}
                      >
                        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 w-full">
                          <div className="flex items-center ">
                            <div className="text-sm text-gray-500">
                              <div className="text-base font-bold text-gray-500">
                                {data.status}
                              </div>
                              <div className="pt-2 text-sm text-gray-400 ">
                                {data.activity}
                              </div>
                              <div className="flex py-2 align-middle">
                                <svg
                                  className={`${classes.action_icons} mr-1`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="#ff6767"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                {data.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex align-middle ">
                            <div className="w-full flex justify-end px-4 text-gray-400">
                              {data.date}
                              <br />
                              {data.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Timeline.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
