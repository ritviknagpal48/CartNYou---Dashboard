const axios = require("axios").default;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Publishing Product Api Request
   */

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

  /**
   * Updating Import List
   */

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

  /**
   * Fetching Import List
   */
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

  /**
   * Retailer to wholesaler Order Settlement Via Admin
   */

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

      // Pickrr payload generated

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

      //Pickrr payload sent for delivery request

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

      const delivery = await strapi
        .query("delivery-requests")
        .create(delivery_request);

      const commission =
        settlement_amount - product.product_mrp * product_quantity;

      let new_transaction = {
        commission_amount: commission,
        transaction_date: new Date().toISOString(),
        delivery_request: delivery.id,
      };

      // Transcation delivery_requst and commsssion
      let transactions = await strapi.query("transactions").find({ _limit: 1 });

      if (transactions && transactions.length > 0) {
        transactions = transactions[0];
        const prev = (transactions.transactions || []).map((x) => ({
          id: x.id,
        }));

        const new_amount =
          parseInt(transactions.balance || "0") +
          new_transaction.commission_amount;

        const new_list = [new_transaction, ...prev];
        await strapi.query("transactions").update(
          { id: transactions.id },
          {
            balance: new_amount,
            transactions: new_list,
          }
        );
      } else {
        await strapi.query("transactions").create({
          balance: new_transaction.commission_amount,
          transactions: [new_transaction],
        });
      }

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
  sandbox: async (_ctx) => {
    try {
      return {
        status: "success",
      };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};
