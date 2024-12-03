import axios from "axios";
import { Book } from "../interfaces";
import { reactBackendUrl } from "../env/envoriment";


export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get(`${reactBackendUrl}/books`);
  return response.data;
};

export const createBook = async (book: Partial<Book>): Promise<Book> => {
  const response = await axios.post(`${reactBackendUrl}/books`, book);
  return response.data;
};

export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
  const response = await axios.put(`${reactBackendUrl}/books/${id}`, book);
  if(!response.data) throw new Error("Book not found");
  return response.data;
}

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${reactBackendUrl}/books/${id}`);
};
