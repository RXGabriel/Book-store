const Order = require("../models/Order");
const Book = require("../models/Book");

const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalSalesResult = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);
    const totalSales = totalSalesResult[0]?.totalSales || 0;

    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } },
      { $count: "trendingBooksCount" },
    ]);
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    const totalBooks = await Book.countDocuments();
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalOrders,
      totalSales,
      trendingBooks,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.log("Erro ao obter estatísticas do admin:", error.message);
    res.status(500).json({ message: "Erro ao obter estatísticas" });
  }
};

module.exports = { getAdminStats };
