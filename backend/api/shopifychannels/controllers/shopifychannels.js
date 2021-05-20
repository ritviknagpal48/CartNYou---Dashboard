const axios = require("axios").default;
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  proxy: async (ctx) => {
    try {
      const { request } = ctx;
      const { targetURL, body, headers } = request.body;
      console.log(targetURL, headers, body);
      const response = await axios.post(targetURL, body, {
        headers: { ...headers },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getOrders: async (ctx) => {
    const { request } = ctx;
    const { targetURL } = request.body;
    const response = await axios.get(targetURL);
    const { orders } = response.data;
    if (!orders) return [];
    let result = [];

    result = orders.flatMap((order) => {
      return order.line_items.map((x) => ({
        ...x,
        order_id: order.id,
        shipping_address: order.shipping_address,
        customer: {
          email: order.customer.email,
          first_name: order.customer.first_name,
          last_name: order.customer.last_name,
        },
        financial_status: order.financial_status,
      }));
    });

    return { orders: result };
  },
};
