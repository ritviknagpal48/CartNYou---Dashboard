import { useState } from "react"
import { useParams } from "react-router-dom"
import { ProductData } from "./productData"

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4",
  header: "w-full py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system md:flex flex-row",
  main_card: "bg-white",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
}

const ProductDetails = () => {

  const { id } = useParams()
  const dummyProduct = ProductData[0]

  const [imageIndex, setImageIndex] = useState(0)

  return (
    <div className={classes.wrapper}>
      <div className={'bg-white grid grid-cols-12 grid-rows-6 w-10/12 mx-auto rounded-lg overflow-hidden px-4 py-4'}>
        <div className={'col-start-1 row-start-1 col-span-6 row-span-5 h-72'}>
          <img src={dummyProduct.images[imageIndex].url} alt={dummyProduct.images[imageIndex].alt} className={'h-full object-cover cursor-pointer rounded-lg shadow'} />
        </div>
        <div className={'col-start-1 row-start-6 col-span-6 flex flex-row items-center justify-start'}>
          {
            dummyProduct.images.map((image, idx) => <img src={image.url} alt={image.alt} className={'h-12 w-12 object-cover mx-2 my-2 cursor-pointer rounded-lg shadow'} onClick={() => setImageIndex(idx)} />)
          }
        </div>
        <div className={'col-span-6 col-start-7 text-gray-700'}>
          Infomation Here
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
