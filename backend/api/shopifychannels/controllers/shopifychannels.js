const axios = require("axios").default;
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  proxy: async (ctx) => {
    const { request } = ctx;
    const { targetURL, body, headers, method } = request.body;
    const response = await axios.request({
      method: ("" + method).trim().toUpperCase() || "GET",
      headers: {
        ...headers,
      },
      url: targetURL,
      body: body,
    });
    // const response = await axios.post(targetURL, body);
    return response.data;
  },

  getOrders: async (ctx) => {
    const { request } = ctx;
    const { targetURL } = request.body;
    console.warn(ctx);
    console.warn(request.body.targetURL);
    const response = await axios.get(targetURL);
    return response.data;
  }
};
