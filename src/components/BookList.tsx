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
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      setError("Error fetching books");
      console.error(error);
    }
  };

  const handleNewBook = async () => {
    if (!newBook.title || !newBook.description || !newBook.publicationDate) {
      setError("All fields are required.");
      return;
    }
    try {
      await createBook(newBook);
      setNewBook({});
      fetchBooks();
      setError("");
    } catch (error) {
      setError("Error creating book");
      console.error(error);
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = async () => {
    if (
      !editingBook?.id ||
      !editingBook?.title ||
      !editingBook?.description ||
      !editingBook?.publicationDate
    ) {
      setError("All fields are required.");
      return;
    }
    try {
      await updateBook(editingBook?.id, editingBook);
      setEditingBook(null);
      fetchBooks();
      setError("");
    } catch (error) {
      setError("Error updating book");
      console.error(error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      if (!id) {
        setError("Book ID is not found.");
        return;
      }
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      setError("Error deleting book");
      console.error(error);
    }
  };

  return (
    <div className="book-list">
      {error && <p>{error}</p>}
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span> {book.title}</span>
            <span>{book.description}</span>
            <span>{book.publicationDate}</span>
            <span>
              {book.authors ? `Author Id: ${book.authors.id}` : "No author"}
            </span>
            <button onClick={() => handleEditBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {!editingBook ? (
        <div>
          <h3>Add New Book</h3>
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
            value={newBook.authors?.id || ""}
            onChange={(e) =>
              setNewBook({
                ...newBook,
                authors: { id: Number(e.target.value) },
              })
            }
            onBlur={() => setError("")}
          />
          <button onClick={handleNewBook}>Create New Book</button>
        </div>
      ) : (
        <div>
          <h3>Edit Book</h3>
          <input
            type="text"
            placeholder="Title"
            value={editingBook.title || ""}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
            onBlur={() => setError("")}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingBook.description || ""}
            onChange={(e) =>
              setEditingBook({ ...editingBook, description: e.target.value })
            }
            onBlur={() => setError("")}
          />
          <input
            type="text"
            placeholder="Publication Date"
            value={editingBook.publicationDate || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                publicationDate: e.target.value,
              })
            }
            onBlur={() => setError("")}
          />
          <input
            type="number"
            placeholder="Author ID"
            value={editingBook.authors?.id || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                authors: { id: Number(e.target.value) },
              })
            }
            onBlur={() => setError("")}
          />
          <button onClick={handleUpdateBook}>Save Changes</button>
          <button onClick={() => setEditingBook(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BookList;
