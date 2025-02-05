const paypal = require("../utils/paypal");

exports.createPayment = (req, res) => {
  const { totalPrice } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.CLIENT_BASE_URL}/success`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/cancel`,
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalPrice,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.json({ forwardLink: payment.links[i].href });
        }
      }
    }
  });
};

exports.executePayment = (req, res) => {
  const { paymentId, PayerID } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "10.00", // This should be the same as the amount in createPayment
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error(error.response);
      res.status(500).send(error);
    } else {
      res.send("Success");
    }
  });
};
