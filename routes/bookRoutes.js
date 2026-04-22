const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

router.post("/:id/borrow", borrowBook);
router.post("/:id/return", returnBook);

module.exports = router;