import React from "react";
import AddProductForm from "Components/AddProductformComponent/AddProductForm";
import { Link } from "react-router-dom";

class HeaderWithSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawer: false,
    };
  }

  toggleDrawer = () => {
    this.setState({
      drawer: !this.state.drawer,
    });
  };

  render() {
    return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className=" pr-14 pl-4 w-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start text-black justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3l font-semibold">Add New Product</h3>
              <Link
                to="/wholeseller/products"
                className={"text-sm font-medium text-gray-500"}
              >
                Cancel
              </Link>
              {/* <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-7 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                // onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-gray-400   w-6 text-sm block outline-none focus:outline-none">
                  Cancel
                </span>
              </button> */}
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <AddProductForm />
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderWithSideBar;
