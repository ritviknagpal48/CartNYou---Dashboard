import { Tag, Tooltip, Switch, Space } from "antd";
import { CheckOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const columns = [
    {
        title: "SKU",
        dataIndex: "sku",
    },
    {
        title: "Product Info",
        dataIndex: "productInfo",
        // ellipsis: {
        //   showTitle: false,
        // },


        render: (productInfo) => (
            <Tooltip placement="topLeft" title={productInfo}>
                {productInfo}
            </Tooltip>
        ),
    },
    {
        title: "MRP (Rs)",
        dataIndex: "mrp",
        // editable: true,
        sorter: (a, b) => a.mrp - b.mrp,
    },
    {
        title: "MP (Rs)",
        dataIndex: "mp",
        // editable: true,
        sorter: (a, b) => a.mp - b.mp,
    },
    {
        title: "B2B (Rs)",
        dataIndex: "b2b",
        // editable: true,
        sorter: (a, b) => a.b2b - b.b2b,
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        // editable: true,
        sorter: (a, b) => a.quantity - b.quantity,
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (status) => {
            return <Switch checked={status} size="small" />;
            // checkedChildren={<CheckOutlined />} checked={status} size="small" />;
        },
        // editable: false,
    },
    {
        title: "Admin Status",
        dataIndex: "admin",
        filters: [
            {
                text: "Approved",
                value: "approved",
            },
            {
                text: "Pending",
                value: "pending",
            },
            {
                text: "Rejected",
                value: "rejected",
            },
        ],
        filterMultiple: true,
        onFilter: (value, record) => record.admin.indexOf(value) === 0,

        render: (admin) => {
            let color = "magenta";
            if (admin === "approved") {
                color = "cyan";
            } else if (admin === "pending") {
                color = "gold";
            }
            return (
                <Tag color={color} key={admin} style={{ borderRadius: "4px" }}>
                    {admin}
                </Tag>
            );
        },
        // editable: false,
    },
    {
        title: "Action",
        dataIndex: "action",

        render: (text, record) => (
            <Space size="middle">
                <EditTwoTone />
                <DeleteTwoTone />
            </Space>
        ),
    },
];

export default columns;