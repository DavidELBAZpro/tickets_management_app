
import { create } from 'zustand';
import { Ticket, CreateTicketData, UpdateTicketData } from '../types/ticket';
import { ticketsApi } from '../api/tickets';

interface TicketStore {
  tickets: Ticket[];
  currentTicket: Ticket | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchTickets: () => Promise<void>;
  fetchTicketById: (id: number) => Promise<void>;
  createTicket: (data: CreateTicketData) => Promise<Ticket>;
  updateTicket: (id: number, data: UpdateTicketData) => Promise<Ticket>;
  closeTicket: (id: number) => Promise<void>;
  deleteTicket: (id: number) => Promise<void>;
  clearError: () => void;
  setCurrentTicket: (ticket: Ticket | null) => void;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,

  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const tickets = await ticketsApi.getAll();
      set({ tickets, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tickets', loading: false });
      throw error;
    }
  },

  fetchTicketById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const ticket = await ticketsApi.getById(id);
      set({ currentTicket: ticket, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch ticket', loading: false });
      throw error;
    }
  },

  createTicket: async (data: CreateTicketData) => {
    set({ loading: true, error: null });
    try {
      const newTicket = await ticketsApi.create(data);
      set((state) => ({
        tickets: [...state.tickets, newTicket],
        loading: false,
      }));
      return newTicket;
    } catch (error) {
      set({ error: 'Failed to create ticket', loading: false });
      throw error;
    }
  },

  updateTicket: async (id: number, data: UpdateTicketData) => {
    set({ loading: true, error: null });
    try {
      const updatedTicket = await ticketsApi.update(id, data);
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === id ? updatedTicket : ticket
        ),
        currentTicket: state.currentTicket?.id === id ? updatedTicket : state.currentTicket,
        loading: false,
      }));
      return updatedTicket;
    } catch (error) {
      set({ error: 'Failed to update ticket', loading: false });
      throw error;
    }
  },

  closeTicket: async (id: number) => {
    // Optimistic update
    const originalTickets = get().tickets;
    const originalCurrentTicket = get().currentTicket;
    
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: 'closed' as const } : ticket
      ),
      currentTicket: state.currentTicket?.id === id 
        ? { ...state.currentTicket, status: 'closed' as const } 
        : state.currentTicket,
    }));

    try {
      const closedTicket = await ticketsApi.close(id);
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === id ? closedTicket : ticket
        ),
        currentTicket: state.currentTicket?.id === id ? closedTicket : state.currentTicket,
      }));
    } catch (error) {
      // Revert optimistic update
      set({
        tickets: originalTickets,
        currentTicket: originalCurrentTicket,
        error: 'Failed to close ticket',
      });
      throw error;
    }
  },

  deleteTicket: async (id: number) => {
    // Optimistic update
    const originalTickets = get().tickets;
    
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
    }));

    try {
      await ticketsApi.delete(id);
    } catch (error) {
      // Revert optimistic update
      set({
        tickets: originalTickets,
        error: 'Failed to delete ticket',
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  setCurrentTicket: (ticket: Ticket | null) => set({ currentTicket: ticket }),
}));
