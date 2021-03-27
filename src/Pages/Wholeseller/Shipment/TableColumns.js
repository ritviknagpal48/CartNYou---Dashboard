import { Button, Tag, Tooltip } from 'antd';

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
        render: (order) => (
            <Tooltip placement="top" title="Order Details">
                <Button style={{ border: "none", padding: "0px", color: "#ff4b4b", fontSize: "13px", fontWeight: 600, background: "transparent" }} >
                    {order}
                </Button>
            </Tooltip>
        ),
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
        render: (order) => (
            <Tooltip placement="top" title="Track Order">
                <Button style={{ border: "none", padding: "0px", color: "#44a5fe", fontSize: "13px", fontWeight: 600, background: "transparent" }} >
                    {order}
                </Button>
            </Tooltip>
        ),
        // width: "20%",
        // ...this.getColumnSearchProps("awb"),
    },
    {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag} style={{ borderRadius: "14px" }}>
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