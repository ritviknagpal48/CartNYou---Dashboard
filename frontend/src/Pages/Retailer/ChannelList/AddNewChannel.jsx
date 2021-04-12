import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
  header:
    "w-full  pt-3 pb-2 md:pr-14 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 rounded-md shadow-sm text-sm font-medium text-white  shadow-lg bg-white hover:text-red-500 hover:border hover:border-red-400 bg-red-500 hover:bg-red-100 hover:border hover:border-red-300",
  action_icons: "md:-ml-1 md:mr-2 h-6 w-6",
  button_title: "hidden md:block",
};

export class AddNewChannel extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.header} style={{ background: "#edf2f9" }}>
          <div className={classes.title}>Add New Channel</div>
          <div className={classes.buttons}>
            <button
              onClick={() => this.props.history.goBack()}
              className={`${classes.button_input}`}
            >
              <span className={classes.button_title}>Cancel</span>
            </button>
          </div>
        </div>
        <div className="body  pr-4 md:pr-14 pl-4">
          <hr style={{ margin: "20px 10px", borderColor: "#dfdfdf" }} />
        </div>
      </div>
    );
  }
}

export default withRouter(AddNewChannel);
