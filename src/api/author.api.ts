import  axios from "axios";
import { reactBackendUrl } from "../env/envoriment";
import { IAuthor } from "../interfaces/index";

export const getAllAuthors = async () => {
  const response = await axios.get(`${reactBackendUrl}/authors`);
  return response.data;
};

export const getAuthorById = async (id: number) => {
  const response = await axios.get(`${reactBackendUrl}/authors/${id}`);
  return response.data;
};

export const createAuthor = async (author: Partial<IAuthor>): Promise<IAuthor> => {
  const response = await axios.post(`${reactBackendUrl}/authors`, author);
  return response.data;
};

export const updateAuthor = async (id: number, author: Partial<IAuthor>): Promise<IAuthor> => {
  const response = await axios.patch(`${reactBackendUrl}/authors/${id}`, author);
  return response.data;
};

export const deleteAuthor = async (id: number) => {
  const response = await axios.delete(`${reactBackendUrl}/authors/${id}`);
  return response.data;
};