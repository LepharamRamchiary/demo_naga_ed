import { useAuth } from "../../context/AuthContext";

export default function Overview() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-ink">Overview</h1>
      <p className="mt-2 text-smoke">Welcome back, {user?.username}.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-smoke">Username</p>
          <p className="mt-1 font-semibold text-ink">{user?.username}</p>
        </div>
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-smoke">Email</p>
          <p className="mt-1 font-semibold text-ink">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
