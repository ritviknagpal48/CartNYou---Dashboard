import { axiosInstance } from "Contexts/useAxios";

export const getLatestRetailerProductList = async (userId, token) => {
  if (!userId) return new Error("UserID is required.");
  const userInfo = await axiosInstance.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!userInfo || userInfo.status !== 200)
    return new Error("Cannot Get User info for specified ID.");

  const shopify_list = !!userInfo.data.retailer_live_products
    ? userInfo.data.retailer_live_products
    : [];

  return shopify_list;
};

export const getSelectedProduct = async (id, token) => {
  const product = await axiosInstance.get(`/product-details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return product.data;
};

export const getPublishingProduct = async (retailer_price, selectedProduct) => {
  let title = selectedProduct.product_name;
  let body_html = selectedProduct.product_description;
  let image = selectedProduct.images;
  let product_type = selectedProduct.product_category.categoryName;
  let tags = selectedProduct.product_tags;
  let variants = [
    {
      weight: selectedProduct.weight,
      weight_unit: "g",
      price: retailer_price,
      sku: selectedProduct.product_main_sku,
    },
  ];

  const shopify_product = {
    title,
    body_html,
    image,
    product_type,
    tags,
    variants,
  };

  return shopify_product;
};

export const publishToShopify = async (selectedChannel, publishingProduct) => {
  const username = selectedChannel.api_key;
  const password = selectedChannel.key;
  const storeurl = selectedChannel.store_url;

  return await axiosInstance
    .post("/proxy", {
      body: {
        product: publishingProduct,
      },
      targetURL: `https://${username}:${password}@${storeurl}/admin/api/2021-04/products.json`,
      method: "POST",
    })
    .catch((error) => {
      // console.log(error);
    });
};
/**
 * Add items to the live list.
 * @param {String} userId ID of the retailer
 * @param {Object} items object of items to be added to the list.
 * @param {String} selectedChannel id of selected channel.
 * @returns Updated liveList for the retailer
 */
export const addItemToLiveList = async (
  userId,
  items,
  token,
  selectedChannel
) => {
  if (!userId || !items) return new Error("UserID and Items are required.");

  let res = await getLatestRetailerProductList(userId, token);
  let shopify_list = res;
  //   let shopifychannels = res_array[1];

  let selectedProduct = await getSelectedProduct(items.product_detail, token);

  let publishingProduct = await getPublishingProduct(
    items.retailer_price,
    selectedProduct
  );

  await publishToShopify(selectedChannel, publishingProduct);

  shopify_list.push(items);
  // const new_shopify_list = [...new Set([...shopify_list, ...items])];
  const response = await axiosInstance.put(
    `/users/${userId}`,
    {
      retailer_live_products: shopify_list,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // return console.log({ shopify_list, items });
  return response.data;
};

/**
 * Remove items from the import list.
 * @param {String} userId ID of the retailer
 * @param {String} item ID of item to be removed from the list.
 * @returns Updates ImportList for the retailer
 */
export const removeItemFromLiveList = async (userId, item, token) => {
  if (!userId || !item || !token)
    return new Error("UserID, item and Token are required.");

  let shopify_list = await getLatestRetailerProductList(userId, token);
  shopify_list = shopify_list.map((obj) => obj.id);
  const new_shopify_list = shopify_list.filter((x) => x !== item);
  const response = await axiosInstance.put(
    `/users/${userId}`,
    {
      retailer_live_products: new_shopify_list,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
