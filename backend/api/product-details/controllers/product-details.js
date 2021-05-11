"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOwned: async (ctx) => {
    const { authorization } = ctx.request.header;
    if (!authorization) {
      ctx.response.status = 401;
      ctx.response.message = "Unauthorized";
      return;
    }
    return [];
  },
};
