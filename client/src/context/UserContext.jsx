import { createContext, useState } from "react";
import api from "../api/axios";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [viewedUser, setViewedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/users/${id}`);
      setViewedUser(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async ({ page = 1, limit = 10, search = "" } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/users", {
        params: { page, limit, search },
      });
      const { users: fetchedUsers, pagination: fetchedPagination } =
        res.data.data;
      setUsers(fetchedUsers);
      setPagination(fetchedPagination);
      return fetchedUsers;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearViewedUser = () => setViewedUser(null);

  const value = {
    viewedUser,
    users,
    pagination,
    loading,
    error,
    fetchUserById,
    fetchAllUsers,
    clearViewedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
