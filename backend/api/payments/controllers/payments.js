const shortid = require("shortid");
const Razorpay = require("razorpay");
const KEYS = require("../config/keys");
const axios = require("axios").default;

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const razorpay = new Razorpay({
  key_id: KEYS.RAZORPAY_KEY,
  key_secret: KEYS.RAZORPAY_SECRET,
});

module.exports = {
  getUserPayments: async (ctx) => {
    const { request } = ctx;
    const { id } = request.body;
    const userInfo = await strapi
      .query("user", "users-permissions")
      .findOne({ id });

    const userPayments = userInfo.transaction_history;
    const count = userPayments.length;
    return { count, payments: userPayments };
  },
  misc: async (ctx) => {
    const { request } = ctx;
    return request;
  },
  confirmOrder: async (ctx) => {
    const { request } = ctx;
    const { userid, ...body } = request.body;

    // console.log(strapi.query("user", "users-permissions"));

    const userInfo = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userid });

    const old_t_history = userInfo.transaction_history;
    const current_wallet = userInfo.wallet || 0;

    const incoming_tx = {
      transaction_date: body.tx_date,
      transaction_type: body.tx_type,
      transaction_id: body.tx_id,
      transaction_amount: body.tx_amount,
      closing_balance: current_wallet + body.tx_amount,
      opening_balance: current_wallet,
      description: body.tx_desc || `Tx ${body.tx_id}`,
    };

    var newTxHistory = [];

    if (old_t_history && old_t_history instanceof Array) {
      newTxHistory = newTxHistory.concat(old_t_history);
    }

    newTxHistory = newTxHistory.map((x) => {
      const { id, _id, __v, ...rest } = x;
      return rest;
    });

    newTxHistory.push(incoming_tx);

    const newObject = await strapi.query("user", "users-permissions").update(
      { id: userid },
      {
        transaction_history: newTxHistory,
        wallet: incoming_tx.closing_balance,
      }
    );

    return {
      t_history: newObject.transaction_history,
      closing: newObject.wallet,
    };
  },
  newPayment: async (ctx) => {
    const { request } = ctx;
    const { amount, currency } = request.body;

    const options = {
      amount: amount * 100,
      currency: currency ? currency : "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    try {
      const newOrder = await razorpay.orders.create(options);
      return newOrder;
    } catch (err) {
      console.error(err);
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
};
