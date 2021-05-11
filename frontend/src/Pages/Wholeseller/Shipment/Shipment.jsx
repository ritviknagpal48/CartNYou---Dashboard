import React from "react";
import tableColummns from "./TableColumns";
import tableData from "./TableData";
// import ProductTable from "Components/TableComponent";
import ShipmentTableCard from "./ShipmentTableCard";
import "./Shipment.css";

class Shipment extends React.Component {
  state = {
    searchText: "",
    searchedColumn: [
      "order",
      "product",
      "customer",
      "awb",
      "method",
      "carrier",
    ],
  };

  render() {
    return (
      <div className="w-full pr-14 pl-4 ">
        <div
          className="w-full  py-3 flex flex-row items-center justify-between"
          style={{ background: "#edf2f9" }}
        >
          <div className="text-2xl text-gray-600  hidden md:block font-sans-apple-system">
            Shipments
          </div>
        </div>
        <ShipmentTableCard
          heading={tableColummns}
          data={tableData}
          searchedColumn={this.state.searchedColumn}
          defaultSearchColumn={this.state.searchedColumn[0]}
        />
      </div>
    );
  }
}

export default Shipment;
