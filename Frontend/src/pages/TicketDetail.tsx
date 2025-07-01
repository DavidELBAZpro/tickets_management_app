import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTicketStore } from '../store/ticketStore';
import TicketForm from '../components/TicketForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { TicketFormData } from '../utils/validation';
import { UpdateTicketData } from '../types/ticket';
import { toast } from 'sonner';
import { ArrowLeft, Trash2, CheckCircle } from 'lucide-react';
import { formatCreatedAt } from '../utils/date';

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentTicket, 
    loading, 
    error, 
    fetchTicketById, 
    updateTicket, 
    closeTicket, 
    deleteTicket 
  } = useTicketStore();

  const ticketId = parseInt(id || '0');

  useEffect(() => {
    if (ticketId) {
      fetchTicketById(ticketId).catch(() => {
        toast.error('Failed to load ticket');
      });
    }
  }, [ticketId, fetchTicketById]);

  const handleSubmit = async (data: TicketFormData) => {
    try {
      // Type assertion is safe here because Zod validation ensures all fields are present
      await updateTicket(ticketId, data as UpdateTicketData);
      toast.success('Ticket updated successfully');
    } catch (error) {
      toast.error('Failed to update ticket');
    }
  };

  const handleClose = async () => {
    try {
      await closeTicket(ticketId);
      toast.success('Ticket closed successfully');
    } catch (error) {
      toast.error('Failed to close ticket');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket(ticketId);
        toast.success('Ticket deleted successfully');
        navigate('/tickets');
      } catch (error) {
        toast.error('Failed to delete ticket');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !currentTicket) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Ticket not found'}</div>
        <Link
          to="/tickets"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Tickets
        </Link>
      </div>
    );
  }

  const isOpen = currentTicket.status === 'open';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/tickets"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to tickets
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Ticket</h1>
            <p className="text-sm text-gray-500 mt-1">
              Created {formatCreatedAt(currentTicket.created_at)}
            </p>
          </div>
          <div className="flex space-x-2">
            {isOpen && (
              <button
                onClick={handleClose}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Close Ticket
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <TicketForm
          onSubmit={handleSubmit}
          initialData={currentTicket}
          isLoading={loading}
          submitText="Update Ticket"
        />
      </div>
    </div>
  );
};

export default TicketDetail;
