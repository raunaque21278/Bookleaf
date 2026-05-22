import api from "./axios";

export const createTicket = async (data) => {
  const response = await api.post("/tickets", data);
  return response.data;
};

export const getMyTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const replyToTicket = async (id, message) => {
  const response = await api.post(`/tickets/${id}/reply`, {
    message
  });

  return response.data;
};