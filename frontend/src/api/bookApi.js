import api from "./axios";

export const getMyBooks = async () => {
  const response = await api.get("/books/my-books");
  return response.data;
};