import { axiosInstance } from "Contexts/useAxios";

export const getLatestImportList = async (userId, token) => {
  if (!userId) return new Error("UserID is required.");
  const userInfo = await axiosInstance.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!userInfo || userInfo.status !== 200)
    return new Error("Cannot Get User info for specified ID.");

  const import_list = !!userInfo.data.import_list_products
    ? userInfo.data.import_list_products
    : [];
  return import_list;
};

/**
 * Add items to the import list.
 * @param {String} userId ID of the retailer
 * @param {Array} items Array of items to be added to the list.
 * @returns Updated ImportList for the retailer
 */
export const addItemToImportList = async (userId, items, token) => {
  if (!userId || !items) return new Error("UserID and Items are required.");

  let import_list = await getLatestImportList(userId, token);
  import_list = import_list.map((obj) => obj.id);

  const new_import_list = [...new Set([...import_list, ...items])];

  // return console.log({ import_list, new_import_list, userId, items, token });

  const response = await axiosInstance.put(
    `/users/${userId}`,
    {
      import_list_products: new_import_list,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Remove items from the import list.
 * @param {String} userId ID of the retailer
 * @param {String} item ID of item to be removed from the list.
 * @returns Updates ImportList for the retailer
 */
export const removeItemFromImportList = async (userId, item, token) => {
  if (!userId || !item || !token)
    return new Error("UserID, item and Token are required.");
  let import_list = await getLatestImportList(userId, token);
  import_list = import_list.map((obj) => obj.id);
  const new_import_list = import_list.filter((x) => x !== item);
  const response = await axiosInstance.put(
    `/users/${userId}`,
    {
      import_list_products: new_import_list,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
