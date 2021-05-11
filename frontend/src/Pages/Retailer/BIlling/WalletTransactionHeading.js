import moment from "moment";

const DATE_FORMAT = "DD MMM YYYY";

const WalletTransactionHeading = [
  {
    id: "1",
    title: "Date",
    dataIndex: "transaction_date",
    render: (transaction_date) => {
      return moment(parseFloat(transaction_date) * 1000).format(DATE_FORMAT);
    },
    sorter: (a, b) =>
      moment.utc(a.transaction_date).diff(moment.utc(b.transaction_date)),
  },
  {
    id: "2",
    title: "TXN Type",
    dataIndex: "transaction_type",
    render: (transaction_type) => {
      return (
        ("" + transaction_type).charAt(0).toUpperCase() +
        ("" + transaction_type).substring(1).toLowerCase()
      );
    },
  },
  {
    id: "3",
    title: "Transaction Id",
    dataIndex: "transaction_id",
  },
  {
    id: "4",
    title: `Credit (₹)`,
    dataIndex: "transaction_amount",
    render: (transaction_amount) => {
      return transaction_amount > 0 ? transaction_amount : "-";
    },
  },
  {
    id: "5",
    title: "Debit (₹)",
    dataIndex: "transaction_amount",
    render: (transaction_amount) => {
      return transaction_amount < 0 ? transaction_amount : "-";
    },
  },
  {
    id: "7",
    title: "Closing Balance (₹)",
    dataIndex: "closing_balance",
  },
  {
    id: "8",
    title: "Description",
    dataIndex: "description",
  },
];
export default WalletTransactionHeading;
