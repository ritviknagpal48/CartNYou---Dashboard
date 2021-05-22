const axios = require("axios");
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  publishProduct: async (ctx) => {
    try {
      const { body } = ctx.request;

      const { userid: id, productid, channelid, retailer_price } = body;

      // get User
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id });

      // Check user exists
      if (!user) return ctx.res.status(400).json({ error: "User Not found" });

      // Get selected product from ID
      const entity = await strapi.services["product-details"].findOne({
        id: productid,
      });

      // Create Shopify product (according to docs)
      const shopify_product = {
        product: {
          title: entity.product_name,
          body_html: entity.product_description,
          images: entity.images.map((x) => ({ src: x.url })),
          product_type: entity.product_category.categoryName,
          tags: entity.product_tags,
          variants: [
            {
              weight: entity.weight,
              weight_unit: "g",
              price: retailer_price,
              sku: productid,
            },
          ],
        },
      };

      // get selected channel detailes
      const channel = user.retailer_shopify_channels.find(
        (ch) => ch.id === channelid
      );

      if (!channel)
        return ctx.res.status(400).json({ error: "Channel Not found" });

      const username = channel.api_key;
      const password = channel.key;
      const storeurl = channel.store_url;

      // make target url
      const targetURL = `https://${username}:${password}@${storeurl}/admin/api/2021-04/products.json`;

      // Publish to shopify
      await axios.post(targetURL, shopify_product);

      // Merge New product to Current Live List
      let newObject = {
        product_detail: entity,
        retailer_price,
        wholesaler_name: entity.wholesaler_details.fullname,
        category_name: entity.product_category.categoryName,
        channel_name: channel.channel_name,
      };

      let retailer_live_list = [
        ...user.retailer_live_list.map((x) => {
          const { id, _id, _v, ...toSend } = x;
          return toSend;
        }),
        // ...user.retailer_live_list,
        newObject,
      ];

      let retailer_import_list = [];
      for (item of user.retailer_import_list) {
        if (item.id === productid) continue;
        retailer_import_list.push(item);
      }

      const update_response = await strapi
        .query("user", "users-permissions")
        .update(
          { id },
          {
            retailer_live_list,
            retailer_import_list,
          }
        )
        .catch((error) => console.log({ updateError: error }));

      // Return published shopify item
      return {
        status: "success",
      };
    } catch (error) {
      return {
        status: "error",
        error,
      };
    }
  },
  updateImportList: async (ctx) => {
    try {
      const { body } = ctx.request;
      const { userid, items } = body;

      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userid });

      let new_import_list = user.retailer_import_list;
      new_import_list.push(...items);

      const strapi_response = await strapi
        .query("user", "users-permissions")
        .update(
          { id: userid },
          {
            retailer_import_list: new_import_list,
          }
        );

      return {
        status: "success",
      };
    } catch (error) {
      return {
        status: "error",
        data: error,
      };
    }
  },
  fetchImportList: async (ctx) => {
    try {
      const { body } = ctx.request;
      const { userid } = body;

      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userid }, [
          {
            path: "retailer_import_list",
            populate: [
              {
                path: "product_category",
              },
              {
                path: "sub_category",
              },
              {
                path: "sub_sub_category",
              },
            ],
          },
        ]);

      if (!user) throw new Error("User not found");

      const import_list = user.retailer_import_list;

      // const encoded = window.atob(JSON.stringify(import_list));

      return {
        status: "success",
        import_list,
        // encoded,
      };
    } catch (error) {
      return {
        status: "error",
        error,
      };
    }
  },
  settleOrder: async (ctx) => {
    try {
      const { body } = ctx.request;
      // const PICKRR_AUTH_KEY = "480054b2d5b28e22c91a52faaa23ee2c130720";
      const {
        product_id,
        shipping_address,
        retailer_id,
        wholesaler_id,
        product_quantity,
      } = body;

      // FIXME: Check correct body structure
      return {
        body,
      };

      // TODO: Generate Pickrr Info Object

      // TODO: #1 Call Pickrr API to place order

      // TODO: #2 Combine Response and Order Info

      // TODO: #3 Pass Data to wholesaler

      // TODO: #4 Return Status
      // return {
      //   status: "success",
      // };
    } catch (error) {
      return {
        status: "error",
        error,
      };
    }
  },
};
