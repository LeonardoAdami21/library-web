import React, { useEffect, useState } from "react";
import { IAuthor } from "../interfaces";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  updateAuthor,
} from "../api/author.api";

const AuthorList = () => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [newAuthor, setNewAuthor] = useState<Partial<IAuthor>>({});

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const data = await getAllAuthors();
    setAuthors(data);
  };

  const handleAuthor = async () => {
    if (newAuthor.name && newAuthor.birthDate) {
      await createAuthor(newAuthor);
      setNewAuthor({});
      fetchAuthors();
    }
  };

  const updatedAuthor = async (id: number, author: Partial<IAuthor>) => {
    const data = await updateAuthor(id, author);
    setNewAuthor(data);
  };

  const handleDelete = async (id: number) => {
    await deleteAuthor(id);
    fetchAuthors();
  };

  return (
    <div>
      <h2>Author List</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <div>
              <span>{author.name}</span>
              <span>{author.birthDate}</span>
              <button onClick={() => updatedAuthor(author.id, author)}>
                Update
              </button>
              <button onClick={() => handleDelete(author.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newAuthor.name}
          onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Birth Date"
          value={newAuthor.birthDate}
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, birthDate: e.target.value })
          }
        />
        <button onClick={handleAuthor}>Add Author</button>
      </div>
    </div>
  );
};

export default AuthorList;
