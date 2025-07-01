
import { useNavigate } from 'react-router-dom';
import { useTicketStore } from '../store/ticketStore';
import TicketForm from '../components/TicketForm';
import { TicketFormData } from '../utils/validation';
import { CreateTicketData } from '../types/ticket';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateTicket = () => {
  const navigate = useNavigate();
  const { createTicket, loading } = useTicketStore();

  const handleSubmit = async (data: TicketFormData) => {
    try {
      // Type assertion is safe here because Zod validation ensures all fields are present
      await createTicket(data as CreateTicketData);
      toast.success('Ticket created successfully');
      navigate('/tickets');
    } catch (error) {
      toast.error('Failed to create ticket');
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Create New Ticket</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <TicketForm
          onSubmit={handleSubmit}
          isLoading={loading}
          submitText="Create Ticket"
        />
      </div>
    </div>
  );
};

export default CreateTicket;
