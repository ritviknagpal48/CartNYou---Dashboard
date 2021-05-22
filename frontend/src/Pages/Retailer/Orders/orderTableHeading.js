const orderTableHeading = [
  {
    id: "1",
    title: "Product",
    dataIndex: "name",
  },
  {
    id: "2",
    title: "Order Id",
    dataIndex: "order_id",
    sorter: (a, b) => parseInt(a.order_id) - parseInt(b.order_id),
  },
  {
    id: "3",
    title: "Customer Name",
    dataIndex: "customer",
    render: (customer) => {
      return customer.first_name + " " + customer.last_name;
    },
  },
  {
    id: "4",
    title: "Pin Code",
    dataIndex: "shipping_address",
    render: (shipping_address) => {
      if (shipping_address && shipping_address.zip) {
        return shipping_address.zip;
      } else {
        return "-";
      }
    },
  },
  {
    id: "5",
    title: "Payment",
    dataIndex: "price",
    sorter: (a, b) => a.total_price - b.total_price,
  },
  {
    id: "6",
    title: "Method",
    dataIndex: "fulfillment_service",
  },
  {
    id: "8",
    title: "Status",
    dataIndex: "financial_status",
    filters: [
      { text: "Pending", value: "pending" },
      { text: "Paid", value: "paid" },
    ],
    onFilter: (value, record) => record.financial_status.includes(value),
  },
  {
    id: "9",
    title: "Call Status",
    dataIndex: "callStatus",
  },
];
export default orderTableHeading;
