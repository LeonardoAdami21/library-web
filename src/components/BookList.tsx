import React, { useEffect, useState } from "react";
import { Book } from "../interfaces";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../api/book.api";
import "./book.css";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Partial<Book>>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };

  const handleNewBook = async () => {
    if (
      newBook.title &&
      newBook.description &&
      newBook.publicationDate &&
      newBook.authorId
    ) {
      return;
    }
    try {
      await createBook(newBook);
      setNewBook({});
      fetchBooks();
    } catch (error) {
      setError("Error creating book");
      console.error(error);
    }
  };

  const handleUpdateBook = async (id: number, book: Partial<Book>) => {
    const data = await updateBook(id, book);
    setNewBook(data);
  };

  const handleDeleteBook = async (id: number) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span> {book.title}</span>
            <span>{book.description}</span>
            <span>{book.publicationDate}</span>
            <span>{book.authorId}</span>
            <button onClick={() => handleUpdateBook(book.id, newBook)}>
              {" "}
              Update
            </button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Title"
        value={newBook.title || ""}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        onBlur={() => setError("")}
      />
      <input
        type="text"
        placeholder="Description"
        value={newBook.description || ""}
        onChange={(e) =>
          setNewBook({ ...newBook, description: e.target.value })
        }
        onBlur={() => setError("")}
      />
      <input
        type="text"
        placeholder="Publication Date"
        value={newBook.publicationDate || ""}
        onChange={(e) =>
          setNewBook({ ...newBook, publicationDate: e.target.value })
        }
        onBlur={() => setError("")}
      />
      <input
        type="number"
        placeholder="Author ID"
        value={newBook.authorId || ""}
        onChange={(e) =>
          setNewBook({ ...newBook, authorId: Number(e.target.value) })
        }
        onBlur={() => setError("")}
      />
      <button onClick={handleNewBook}>Create Book</button>
    </div>
  );
};

export default BookList;
