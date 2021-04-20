const axios = require("axios").default;
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  delegateNewProduct: async (ctx) => {
    const { request } = ctx;
    const { targetURL, body } = request.body;
    const response = await axios.post(targetURL, body);
    return response.data;
  },
};
