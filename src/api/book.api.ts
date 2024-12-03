import axios from "axios";
import { Book } from "../interfaces";
import { reactBackendUrl } from "../env/envoriment";

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get(`${reactBackendUrl}/books`);
  return response.data.map((book: any) => {
    return {
      ...book,
      authors: {
        id: book.authors.id || null,
        name: book.authors.name || null,
        birthDate: book.authors.birthDate || null,
      },
    };
  });
};

export const createBook = async (book: Partial<Book>): Promise<Book> => {
  const body = {
    ...book,
    id: Number(book.authors?.id) ?? null,
  };
  const response = await axios.post(`${reactBackendUrl}/books`, body);

  return response.data;
};

export const updateBook = async (
  id: number,
  book: Partial<Book>,
): Promise<Book> => {
  const body = {
    ...book,
    id: Number(book.authors?.id) ?? null,
  };
  const response = await axios.patch(`${reactBackendUrl}/books/${id}`, body);
  if (!response.data) throw new Error("Book not found");
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${reactBackendUrl}/books/${id}`);
};
