import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-ink">Profile</h1>
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-smoke">Username</p>
          <p className="mt-1 font-semibold text-ink">{user?.username}</p>
        </div>
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-smoke">Email</p>
          <p className="mt-1 font-semibold text-ink">{user?.email}</p>
        </div>
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-smoke">Address</p>
          <p className="mt-1 font-semibold text-ink">{user?.address || "—"}</p>
        </div>
      </div>
    </div>
  );
}
