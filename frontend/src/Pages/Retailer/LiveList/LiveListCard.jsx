import { message, Modal, Space, Button, Empty } from "antd";
import { AuthContext } from "Contexts/Auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";

const classes = {
  wrapper: "grid grid-cols-12 items-center justify-start mt-4"
}

const LiveListCard = ({
  product_name: displayName,
  qunatity: quantity,
  product_mrp: price,
  images,
  id: product_id,
  onDeleted,
}) => {

  const [showModal, setShowModal] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const {
    additionalInfo: { id: userid },
    token,
  } = useContext(AuthContext);

  return (
    <div className={''}>
      <div className={'mb-4'}>
        <div
          className="bg-white my-2 text-gray-700 border border-gray-200 text-left font-medium text-base px-4 py-3 rounded-xl shadow-lg grid grid-cols-2 items-center w-full md:grid-cols-4"
        >
          <div className="card-detail" style={{ gridRow: '1 / span 2' }}>
            <div className="head-title">
              {
                images && images.length > 0 ? '' : 'Product Image'
              }
            </div>
            <div className="title-body">
              {" "}
              {images && images.length > 0 ? (
                <img className={'w-full h-auto rounded-md border border-solid border-gray-500'} src={images[0].url} alt={displayName} style={{ width: 100 }} />
              ) : (
                <Empty className={'text-sm'} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No Image'} imageStyle={{ width: '100%', height: 'auto' }} />
              )}
            </div>
          </div>
          {/* <div className="card-detail">
            <div className="head-title">Product SKU</div>
            <div className="title-body">{displayName}</div>
          </div> */}
          <div className="card-detail">
            <div className="head-title">Product Name</div>
            <div className="title-body">{quantity}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Channel Name</div>
            <div className="title-body">{price}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Category</div>
            <div className="title-body">{price}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Vendor Name</div>
            <div className="title-body">{price}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Retailer Price</div>
            <div className="title-body">{price}</div>
          </div>
          <div className="card-detail">
            <div className="head-title">Status</div>
            <div className="title-body">{price}</div>
          </div>
        </div>
      </div>

      <Modal
        title={<div className="flex gap-x-2">Remove from Import List</div>}
        width={"100%"}
        visible={showModal}
        confirmLoading={isProductAdded}
        // onOk={(e) => {
        //   setIsProductAdded(true);
        //   removeItemFromImportList(userid, product_id, token)
        //     .then(() => {
        //       message.success("Product removed successfully");
        //       if (!!onDeleted && typeof onDeleted === "function")
        //         onDeleted(product_id);
        //       setShowModal(false);
        //       setIsProductAdded(false);
        //     })
        //     .catch((err) => {
        //       message.error(err.message);
        //       setShowModal(false);
        //       setIsProductAdded(false);
        //     });
        // }}
        onCancel={() => setShowModal(false)}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "none",
          maxWidth: "520px",
          paddingBottom: "0px",
        }}
        bodyStyle={{
          boxShadow: "none",
          height: "100%",
        }}
        maskStyle={{ background: "#00000034" }}
      >
        Remove <span className="font-semibold">{displayName}</span> from your
        import list?
        <br />
        <br />
        <span className="text-gray-400 font-normal text-sm">
          Once removed, it cannot be recovered.
        </span>
      </Modal>
    </div>
  );
}

export default LiveListCard
