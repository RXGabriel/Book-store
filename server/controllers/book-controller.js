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

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) res.status(404).send({ message: "Livro não encontrado" });

    res.status(200).send(book);
  } catch (error) {
    console.log("Erro ao obter livro:", error.message);
    res.status(500).send({ message: "Erro ao obter o livro" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) res.status(404).send({ message: "Livro não encontrado" });
    res
      .status(200)
      .send({ message: "Livro atualizado com sucesso", book: updatedBook });
  } catch (error) {
    console.log("Erro ao atualizar livro:", error.message);
    res.status(500).send({ message: "Erro ao atualizar o livro" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) res.status(404).send({ message: "Livro não encontrado" });
    res
      .status(200)
      .send({ message: "Livro excluído com sucesso", book: deletedBook });
  } catch (error) {
    console.log("Erro ao excluir livro:", error.message);
    res.status(500).send({ message: "Erro ao excluir o livro" });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};