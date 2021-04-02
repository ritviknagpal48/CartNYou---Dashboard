import { message } from 'antd';
import Toolbar from 'Components/Toolbar';
import ImportListCard from "Pages/Retailer/ImportList/ImportListCard";
import { ImportListData } from "./importListData";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const ImportListActions = [
  {
    onClick: () => {
      message.success('List Cleared', 1)
    },
    icon: (
      <svg className={classes.action_icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    name: "Clear",
  }
]

const ImportList = () => {
  return (
    <div className={classes.wrapper}>
      <Toolbar title={'Import List'} actions={ImportListActions} />
      <div className={'px-3 py-3 text-gray-700 bg-white rounded-md shadow-lg w-full'}>
        <div className={'flex flex-row text-sm text-gray-500 mb-2'}>
          <span className={'w-9/12'}>Product</span>
          <span className={'w-1/12 text-center'}>Quantity</span>
          <span className={'w-1/12 text-center'}>Amount</span>
          <span className={'w-1/12 text-center'}>Actions</span>
        </div>
        <div className={'w-full h-px bg-gray-200'} />
        {
          ImportListData.map(ilistItem => <ImportListCard {...ilistItem} />)
        }
      </div>
    </div>
  )
}

export default ImportList
