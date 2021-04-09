import React from "react";
import AddProductForm from "Components/AddProductformComponent/AddProductForm";
import { Link, withRouter } from "react-router-dom";

class HeaderWithSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawer: false,
      editProduct: false,
    };
  }

  async componentDidMount() {
    const edit =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.edit
        ? this.props.location.state.edit
        : false;
    if (edit) {
      this.setState({
        editProduct: true,
      });
    }
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
          <div className="border-0 rounded-lg mb-8 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start text-black justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3l font-semibold">
                {this.state.editProduct
                  ? "Edit Product Information"
                  : "Add New Product"}
              </h3>
              <Link
                to="/wholeseller/products"
                className={
                  "text-sm  text-red-400  font-semibold flex hover:text-red-600"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
              <AddProductForm edit={this.state.editProduct} />
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderWithSideBar);
