
import { Link, useLocation } from 'react-router-dom';
import { Ticket, Plus } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/tickets" className="flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-semibold text-gray-900">Ticket Manager</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/tickets"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/tickets'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All Tickets
              </Link>
              <Link
                to="/tickets/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
