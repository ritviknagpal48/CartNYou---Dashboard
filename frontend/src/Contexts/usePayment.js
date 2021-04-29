import { useEffect, useContext } from "react";
import { AuthContext, AUTH_ACTIONS } from "./Auth";
import useAxios from "./useAxios";
// import { axiosInstance } from "./useAxios";

const RAZORPAY_PUBLIC_KEY = "rzp_test_i3aqCnQuDHZhn9";

export const usePayment = () => {
  const {
    additionalInfo: { id: userid, email, mobile },
    setAuth,
  } = useContext(AuthContext);

  const { axios } = useAxios();

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const openPaymentWindow = ({ currency, amount, description }) => {
    return new Promise(async (resolve, reject) => {
      const { data } = await axios
        .post("/payments/new", {
          currency,
          amount,
        })
        .catch(reject);

      const options = {
        key: RAZORPAY_PUBLIC_KEY,
        currency: data.currency,
        amount: data.amount,
        name: "CartNYou - Wallet Recharge",
        description: "Wallet Recharge for CartNYou",
        image: "http://localhost:1337/logo.png",
        order_id: data.id,
        handler: function (response, error) {
          // console.log(response);
          if (error) reject(error);
          else {
            axios
              .post("/payments/confirm", {
                tx_date: new Date().getTime() / 1000,
                tx_type: "credit",
                tx_id: response.razorpay_payment_id,
                tx_amount: data.amount / 100,
                tx_desc: description || "Wallet Recharge",
                userid: userid,
              })
              .then(({ data }) => {
                setAuth(AUTH_ACTIONS.UPDATE, {
                  wallet: data.closing,
                  additionalInfo: {
                    transaction_history: data.t_history,
                    wallet: data.closing,
                  },
                });
                resolve(data);
              })
              .catch(reject);
          }
          // console.log(response.razorpay_payment_id);
          // console.log(response.razorpay_order_id);
          // console.log(response.razorpay_signature);
        },
        prefill: {
          email: email ? email : "N/A",
          contact: mobile ? mobile : "9999999999",
        },
        notes: {
          userid,
          email,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  };

  return { openPaymentWindow };
};
