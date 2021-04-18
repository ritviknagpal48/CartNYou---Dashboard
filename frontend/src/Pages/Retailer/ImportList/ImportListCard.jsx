import { Tooltip, Image } from 'antd'
import { useState } from 'react'

const classes = {
  wrapper: "grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-0 items-center justify-start mt-4 bg-white rounded-md shadow-lg py-4"
}

const ImportListCard = ({
  product_name: displayName,
  quantity,
  product_mp: price,
  images,
  product_tags: tags,
  // id: prodId
}) => {

  const [cardInfo, setCardInfo] = useState({
    displayName,
    quantity,
  })




  return (
    <div className={classes.wrapper}>
      <div className={'col-span-4 md:col-span-2 col-start-1 hidden md:block'}>
        <Image placeholder={true} src={images && images.length > 0 && images[0].src} alt={displayName} className={'w-auto object-cover h-20 rounded-md mx-auto'} />
      </div>
      <div className={'col-start-1 col-span-4 md:col-start-3 pl-4 md:pl-0 md:col-span-7 flex flex-col items-start justify-start'}>
        <span className={'text-lg text-gray-700 font-medium'}>{displayName}</span>
        {/* <span className={'text-sm text-gray-400 font-normal mb-1 overflow-ellipsis overflow-hidden'}>{description}</span> */}
        <div className={'flex flex-row items-center justify-start mb-1'}>
          <Tooltip title={'Tags'} >
            <span className={'text-xs text-white bg-gray-600 font-light px-2 py-1 mr-1 rounded-full'}>{tags}</span>
          </Tooltip>
          <Tooltip title={'Price'}>
            <span className={'text-xs text-white bg-red-500 font-light px-2 py-1 mr-1 rounded-full'}>{price}</span>
          </Tooltip>
        </div>
      </div>
      <div className={'text-left md:text-center text-red-500 font-bold pl-4 md:pl-0'}>
        <input type="number" defaultValue={1} min={1} max={quantity} onChange={e => setCardInfo({ quantity: e.target.valueAsNumber })} className={'w-9 px-0 border-transparent text-center'} />
      </div>
      <div className={'text-left md:text-center text-red-500 font-bold'}>{(parseFloat(cardInfo.quantity) * parseFloat(price))}</div>
      <div className={'text-right md:text-center col-span-2 md:col-auto pr-4 md:pr-0'}>
        <button className={'focus:outline-none mx-auto text-red-500 focus:text-red-900'}>
          <svg className={'h-5 w-5'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ImportListCard
