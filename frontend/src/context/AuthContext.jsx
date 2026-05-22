import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    console.log("LOGIN RESPONSE:", data);

    localStorage.setItem("token", data.token);

    setUser(data.user);
console.log(data);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (localStorage.getItem("token")) {
          const data = await getCurrentUser();
          console.log("ME RESPONSE:", data);
          setUser(data.user);
        }
      } catch (err) {
  console.log("AUTH INIT ERROR:", err);
  logout();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);