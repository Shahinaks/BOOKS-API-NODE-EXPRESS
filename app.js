const express = require('express');
const app = express();
const PORT = 3000;

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 }
];

app.get('/books', (req, res) => {
    res.json({ success: true, data: books });
});

app.get('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        return res.status(400).json({ success: false, message: "Invalid book ID" });
    }

    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, data: book });
});

app.get('/', (req, res) => {
    res.send("Welcome to the Books API. Use books to view all books or /books/:id to view a specific book.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
