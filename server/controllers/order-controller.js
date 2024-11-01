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

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ date: -1 });

    if (!orders)
      return res.status(404).json({ message: "Nenhum pedido encontrado" });
    res.status(200).json(orders);
  } catch (error) {
    console.log("Erro ao buscar os pedidos por email", error.message);
    res.status(500).send({ message: "Erro ao buscar os pedidos" });
  }
};

module.exports = { createOrder, getOrderByEmail };
