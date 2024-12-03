import React, { useEffect, useState } from "react";
import { IAuthor } from "../interfaces";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  updateAuthor,
} from "../api/author.api";

import "./index.css";

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [error, setError] = useState<string>("");
  const [editingAuthor, setEditingAuthor] = useState<Partial<IAuthor> | null>(
    null,
  );
  const [newAuthor, setNewAuthor] = useState<Partial<IAuthor>>({});

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await getAllAuthors();
      setAuthors(data);
    } catch (error) {
      setError("Error fetching authors.");
    }
  };

  const handleAuthor = async () => {
    if (!newAuthor.name || !newAuthor.birthDate) {
      setError("All fields are required.");
      return;
    }
    try {
      await createAuthor(newAuthor);
      setNewAuthor({});
      fetchAuthors();
      setError("");
    } catch (error) {
      setError("Error creating author.");
    }
  };

  const handleUpdateAuthor = async () => {
    if (
      !editingAuthor?.id ||
      !editingAuthor?.name ||
      !editingAuthor?.birthDate
    ) {
      setError("All fields are required.");
      return;
    }
    try {
      await updateAuthor(editingAuthor.id, editingAuthor);
      setEditingAuthor(null);
      setNewAuthor({});
      fetchAuthors();
      setError("");
    } catch (error) {
      setError("Error updating author.");
    }
  };

  const handleEditAuthor = (author: IAuthor) => {
    setEditingAuthor(author);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
    } catch (error) {
      setError("Error deleting author.");
    }
  };

  return (
    <div className="author-list">
      <h2>Author List</h2>
      {error && <p>{error}</p>}
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <div>
              <span>{author.name}</span>
              <span>{author.birthDate}</span>
              <button onClick={() => handleEditAuthor(author)}> Update</button>
              <button onClick={() => handleDelete(author.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {!editingAuthor ? (
        <div className="author-list">
          <h3>Add New Author</h3>
          <input
            type="text"
            placeholder="Name"
            value={newAuthor.name || ""}
            onChange={(e) =>
              setNewAuthor({ ...newAuthor, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Birth Date"
            value={newAuthor.birthDate || ""}
            onChange={(e) =>
              setNewAuthor({ ...newAuthor, birthDate: e.target.value })
            }
          />
          <button onClick={handleAuthor}>Add Author</button>
        </div>
      ) : (
        <div>
          <h3>Update Author</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingAuthor.name || ""}
            onChange={(e) =>
              setEditingAuthor({ ...editingAuthor, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Birth Date"
            value={editingAuthor.birthDate || ""}
            onChange={(e) =>
              setEditingAuthor({ ...editingAuthor, birthDate: e.target.value })
            }
          />
          <button onClick={handleUpdateAuthor}>Save Changes</button>
          <button onClick={() => setEditingAuthor(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AuthorList;
