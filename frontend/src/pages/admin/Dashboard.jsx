import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import PageWrapper from "../../components/ui/PageWrapper";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import PriorityPill from "../../components/ui/PriorityPill";
import FancyDropdown from "../../components/ui/FancyDropdown";
import { getAllTickets } from "../../api/adminApi";
import {
  FaTicketAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: ""
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getAllTickets();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Failed to load tickets:", error);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (!filters.status || ticket.status === filters.status) &&
      (!filters.priority || ticket.priority === filters.priority) &&
      (!filters.category || ticket.category === filters.category)
    );
  });

  const openCount = tickets.filter(
    (t) => t.status === "OPEN" || t.status === "IN_PROGRESS"
  ).length;

  const resolvedCount = tickets.filter(
    (t) => t.status === "RESOLVED"
  ).length;

  const criticalCount = tickets.filter(
    (t) => t.priority === "CRITICAL"
  ).length;

  return (
    <AppShell role="ADMIN">
      <PageWrapper>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Tickets"
            value={tickets.length}
            icon={<FaTicketAlt />}
          />

          <StatCard
            title="Open Tickets"
            value={openCount}
            icon={<FaClock />}
          />

          <StatCard
            title="Critical"
            value={criticalCount}
            icon={<FaExclamationTriangle />}
          />

          <StatCard
            title="Resolved"
            value={resolvedCount}
            icon={<FaCheckCircle />}
          />
        </div>

        {/* Fancy Filters */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10 border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Ticket Filters
            </h2>

            <button
              onClick={() =>
                setFilters({
                  status: "",
                  priority: "",
                  category: ""
                })
              }
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FancyDropdown
              label="Status"
              color="blue"
              value={filters.status}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  status: value
                })
              }
              options={[
                { label: "All Status", value: "" },
                { label: "Open", value: "OPEN" },
                { label: "In Progress", value: "IN_PROGRESS" },
                { label: "Resolved", value: "RESOLVED" },
                { label: "Closed", value: "CLOSED" }
              ]}
            />

            <FancyDropdown
              label="Priority"
              color="purple"
              value={filters.priority}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  priority: value
                })
              }
              options={[
                { label: "All Priority", value: "" },
                { label: "Critical", value: "CRITICAL" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" }
              ]}
            />

            <FancyDropdown
              label="Category"
              color="emerald"
              value={filters.category}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  category: value
                })
              }
              options={[
                { label: "All Categories", value: "" },
                {
                  label: "Royalty Payments",
                  value: "ROYALTY_PAYMENTS"
                },
                {
                  label: "ISBN Metadata",
                  value: "ISBN_METADATA"
                },
                {
                  label: "Printing Quality",
                  value: "PRINTING_QUALITY"
                },
                {
                  label: "Distribution",
                  value: "DISTRIBUTION"
                },
                {
                  label: "Book Status",
                  value: "BOOK_STATUS"
                },
                {
                  label: "General",
                  value: "GENERAL"
                }
              ]}
            />
          </div>
        </div>

        {/* Ticket List */}
        <div className="space-y-5">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <h3 className="text-xl font-bold text-slate-700">
                No tickets found
              </h3>
              <p className="text-slate-500 mt-2">
                Try adjusting your filters.
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/admin/tickets/${ticket._id}`}
                className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {ticket.subject}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      {ticket.author?.name}
                    </p>

                    <p className="text-sm text-slate-400 mt-1 uppercase tracking-wide">
                      {ticket.category.replaceAll("_", " ")}
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <StatusBadge status={ticket.status} />
                    <PriorityPill priority={ticket.priority} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </PageWrapper>
    </AppShell>
  );
};

export default Dashboard;