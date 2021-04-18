import { Tooltip, Image, message, Modal } from 'antd'
import { AuthContext } from 'Contexts/Auth';
import { useContext } from 'react';
import { useState } from 'react'
import { removeItemFromImportList } from './importListUtils';
// import { useState } from 'react'

const classes = {
  wrapper: "grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-0 items-center justify-start mt-4 bg-white rounded-md shadow-lg py-4"
}

const ImportListCard = ({
  product_name: displayName,
  quantity,
  product_mrp: price,
  images,
  product_tags: tags,
  id: product_id,
  onDeleted
  // id: prodId
}) => {

  const [showModal, setShowModal] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false)
  const { additionalInfo: { id: userid }, token } = useContext(AuthContext)

  return (
    <div className={classes.wrapper}>
      <div className={'col-span-4 md:col-span-2 col-start-1 hidden md:block'}>
        <Image src={images && images.length > 0 ? images[0] : null} alt={displayName} className={'w-auto object-cover h-20 rounded-md mx-auto'} />
      </div>
      <div className={'col-start-1 col-span-4 md:col-start-3 pl-4 md:pl-0 md:col-span-7 flex flex-col items-start justify-start'}>
        <span className={'text-lg text-gray-700 font-medium'}>{displayName}</span>
        {/* <span className={'text-sm text-gray-400 font-normal mb-1 overflow-ellipsis overflow-hidden'}>{description}</span> */}
        <div className={'flex flex-row items-center justify-start mb-1'}>
          <Tooltip title={'Tags'} >
            <span className={'text-xs text-white bg-gray-600 font-light px-2 py-1 mr-1 rounded-full'}>{tags}</span>
          </Tooltip>
          {/* <Tooltip title={'Price'}>
            <span className={'text-xs text-white bg-red-500 font-light px-2 py-1 mr-1 rounded-full'}>{price}</span>
          </Tooltip> */}
        </div>
      </div>
      <div className={'text-left md:text-center text-red-500 font-bold pl-4 md:pl-0'}>{quantity}</div>
      <div className={'text-left md:text-center text-red-500 font-bold'}>{parseFloat(price)}</div>
      <div className={'text-right md:text-center col-span-2 md:col-auto pr-4 md:pr-0'}>
        <button
          className={'focus:outline-none mx-auto text-red-500 focus:text-red-900'}
          onClick={e => setShowModal(true)}
        >
          <svg className={'h-5 w-5'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <Modal
        title={
          <div className="flex gap-x-2">
            Remove from Import List
          </div>
        }
        width={"100%"}
        visible={showModal}
        confirmLoading={isProductAdded}
        onOk={e => {
          setIsProductAdded(true)
          removeItemFromImportList(userid, product_id, token).then(() => {
            message.success('Product removed successfully');
            if (!!onDeleted && typeof onDeleted === 'function') onDeleted(product_id)
            setShowModal(false)
            setIsProductAdded(false)
          }).catch(err => {
            message.error(err.message);
            setShowModal(false)
            setIsProductAdded(false)
          })
        }}
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
        Remove <span className="font-semibold">{displayName}</span> from your import list?
        <br /><br />
        <span className="text-gray-400 font-normal text-sm">Once removed, it cannot be recovered.</span>
      </Modal>
    </div>
  )
}

export default ImportListCard
