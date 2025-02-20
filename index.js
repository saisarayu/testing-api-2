const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let books = [
    { book_id: "101", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", year: 1925, copies: 5 }
];


app.post("/books", (req, res) => {
    const { book_id, title, author, genre, year, copies } = req.body;

    if (!book_id || !title || !author || !genre || !year || !copies) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (books.find(book => book.book_id === book_id)) {
        return res.status(400).json({ error: "Book ID already exists" });
    }

    const newBook = { book_id, title, author, genre, year, copies };
    books.push(newBook);
    res.status(201).json(newBook);
});


app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});


app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const { title, author, genre, year, copies } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (year) book.year = year;
    if (copies) book.copies = copies;

    res.json(book);
});


app.delete("/books/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.book_id === req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

