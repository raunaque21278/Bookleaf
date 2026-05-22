import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import PageWrapper from "../../components/ui/PageWrapper";
import StatusBadge from "../../components/ui/StatusBadge";
import PriorityPill from "../../components/ui/PriorityPill";
import { getMyTickets } from "../../api/ticketApi";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const data = await getMyTickets();
    setTickets(data.tickets);
  };

  return (
    <AppShell role="AUTHOR">
      <PageWrapper>
        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

        <div className="space-y-5">
          {tickets.map((ticket) => (
            <Link
              key={ticket._id}
              to={`/author/tickets/${ticket._id}`}
              className="bg-white rounded-2xl shadow p-6 block hover:shadow-xl transition"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {ticket.subject}
                  </h2>

                  <p className="text-slate-500">
                    {ticket.category}
                  </p>
                </div>

                <div className="flex gap-3">
                  <StatusBadge status={ticket.status} />
                  <PriorityPill priority={ticket.priority} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageWrapper>
    </AppShell>
  );
};

export default MyTickets;