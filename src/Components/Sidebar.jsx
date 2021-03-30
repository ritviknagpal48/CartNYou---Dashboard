// @ts-nocheck
import clsx from "clsx";
import { AuthContext } from "Contexts/Auth";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const classes = {
  wrapper: "w-max bg-white shadow-md z-20",
  wrapper_inner: "flex flex-col items-start justify-center h-full",
  menu_item:
    "w-full text-normal font-bold px-6 py-2 my-2 flex flex-row items-center justify-start font-sans-apple-system relative",
  menu_active: "text-red-400 hover:text-red-400",
  menu_normal: "text-gray-600 hover:text-red-400",
  tooltip_popup:
    "px-4 py-2 bg-white rounded-md text-sm text-gray-600 font-medium shadow-lg",
};

const Sidebar = ({ className, menuList }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const { user: { type } } = useContext(AuthContext)
  const { pathname } = useLocation();

  useEffect(() => {
    const s1 = pathname.replace(`/${type}/`, "")
    const s2 = s1.split("/")[0]
    const page = s2.replace("/", "");
    setActiveMenu(page);
  }, [pathname, type]);

  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className="items-center hidden" style={{ maxWidth: "180px" }}>
        <div className="logo" style={{ padding: "12px", margin: "20px 2px" }}>
          <img width="130px" src="/images/logo.png" alt="Workflow" />
        </div>
      </div>
      <div className={classes.wrapper_inner} id={"wrapper_inner"}>
        {
          menuList &&
          menuList.length > 0 &&
          menuList.map(item => (
            <Link
              to={item.path}
              className={clsx(classes.menu_item, {
                [classes.menu_active]: activeMenu === item.key,
                [classes.menu_normal]: activeMenu !== item.key,
              })}
            >
              {item.icon}
              <span className={classes.tooltip_popup}>{item.displayName}</span>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
