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

      const { userid, productid, channelid, retailer_price } = body;

      // get User
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ id: userid });

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
      };

      // let new_live_list = [...user.retailer_live_list, newObject];
      let new_live_list = user.retailer_live_list;
      new_live_list.push(newObject);

      let new_import_list = user.retailer_import_list.filter(
        (x) => x.id !== productid
      );

      const strapi_response = await strapi
        .query("user", "users-permissions")
        .update(
          { id: userid },
          {
            retailer_live_list: new_live_list,
            retailer_import_list: new_import_list,
          }
        );

      // Return published shopify item
      return {
        status: "success",
        data: new_import_list,
      };
    } catch (error) {
      return {
        status: "error",
        error,
      };
    }
  },
};
