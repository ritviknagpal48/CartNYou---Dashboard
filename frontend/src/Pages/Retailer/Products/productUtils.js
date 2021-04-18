import { axiosInstance } from "Contexts/useAxios";
import { message } from "antd";

module.exports = {
  getproductList: async () => {
    const res = await axiosInstance.get("/product-details");
    if (!res || res.status !== 200)
      return message.error("Cannot Fetch Product List.");
    return res.data;
  },
  updateImportList: async (id, payload) => {
    const result = await axiosInstance.put(`/product-details/${id}`, {
      product_details: payload,
    });
    if (!result || result.status !== 200)
      return message.error("Cannot Add product to import list.");
    return result.data;
  },
};
