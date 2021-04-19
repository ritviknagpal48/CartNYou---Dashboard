import { message, Spin, Empty, Modal, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Toolbar from "Components/Toolbar";
import ImportListCard from "Pages/Retailer/ImportList/ImportListCard";
import { useEffect, useState } from "react";
// import { ImportListData } from "./importListData";
// import { getLatestImportList } from './importListUtils';
import { useContext } from "react";
import { AuthContext } from "Contexts/Auth";
import useAxios from "Contexts/useAxios";
import './importList.css';

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 pb-8",
  header: "w-full  py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
  buttons: "flex item-center flex-row justify-end",
  button_input:
    "inline-flex items-center px-4 py-1 mx-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500",
  action_icons: "md:-ml-1 md:mr-2 h-5 w-5",
  button_title: "hidden md:block",
};

const ImportList = () => {
  const {
    additionalInfo: { id },
    token,
  } = useContext(AuthContext);
  const [importListData, setImportListData] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [paginationState, setPaginationState] = useState({
    pageSize: 2,
    currentPage: 1,
  });
  const [selectedItems, setSelectedItems] = useState([]);

  const { axios } = useAxios();

  const ImportListActions = [
    {
      onClick: () => {
        message.warn("Pushing to shopify. Function not connected yet.");
      },
      icon: (
        <svg
          className={classes.action_icons}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
      name: "Push to Shopify",
      hidden: selectedItems.length === 0
    },
    {
      onClick: () => {
        setShowModal(true);
      },
      icon: (
        <svg
          className={classes.action_icons}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      name: "Clear List",
    },
  ];

  useEffect(() => {
    // getLatestImportList(id, token).then(res => {
    //   setImportListData(res)
    // }).catch(err => message.error(err.message));

    axios
      .get(`/users/${id}`)
      .then((res) => {
        const import_list =
          res.data && res.data.import_list_products
            ? res.data.import_list_products
            : [];

        setImportListData(import_list);
        setForceUpdate(false);
      })
      .catch((err) => console.error({ err }));
  }, [id, forceUpdate]);

  const handleSelectionChange = (id, add) => {
    if (add) {
      setSelectedItems((p) => [...new Set([...p, id]).values()]);
    } else {
      const newItems = [...selectedItems.values()].filter(
        (item) => item !== id
      );
      setSelectedItems(newItems);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Toolbar title={"Import List"} actions={ImportListActions} />

      <Spin
        spinning={!importListData}
        size={"large"}
        indicator={
          <LoadingOutlined style={{ fontSize: 36, color: "#ef4444" }} spin />
        }
      >
        {importListData && importListData.length > 0 ? (
          importListData
            .slice(
              (paginationState.currentPage - 1) * paginationState.pageSize,
              paginationState.currentPage * paginationState.pageSize
            )
            .map((ilistItem, idx) => (
              <ImportListCard
                {...ilistItem}
                key={ilistItem.id}
                index={idx}
                onDeleted={() => setForceUpdate((p) => !p)}
                onSelected={(id, mode) => handleSelectionChange(id, mode)}
              />
            ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <Pagination
          total={
            importListData && importListData.length ? importListData.length : 0
          }
          defaultCurrent={1}
          pageSizeOptions={[2, 5, 10, 20]}
          pageSize={paginationState.pageSize}
          current={paginationState.currentPage}
          onChange={(page, pageSize) => {
            setPaginationState({
              currentPage: page,
              pageSize: pageSize,
            });
          }}
          showSizeChanger
          // showQuickJumper
          responsive
          style={{ textAlign: "center" }}
        // showTotal={(total) => `Total ${total} products`}
        />
      </Spin>

      <Modal
        title={<div className="flex gap-x-2">Clear Import List</div>}
        width={"100%"}
        visible={showModal}
        confirmLoading={modalLoading}
        onOk={(e) => {
          setModalLoading(true);

          axios
            .put(`/users/${id}`, {
              import_list_products: [],
            })
            .then((res) => {
              message.success("List Cleared Successfully.");
              setForceUpdate((p) => !p);
              setShowModal(false);
              setModalLoading(false);
            })
            .catch((err) => {
              message.error(err.message);
              setForceUpdate((p) => !p);
              setShowModal(false);
              setModalLoading(false);
            });
        }}
        onCancel={() => setShowModal(false)}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "none",
          maxWidth: "520px",
          paddingBottom: "0px",
        }}
        bodyStyle={{
          boxShadow: "none",
          height: "100%",
        }}
        maskStyle={{ background: "#00000034" }}
      >
        Remove all items from your import list?
        <br />
        <br />
        <span className="text-gray-400 font-normal text-sm">
          Once removed, they cannot be recovered.
        </span>
      </Modal>
    </div>
  );
};

export default ImportList;
