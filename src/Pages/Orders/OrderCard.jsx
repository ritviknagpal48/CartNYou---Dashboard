import clsx from "clsx";

const classes = {
  wrapper:
    "text-gray-700 px-6 py-4 shadow-xl bg-white rounded-md mx-6 my-6 divide-red-100 ",
  title: "text-sm pl-3 text-left w-3/12 py-3",
  card_info: "mt-2 leading-6",
  card_title: "font-bold tracking-wide"
};

const ItemRow = ({ sku, description, mrp: price, qty }) => {
  return (
    <div className={'flex flex-row items-center justify-start'}>
      <div className={clsx(classes.title, classes.card_title, 'w-9/12 grid grid-cols-2')}>
        <img src="/images/logo.png" alt={sku} className={'h-6 w-auto col-auto col-start-1 row-start-1 row-span-3 self-center'} />
        <span className={'text-sm font-normal mb-l'}>SKU: {sku}</span>
        <span className={'text-sm font-light mb-1'}>{description}</span>
        <span className={'text-xs font-bold bg-green-200 text-gray-700 rounded-lg w-max px-2'}>₹ {price}</span>
      </div>
      <div className={clsx(classes.title, classes.card_title)}>{qty}</div>
      <div className={clsx(classes.title, classes.card_title)}>₹ {price * qty}</div>
    </div>
  )
}

const OrderCard = ({ orderId, items, status, tracking, orderDate, payment, totalQty, totalAmount, shipTo }) => {
  const name = 'Card 1'
  return (
    <div className={classes.wrapper}>
      <div className={"flex flex-row mx-auto items-start pb-2"}>
        <div className={classes.title}>
          <span className={classes.card_title}>Order Details</span>
          <div className={classes.card_info}>{orderId} <br /> {orderDate}</div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Payment Method</span>
          <div className={classes.card_info}>{payment}</div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Ship To</span>
          <div className={classes.card_info}>{shipTo}</div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Traking Details</span>
          <div className={classes.card_info}>{!tracking ? 'Unavailable' : tracking}</div>
        </div>
        <div className={classes.title}>
          <span className={classes.card_title}>Status</span>
          <div className={classes.card_info}>{status}</div>
        </div>
      </div>
      <hr className={'text-red-400'} />
      <div className={'flex flex-row items-center justify-start -mb-2'}>
        <div className={clsx(classes.title, classes.card_title, 'w-9/12')}>Items</div>
        <div className={clsx(classes.title, classes.card_title)}>Qty</div>
        <div className={clsx(classes.title, classes.card_title)}>Amount</div>
      </div>
      <hr className={'text-red-400'} />
      {
        items &&
        items.map(item => (
          <ItemRow
            {...item}
          />
        ))
      }
      <hr className={'text-red-400'} />
      <div className={'flex flex-row items-center justify-start'}>
        <div className={clsx(classes.title, classes.card_title, 'w-9/12 text-center')}>Total</div>
        <div className={clsx(classes.title, classes.card_title, 'flex flex-col items-start justify-center')}>
          <span>{items.reduce((total, val) => {
            total += parseInt(val.qty)
            return total
          }, 0)}</span>
        </div>
        <div className={clsx(classes.title, classes.card_title, 'flex flex-col items-start justify-center')}>
          <span className={'text-red-400'}>₹ {items.reduce((total, val) => {
            total += parseFloat(val.mrp) * parseInt(val.qty)
            return total
          }, 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
