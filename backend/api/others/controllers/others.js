const axios = require("axios").default;

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

      await strapi
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

      await strapi.query("user", "users-permissions").update(
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
      const PICKRR_AUTH_KEY = "480054b2d5b28e22c91a52faaa23ee2c130720";
      const {
        product_id,
        shipping_address,
        retailer_id,
        product_quantity,
        settlement_amount,
      } = body;

      // Fetch Items from IDs
      const product = await strapi
        .query("product-details")
        .findOne({ id: product_id }, [
          {
            path: "warehouse",
          },
          {
            path: "wholesaler_details",
          },
        ]);

      const warehouse = product.warehouse;
      const invoice_number = Math.random().toFixed(12).split(".")[1];

      const pickrr_payload = {
        auth_token: PICKRR_AUTH_KEY,
        item_name: product.product_name,

        from_name: warehouse.name,
        from_phone_number: warehouse.contact_number,
        from_address: [
          warehouse.address_1 || "",
          warehouse.address_2 || "",
          warehouse.city || "",
          warehouse.state || "",
          warehouse.pincode || "",
        ]
          .filter((x) => !!x)
          .join(", "),
        from_pincode: warehouse.pincode,

        to_name: shipping_address.name || "",
        to_phone_number: shipping_address.phone || "",
        to_pincode: shipping_address.zip || "",
        to_address: [
          shipping_address.address1 || "",
          shipping_address.address2 || "",
          shipping_address.city || "",
          shipping_address.province || "",
          shipping_address.zip || "",
        ]
          .filter((x) => !!x)
          .join(", "),

        quantity: product_quantity,
        invoice_value: settlement_amount,
        item_breadth: product.dem_breadth,
        item_length: product.dem_length,
        item_height: product.dem_height,
        item_weight: product.weight,
        is_reverse: false,
        invoice_number: invoice_number,
        has_surface: true,
      };

      const response = await axios.post(
        "https://pickrr.com/api/place-order/",
        pickrr_payload
      );
      const order_response = response.data;

      const delivery_request = {
        retailer_id,
        wholesaler_id: product.wholesaler_details.id,
        product_id,
        product_quantity,
        order_response,
        shipping_address,
        status: "pending",
      };

      // TODO: #3 Pass Data to wholesaler
      const delivery = await strapi
        .query("delivery-requests")
        .create(delivery_request);

      // TODO: #4 Return Status
      return {
        status: "success",
        delivery,
      };
    } catch (error) {
      return {
        status: "error",
        error,
      };
    }
  },
};
