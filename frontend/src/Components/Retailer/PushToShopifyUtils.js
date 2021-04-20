import axios from "axios";
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

    const shopify_channels = !!userInfo.data.shopifychannels ? userInfo.data.shopifychannels : []
    return [shopify_list, shopify_channels];
};


export const getSelectedShopifyChannel = async (selectedChannelID, shopifychannels) => {

    let selectedChannel = {}
    for (let index = 0; index < shopifychannels.length; index++) {
        if (shopifychannels[index].id === selectedChannelID) {
            selectedChannel = shopifychannels[index];
            break
        }
    }

    return selectedChannel
}

export const getSelectedProduct = async (id, token) => {
    const product = await axiosInstance.get(`/product-details/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    return product.data;
}

export const getPublishingProduct = async (retailer_price, selectedProduct) => {

    let title = selectedProduct.product_name;
    let body_html = selectedProduct.product_description;
    let image = selectedProduct.images;
    let product_type = selectedProduct.product_category.categoryName;
    let tags = selectedProduct.product_tags;
    let variants = [{
        weight: selectedProduct.weight,
        weight_unit: "g",
        price: retailer_price,
        sku: selectedProduct.product_main_sku
    }]

    const shopify_product = {
        title,
        body_html, image,
        product_type, tags,
        variants
    }

    return shopify_product
}

export const publishToShopify = async (selectedChannel, publishingProduct) => {

    const username = selectedChannel.api_key;
    const password = selectedChannel.key;
    const storeurl = selectedChannel.store_url;
    console.log(publishingProduct);
    // var jsonProduct = JSON.stringify(publishingProduct);
    // console.log(jsonProduct);


    // await axios.post(`https://4b3b6a49510835bfd05cc1751d7766a3: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@vastra-onlines.myshopify.com/admin/api/2021-04/products.json`,
    // await axios.post(`https://${username}:${password}@${storeurl}/admin/api/2021-04/products.json`,
    //     {
    //         product: publishingProduct
    //     },
    //     {
    // auth: {
    //     username: username,
    //     password: password
    // },
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //         }
    //     }).then((response) => {
    //         console.log("yes");
    //     }).catch((error) => {
    //         console.log(error);
    //     })

    axios({
        method: 'post',
        url: `https://${username}:${password}@${storeurl}/admin/api/2021-04/products.json`,
        data: {
            product: publishingProduct
        },
        auth: {
            username: username,
            password: password
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

    })
        .then((response) => {
            console.log("yes");
        }).catch((error) => {
            console.log(error);
        })

    // console.log("yes published");
    return;
}
/**
 * Add items to the live list.
 * @param {String} userId ID of the retailer
 * @param {Object} items object of items to be added to the list.
 * @param {String} selectedChannelID id of selected channel.
 * @returns Updated liveList for the retailer
 */
export const addItemToLiveList = async (userId, items, token, selectedChannelID) => {
    if (!userId || !items) return new Error("UserID and Items are required.");

    let res_array = await getLatestRetailerProductList(userId, token);
    let shopify_list = res_array[0];
    let shopifychannels = res_array[1];

    let selectedChannel = await getSelectedShopifyChannel(selectedChannelID, shopifychannels)
    let selectedProduct = await getSelectedProduct(items.product_detail, token)

    let publishingProduct = await getPublishingProduct(items.retailer_price, selectedProduct)

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
