import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'

const classes = {
  wrapper: "grid grid-cols-12 items-center justify-start mt-4"
}

const ImportListCard = ({
  sku,
  displayName,
  description,
  quantity,
  amount,
  price,
  image,
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={'col-span-2 col-start-1'}>
        <img src={image.src} alt={image.alt} className={'w-auto object-cover h-20 rounded-md mx-auto'} />
      </div>
      <div className={'col-start-3 col-span-7 flex flex-col items-start justify-start'}>
        <span className={'text-lg text-gray-700 font-medium'}>{displayName}</span>
        <span className={'text-sm text-gray-400 font-normal mb-1 overflow-ellipsis overflow-hidden'}>{description}</span>
        <div className={'flex flex-row items-center justify-start mb-1'}>
          <Tooltip title={'SKU'} >
            <Link className={'text-xs text-white bg-gray-600 font-light px-2 py-1 mr-1 rounded-full'} to={'/retailer/products/productId?sku=SKU00011'}>{sku}</Link>
          </Tooltip>
          <Tooltip title={'Price'}>
            <span className={'text-xs text-white bg-red-500 font-light px-2 py-1 mr-1 rounded-full'}>{price}</span>
          </Tooltip>
        </div>
      </div>
      <div className={'text-center'}>{quantity}</div>
      <div className={'text-center text-red-500'}>{amount}</div>
      <div className={'text-center'}>
        <button className={'px-4 py-0.5 rounded-full focus:outline-none focus:border-red-800 text-white bg-red-500 border border-red-500 mx-auto'}>Delete</button>
      </div>
      <div className={'w-full h-px bg-gray-200 my-4 col-span-full'} />
    </div>
  )
}

ImportListCard.defaultProps = {
  sku: "STD30492",
  displayName: "Sample Product",
  description: "Sample product Description.",
  quantity: 10,
  amount: 1230,
  price: 123,
  image: {
    src: "https://images.unsplash.com/photo-1590192746144-b92a837f8ddf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "Sample Image"
  },
}

export default ImportListCard
