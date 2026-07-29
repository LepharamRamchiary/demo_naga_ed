import { useEffect, useState } from "react";
import { useUserContext } from "../../context/useUserContext";

export default function Users() {
  const { users, pagination, loading, error, fetchAllUsers } = useUserContext();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllUsers({ page, limit: 10, search });
  }, [page, search]);


  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () =>
    setPage((p) => Math.min(p + 1, pagination.totalPages));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-ink">Users</h1>

      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-chili">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper text-smoke">
            <tr>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-smoke">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-smoke">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 text-smoke">{user.email}</td>
                  <td className="px-4 py-3 text-smoke">
                    {user.address || "—"}
                  </td>
                  <td className="px-4 py-3 text-smoke">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between text-sm text-smoke">
        <p>
          Page {pagination.page} of {pagination.totalPages || 1} (
          {pagination.total} total)
        </p>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page <= 1 || loading}
            className="rounded-xl border px-4 py-2 font-medium disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page >= pagination.totalPages || loading}
            className="rounded-xl border px-4 py-2 font-medium disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
