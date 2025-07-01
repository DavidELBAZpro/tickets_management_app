
import { Ticket } from '../types/ticket';
import { formatCreatedAt } from '../utils/date';
import { Edit, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TicketCardProps {
  ticket: Ticket;
  onClose: (id: number) => void;
  onDelete: (id: number) => void;
}

const TicketCard = ({ ticket, onClose, onDelete }: TicketCardProps) => {
  const isOpen = ticket.status === 'open';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Link
              to={`/tickets/${ticket.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {ticket.title}
            </Link>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isOpen
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {isOpen ? (
                <Circle className="h-3 w-3 mr-1" />
              ) : (
                <CheckCircle className="h-3 w-3 mr-1" />
              )}
              {ticket.status}
            </span>
          </div>
          <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
          <p className="text-gray-400 mb-10 line-clamp-2">ID: {ticket.id}</p>
          <p className="text-sm text-gray-500">
            Created {formatCreatedAt(ticket.created_at)} - UTC time
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <Link
            to={`/tickets/${ticket.id}`}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit ticket"
          >
            <Edit className="h-4 w-4" />
          </Link>
          {isOpen && (
            <button
              onClick={() => onClose(ticket.id)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
              title="Close ticket"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
