import api from "./axios";

export const getAllTickets = async () => {
  const response = await api.get("/admin/tickets");
  return response.data;
};

export const getTicketDetails = async (id) => {
  const response = await api.get(`/admin/tickets/${id}`);
  return response.data;
};

export const adminReply = async (id, message) => {
  const response = await api.post(
    `/admin/tickets/${id}/reply`,
    { message }
  );

  return response.data;
};

export const updateTicketStatus = async (id, status) => {
  const response = await api.patch(
    `/admin/tickets/${id}/status`,
    { status }
  );

  return response.data;
};

export const assignTicket = async (id, adminId) => {
  const response = await api.patch(
    `/admin/tickets/${id}/assign`,
    { adminId }
  );

  return response.data;
};

export const generateAIDraft = async (id) => {
  const response = await api.post(
    `/admin/tickets/${id}/ai-draft`
  );

  return response.data;
};

export const addInternalNote = async (id, note) => {
  const response = await api.post(
    `/admin/tickets/${id}/notes`,
    { note }
  );

  return response.data;
};

export const getAdmins = async () => {
  const response = await api.get("/admin/admins");
  return response.data;
};