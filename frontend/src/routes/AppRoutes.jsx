import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../pages/auth/Login";

import ProtectedRoute from "../components/ProtectedRoute";

// AUTHOR
import AuthorDashboard from "../pages/author/Dashboard";
import MyBooks from "../pages/author/MyBooks";
import MyTickets from "../pages/author/MyTickets";
import CreateTicket from "../pages/author/CreateTicket";
import TicketChat from "../pages/author/TicketChat";

// ADMIN
import AdminDashboard from "../pages/admin/Dashboard";
import TicketDetails from "../pages/admin/TicketDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        {/* AUTHOR */}

        <Route
          path="/author"
          element={
            <ProtectedRoute role="AUTHOR">
              <AuthorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/author/books"
          element={
            <ProtectedRoute role="AUTHOR">
              <MyBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/author/tickets"
          element={
            <ProtectedRoute role="AUTHOR">
              <MyTickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/author/create-ticket"
          element={
            <ProtectedRoute role="AUTHOR">
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/author/tickets/:id"
          element={
            <ProtectedRoute role="AUTHOR">
              <TicketChat />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tickets/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <TicketDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;