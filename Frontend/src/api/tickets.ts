
import { api } from './config';
import { Ticket, CreateTicketData, UpdateTicketData } from '../types/ticket';

export const ticketsApi = {
  // Get all tickets
  getAll: async (): Promise<Ticket[]> => {
    const response = await api.get('/v1/tickets/');
    return response.data;
  },

  // Get single ticket by ID
  getById: async (id: number): Promise<Ticket> => {
    const response = await api.get(`/v1/tickets/${id}`);
    return response.data;
  },

  // Create new ticket
  create: async (data: CreateTicketData): Promise<Ticket> => {
    const response = await api.post('/v1/tickets/', data);
    return response.data;
  },

  // Update ticket
  update: async (id: number, data: UpdateTicketData): Promise<Ticket> => {
    const response = await api.put(`/v1/tickets/${id}`, data);
    return response.data;
  },

  // Close ticket
  close: async (id: number): Promise<Ticket> => {
    const response = await api.patch(`/v1/tickets/${id}/close`);
    return response.data;
  },

  // Delete ticket
  delete: async (id: number): Promise<void> => {
    await api.delete(`/v1/tickets/${id}`);
  },
};
