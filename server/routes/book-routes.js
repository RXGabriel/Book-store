const express = require("express");
const {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/book-controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

const router = express.Router();

router.post("/create-book", verifyAdminToken, addBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", verifyAdminToken, updateBook);
router.delete("/:id", verifyAdminToken, deleteBook);

module.exports = router;
