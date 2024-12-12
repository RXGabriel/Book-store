const express = require("express");
const {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  searchBooks,
} = require("../controllers/book-controller");
const verifyUserToken = require("../middleware/verifyUserToken");

const router = express.Router();

router.post("/create-book", verifyUserToken, addBook);
router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", verifyUserToken, updateBook);
router.delete("/:id", verifyUserToken, deleteBook);

module.exports = router;
