import React from "react";
import { Button, message } from "antd";
import Toolbar from "Components/Toolbar";
import { withRouter } from "react-router-dom";
import "./settings.css";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.history.push("/retailer/channel-list");
  };

  render() {
    return (
      <div className={`${classes.wrapper} setting-menu`}>
        <Toolbar title={"Settings"} actions={[]} />
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-2 pr-4 md:pr-14 pl-4">
          <div className="p-4 transition-shadow text-grey-600 rounded-lg shadow-xl hover:shadow-lg  bg-white">
            <div className="card-setting">
              <span className="span-button">Channels</span>
              <Button
                className="setting-button"
                type="primary"
                onClick={this.onClick}
              >
                Import Order From Your Online Store
              </Button>
            </div>
          </div>
          <div className="p-4 transition-shadow text-grey-600 rounded-lg shadow-xl hover:shadow-lg  bg-white">
            <div className="card-setting">
              <span className="span-button">Warehouse</span>
              <Button
                className="setting-button"
                type="primary"
                onClick={() => {
                  message.info("Feature available soon");
                }}
              >
                Manage Your Pickup Location
              </Button>
            </div>
          </div>
          <div className="p-4 transition-shadow text-grey-600 rounded-lg shadow-xl hover:shadow-lg  bg-white">
            <div className="card-setting">
              <span className="span-button">API</span>
              <Button
                className="setting-button"
                type="primary"
                onClick={() => {
                  message.info("Feature available soon");
                }}
              >
                Programmatically access master CRM data
              </Button>
            </div>
          </div>
          <div className="p-4 transition-shadow text-grey-600 rounded-lg shadow-xl hover:shadow-lg  bg-white">
            <div className="card-setting">
              <span className="span-button">Order Filter</span>
              <Button
                className="setting-button"
                type="primary"
                onClick={() => {
                  message.info("Feature available soon");
                }}
              >
                Filter Your orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Settings);
