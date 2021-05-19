import { Button, Tag, Tooltip } from "antd";
import { useHistory } from "react-router";

const OrderDetailsRedirect = ({ order }) => {
  const history = useHistory();
  return (
    <Tooltip placement="top" title="Order Details">
      <Button
        onClick={() => history.push(`/wholeseller/orders/${order}`)}
        style={{
          border: "none",
          padding: "0px",
          color: "#ff4b4b",
          fontSize: "13px",
          fontWeight: 600,
          background: "transparent",
        }}
      >
        {order}
      </Button>
    </Tooltip>
  );
};

const TrackingDetailsRedirect = ({ tracking }) => {
  const history = useHistory();
  return (
    <Tooltip placement="top" title="Track Order">
      <Button
        onClick={() => history.push(`/wholeseller/track-order/${tracking}`)}
        style={{
          border: "none",
          padding: "0px",
          color: "#ff4b4b",
          fontSize: "13px",
          fontWeight: 600,
          background: "transparent",
        }}
      >
        {tracking}
      </Button>
    </Tooltip>
  );
};

const columns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
    // width: "30%",
    //   ...this.getColumnSearchProps("channel"),
  },
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    render: (order) => <OrderDetailsRedirect order={order} />,
    // width: "20%",
    // ...this.getColumnSearchProps("order"),
  },

  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    // width: "20%",
    // ...this.getColumnSearchProps("date"),
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    // width: "20%",
    // ...this.getColumnSearchProps("product"),
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    // width: "20%",
    // ...this.getColumnSearchProps("customer"),
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
    // defaultSortOrder: "descend",
    sorter: (a, b) => a.payment - b.payment,
    // width: "20%",
    // ...this.getColumnSearchProps("payment"),
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    filters: [
      {
        text: "COD",
        value: "COD",
      },
      {
        text: "Online",
        value: "Online",
      },
    ],
    // filterMultiple: false,
    onFilter: (value, record) => record.method.indexOf(value) === 0,
    // width: "20%",
    // ...this.getColumnSearchProps("method"),
  },

  {
    title: "Carrier",
    dataIndex: "carrier",
    key: "carrier",
    // width: "20%",
    // ...this.getColumnSearchProps("carrier"),
  },
  {
    title: "AWB",
    dataIndex: "awb",
    key: "awb",
    render: (awb) => <TrackingDetailsRedirect tracking={awb} />,
    // width: "20%",
    // ...this.getColumnSearchProps("awb"),
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag} style={{ borderRadius: "4px" }}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
    // width: "20%",
    // ...this.getColumnSearchProps("tags"),
  },
  {
    title: "Status",
    dataIndex: "status",
    // key: "status",
    // ...this.getColumnSearchProps("status"),
  },
];

export default columns;
