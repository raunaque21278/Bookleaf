import { Link, useLocation } from "react-router-dom";
import {
  FaBook,
  FaTicketAlt,
  FaPlusCircle,
  FaChartBar,
  FaUsers
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const location = useLocation();

  const authorLinks = [
    { path: "/author", label: "Dashboard", icon: <FaChartBar /> },
    { path: "/author/books", label: "My Books", icon: <FaBook /> },
    { path: "/author/tickets", label: "My Tickets", icon: <FaTicketAlt /> },
    {
      path: "/author/create-ticket",
      label: "Create Ticket",
      icon: <FaPlusCircle />
    }
  ];

  const adminLinks = [
    { path: "/admin", label: "Dashboard", icon: <FaChartBar /> },

  ];

  const links = role === "ADMIN" ? adminLinks : authorLinks;

  return (
    <div className="w-72 bg-slate-950 text-white min-h-screen p-6 flex flex-col shadow-2xl">
      <h1 className="text-3xl font-bold mb-10">
        BookLeaf Support
      </h1>

      <div className="space-y-3 flex-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-200 ${
              location.pathname === link.path
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-slate-800"
            }`}
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;