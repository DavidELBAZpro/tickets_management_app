
import { useEffect } from 'react';
import { useTicketStore } from '../store/ticketStore';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';

const TicketList = () => {
  const { tickets, loading, error, fetchTickets, closeTicket, deleteTicket } = useTicketStore();

  useEffect(() => {
    fetchTickets().catch(() => {
      toast.error('Failed to load tickets');
    });
  }, [fetchTickets]);

  const handleCloseTicket = async (id: number) => {
    try {
      await closeTicket(id);
      toast.success('Ticket closed successfully');
    } catch (error) {
      toast.error('Failed to close ticket');
    }
  };

  const handleDeleteTicket = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket(id);
        toast.success('Ticket deleted successfully');
      } catch (error) {
        toast.error('Failed to delete ticket');
      }
    }
  };

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => fetchTickets()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Tickets</h1>
        <div className="text-sm text-gray-500">
          {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No tickets found</div>
          <a
            href="/tickets/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create your first ticket
          </a>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onClose={handleCloseTicket}
              onDelete={handleDeleteTicket}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
