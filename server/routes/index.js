const express = require("express");
const bookRoutes = require("./book-routes");
const userRoutes = require("./user-routes");
const orderRoutes = require("./order-routes");
const adminRoutes = require("./admin-routes");

const router = express.Router();

router.use("/books", bookRoutes);
router.use("/auth", userRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
