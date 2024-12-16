const Book = require("../models/Book");

const addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error ao obter todos os livros", error);
    res.status(500).send({ message: "Error ao obter todos os livros" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) res.status(404).send({ message: "Livro não encontrado" });

    res.status(200).send(book);
  } catch (error) {
    console.error("Error ao obter o livro", error);
    res.status(500).send({ message: "Error ao obter o livro" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { author } = req.body;
    const { pages } = req.body;

    if (!author) {
      return res
        .status(400)
        .send({ message: "O campo 'author' é obrigatório" });
    }

    if (!pages) {
      status(400).send({ message: "O campo 'pages' é obrigatório" });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send({ message: "Livro não encontrado" });
    }

    res.status(200).send({
      message: "Livro atualizado com sucesso",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error ao atualizar o livro", error);
    res.status(500).send({ message: "Error ao atualizar o livro" });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).send(books);
  } catch (error) {
    console.error("Erro ao buscar livros", error);
    res.status(500).send({ message: "Erro ao buscar livros" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Livro não encontrado" });
    }
    res.status(200).send({
      message: "Livro excluído com sucesso",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error ao excluir o livro", error);
    res.status(500).send({ message: "Error ao excluir o livro" });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  searchBooks,
  deleteBook,
};
