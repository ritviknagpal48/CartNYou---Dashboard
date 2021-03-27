// @ts-nocheck
import { useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router"

const classes = {
  wrapper: "text-gray-500 text-lg"
}

const OrderDetails = () => {
  const history = useHistory()
  const { params } = useRouteMatch()

  useEffect(() => {
    if (!params.id) history.goBack();
  }, [params])

  return (
    <div className={classes.wrapper}>
      Details of Order {params.id} goes here
    </div>
  )
}

export default OrderDetails
