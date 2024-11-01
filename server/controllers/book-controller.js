const Book = require("../models/Book");

const addBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.log("Erro ao adicionar livro:", error.message);
    res.status(500).json({ message: "Erro ao criar livro" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.log("Erro ao obter todos os livros:", error.message);
    res.status(500).send({ message: "Erro ao obter todos os livros" });
  }
};

module.exports = { addBook, getAllBooks };
