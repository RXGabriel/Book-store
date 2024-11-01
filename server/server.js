const express = require("express");
const connectDB = require("./utils/db");
const cors = require("cors");
const bookRoutes = require("./routes/book-routes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco de dados", error.message);
  });

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Api rodando");
});
