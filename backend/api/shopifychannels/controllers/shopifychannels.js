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
      const response = await axios.post(targetURL, body, {
        headers: { ...headers },
      });
      // const response = await axios.request({
      //   method: ("" + method).trim().toUpperCase() || "GET",
      //   headers: {
      //     ...headers,
      //   },
      //   url: targetURL,
      //   body: body,
      // });
      // const response = await axios.post(targetURL, body);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getOrders: async (ctx) => {
    const { request } = ctx;
    const { targetURL } = request.body;
    console.warn(ctx);
    console.warn(request.body.targetURL);
    const response = await axios.get(targetURL);
    return response.data;
  },
};
