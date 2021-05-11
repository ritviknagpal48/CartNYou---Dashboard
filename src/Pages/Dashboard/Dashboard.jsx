const classes = {
  wrapper: ""
}

const Dashboard = () => {
  return (
    <div className={classes.wrapper}>
      <div className={'w-full mx-auto px-6 py-6 relative'}>
        <div className={'container flex flex-row items-center justify-evenly mx-auto'}>
          <div className={'bg-white text-gray-700 px-6 py-4 text-center shadow-md rounded-md'}>
            <span className={'container'}>Card Info 1</span>
          </div>
          <div className={'bg-white text-gray-700 px-6 py-4 text-center shadow-md rounded-md'}>
            <span className={'container'}>Card Info 2</span>
          </div>
          <div className={'bg-white text-gray-700 px-6 py-4 text-center shadow-md rounded-md'}>
            <span className={'container'}>Card Info 3</span>
          </div>
          <div className={'bg-white text-gray-700 px-6 py-4 text-center shadow-md rounded-md'}>
            <span className={'container'}>Card Info 4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
