
export type TicketStatus = "open" | "closed";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  created_at: string; // ISO date string
};

export type CreateTicketData = {
  title: string;
  description: string;
  status: TicketStatus;
};

export type UpdateTicketData = {
  title: string;
  description: string;
  status: TicketStatus;
};
