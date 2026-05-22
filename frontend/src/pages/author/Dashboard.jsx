import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import PriorityPill from "../../components/ui/PriorityPill";
import { getMyBooks } from "../../api/bookApi";
import { getMyTickets } from "../../api/ticketApi";
import {
  FaBook,
  FaTicketAlt,
  FaMoneyBillWave
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const booksData = await getMyBooks();
      const ticketsData = await getMyTickets();

      setBooks(booksData.books || []);
      setTickets(ticketsData.tickets || []);
    } catch (error) {
      console.error(error);
    }
  };

  const totalRoyalty = books.reduce(
    (sum, book) => sum + (book.totalRoyaltyEarned || 0),
    0
  );

  const openTickets = tickets.filter(
    (ticket) =>
      ticket.status === "OPEN" ||
      ticket.status === "IN_PROGRESS"
  );

  return (
    <AppShell role="AUTHOR">
      <div className="space-y-8">
        {/* Top stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="My Books"
            value={books.length}
            icon={<FaBook />}
          />

          <StatCard
            title="Open Tickets"
            value={openTickets.length}
            icon={<FaTicketAlt />}
          />

          <StatCard
            title="Total Royalties"
            value={`₹${totalRoyalty}`}
            icon={<FaMoneyBillWave />}
          />
        </div>

        {/* Quick actions */}
        {/* <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2">
            Author Support Dashboard
          </h2>

          <p className="text-slate-500 mb-6">
            Manage your books, track tickets, and connect with
            BookLeaf support.
          </p> */}

          {/* <div className="flex flex-wrap gap-4">
            <Link
              to="/author/books"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              My Books
            </Link>

            <Link
              to="/author/tickets"
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
            >
              My Tickets
            </Link>

            <Link
              to="/author/create-ticket"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Create Ticket
            </Link>
          </div>
        </div> */}

        {/* Recent tickets */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Recent Support Tickets
            </h2>

            <Link
              to="/author/tickets"
              className="text-blue-600 font-semibold"
            >
              View All
            </Link>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No tickets yet.
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.slice(0, 5).map((ticket) => (
                <Link
                  key={ticket._id}
                  to={`/author/tickets/${ticket._id}`}
                  className="block border rounded-2xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">
                        {ticket.subject}
                      </h3>

                      <p className="text-slate-500">
                        {ticket.category}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <PriorityPill priority={ticket.priority} />
                      <StatusBadge status={ticket.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;