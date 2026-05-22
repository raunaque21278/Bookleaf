import { FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow px-8 py-5 flex justify-between items-center rounded-2xl">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.name}
        </h2>

        <p className="text-slate-500">
          Manage your support activity
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-xl text-slate-600">
          <FaBell />
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;