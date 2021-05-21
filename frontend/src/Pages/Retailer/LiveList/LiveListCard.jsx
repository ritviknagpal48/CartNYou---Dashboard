import { Checkbox } from "antd";
import "./LiveList.css";

const LiveListCard = ({
  retailer_price,
  product_detail: { product_name, admin_status },
  wholesaler_name,
  category_name,
}) => {
  return (
    <div className={""}>
      <div className={"mb-2"}>
        <div className="bg-white my-2 text-gray-700 border border-gray-200 text-left font-medium text-base pl-6 pr-4 py-4 rounded-xl shadow-lg grid md:grid-cols-6 items-center w-full">
          <div className="absolute left-2 top-auto bottom-auto">
            <Checkbox />
          </div>
          <div className="card-detail">
            <div className="head-title">Product Name</div>
            <div className="title-body">{product_name}</div>
          </div>
          {/* <div className="card-detail">
            <div className="head-title">Channel Name</div>
            <div className="title-body">{extraInfo.channel}</div>
          </div> */}
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
