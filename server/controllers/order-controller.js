const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log("Erro ao criar um novo pedido", error.message);
    res.status(500).send({ message: "Erro ao criar um novo pedido" });
  }
};

module.exports = { createOrder };
