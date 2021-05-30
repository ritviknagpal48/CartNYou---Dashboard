import { Button } from "antd";
import Toolbar from "Components/Toolbar";
import React from "react";
import { withRouter } from "react-router-dom";
import "./settings.css";

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
};

class Settings extends React.Component {
  handleRouting(route) {
    if (!route || !route.trim()) return;
    this.props.history.push(route);
  }

  render() {
    return (
      <div className={`${classes.wrapper} setting-menu`}>
        <Toolbar title={"Settings"} actions={[]} />
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-2 md:pr-14">
          <div
            className="p-4 transition-shadow text-grey-600 rounded-lg shadow-xl hover:shadow-lg  bg-white"
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div className="card-setting">
              <span className="span-button">Warehouse</span>
              <Button
                className="setting-button"
                type="primary"
                onClick={() => {
                  // message.info("Feature available soon");
                  this.handleRouting("/wholesaler/warehouses");
                }}
              >
                Manage Your Pickup Location
              </Button>
            </div>
          </div>
          <div
            className="p-4 transition-shadow text-grey-600 rounded-lg shadow-xl hover:shadow-lg  bg-white"
            style={{ borderRadius: "8px", border: "1px solid #e2e2e2" }}
          >
            <div className="card-setting">
              <span className="span-button">KYC</span>
              <Button
                className="setting-button"
                type="primary"
                onClick={() => {
                  this.handleRouting("/wholesaler/kyc-information");
                }}
              >
                Manage your account KYC information
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Settings);
