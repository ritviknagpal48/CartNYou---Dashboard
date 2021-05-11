import moment from 'moment';

const orderTableHeading = [
    {
        id: "1",
        title: "Order",
        dataIndex: "id",

    },
    {
        id: "2",
        title: "Date",
        dataIndex: "created_at",
        render: (created_at) => {
            return moment(created_at).format('DD MMM YYYY')
        },


        sorter: (a, b) => moment.utc(a.created_at).diff(moment.utc(b.created_at)),
        // sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,

    },
    {
        id: "3",
        title: "Customer Name",
        dataIndex: "customer",
        render: (customer) => {
            return (customer.first_name + " " + customer.last_name)
        },
    },
    {
        id: "4",
        title: "Pin Code",
        dataIndex: "billing_address",
        render: (billing_address) => {
            if (billing_address && billing_address.zip) {

                return (billing_address.zip)
            }
            else {
                return ("-")
            }
        },

    },
    {
        id: "5",
        title: "Payment",
        dataIndex: "total_price",
        sorter: (a, b) => a.total_price - b.total_price,
    },
    {
        id: "6",
        title: "Method",
        dataIndex: "gateway",
    },

    {
        id: "8",
        title: "Status",
        dataIndex: "financial_status",
        filters: [
            { text: 'Pending', value: 'pending' },
            { text: 'Paid', value: 'paid' },
        ],
        // filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.financial_status.includes(value),

    },
    {
        id: "9",
        title: "Call Status",
        dataIndex: "callStatus",
    },
]
export default orderTableHeading;