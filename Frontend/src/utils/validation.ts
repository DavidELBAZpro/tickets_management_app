
import { z } from 'zod';

export const ticketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  status: z.enum(['open', 'closed']),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
