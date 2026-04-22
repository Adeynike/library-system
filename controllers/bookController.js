const Book = require("../models/Book");
const Student = require("../models/Student");
const Attendant = require("../models/Attendant");

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("authors");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const borrowBook = async (req, res) => {
    try {
      const { studentId, attendantId, returnDate } = req.body;
  
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      if (book.status === "OUT") {
        return res.status(400).json({ message: "Book is already borrowed" });
      }
  
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      const attendant = await Attendant.findById(attendantId);
      if (!attendant) {
        return res.status(404).json({ message: "Attendant not found" });
      }
  
      book.status = "OUT";
      book.borrowedBy = studentId;
      book.issuedBy = attendantId;
      book.returnDate = returnDate;
  
      await book.save();
  
      const updatedBook = await Book.findById(book._id)
        .populate("authors")
        .populate("borrowedBy")
        .populate("issuedBy");
  
      res.json({
        message: "Book borrowed successfully",
        book: updatedBook,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const returnBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      if (book.status === "IN") {
        return res.status(400).json({ message: "Book is already in the library" });
      }
  
      book.status = "IN";
      book.borrowedBy = null;
      book.issuedBy = null;
      book.returnDate = null;
  
      await book.save();
  
      const updatedBook = await Book.findById(book._id).populate("authors");
  
      res.json({
        message: "Book returned successfully",
        book: updatedBook,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
  };