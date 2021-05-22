import { Checkbox, Empty } from "antd";
import "./LiveList.css";

const LiveListCard = ({
  retailer_price,
  product_detail: { product_name, admin_status, images },
  wholesaler_name,
  category_name,
  channel_name,
}) => {
  return (
    <div className={""}>
      <div className={"mb-2"}>
        <div className="liveList-card bg-white my-2 text-gray-700 border border-gray-200 text-left font-medium text-base pl-8 pr-4 py-4 rounded-xl shadow-lg grid grid-col-2  items-start w-full">
          <div className="absolute left-2 top-auto bottom-auto">
            <Checkbox />
          </div>
          <div className="card-detail col-span-2 md:col-span-1">
            <div
              className="title-body"
              style={{ width: 70, height: 70, margin: "auto" }}
            >
              {images && images.length > 0 ? (
                <img
                  className={"w-full h-full rounded-md "}
                  src={images[0].url}
                  alt={"N/A"}
                />
              ) : (
                <Empty
                  // className={"text-sm"}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"No Image"}
                  imageStyle={{ height: "42px" }}
                  style={{ margin: "2px" }}
                />
              )}
            </div>
          </div>

          <div className="card-detail col-span-2 md:col-span-1">
            <div className="head-title">Product Name</div>
            <div className="title-body">{product_name}</div>
          </div>

          <div className="card-detail col-span-2 md:col-span-1">
            <div className="head-title">Channel Name</div>
            {channel_name ? (
              <div className="title-body">{channel_name}</div>
            ) : (
              "None"
            )}
          </div>

          <div className="card-detail">
            <div className="head-title">Category</div>
            <div className="title-body">{category_name}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Vendor Name</div>
            <div className="title-body">{wholesaler_name}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Retailer Price</div>
            <div className="title-body">{retailer_price}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Status</div>
            <div className="title-body">{admin_status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveListCard;
