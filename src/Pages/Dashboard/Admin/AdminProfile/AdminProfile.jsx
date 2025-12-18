import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import useAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";



const AdminProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔹 Get admin profile + stats
  const { data, isLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/profile`);
      return res.data;
    },
  });

  if (loading || isLoading) return <Loading />;

  // 🔹 Update admin profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    try {
      // Firebase
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      // Database
      await axiosSecure.patch(`/admin/profile`, {
        name,
        photoURL,
      });

      toast.success("Admin profile updated");
      setEditMode(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white space-y-10">
      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <img
          src={data?.photoURL || "/avatar.png"}
          alt="admin"
          className="w-28 h-28 rounded-full object-cover border border-white/20"
        />

        {/* Info */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {data?.name}
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs">
              <ShieldCheck size={14} /> Admin
            </span>
          </h2>

          <p className="text-gray-400">{data?.email}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-3 text-sm">
            <p>🛠 Lessons Moderated: {data?.moderatedCount}</p>
            <p>⚡ Actions Taken: {data?.actionCount}</p>
          </div>
        </div>

        {/* Edit */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setEditMode(true)}
          className="self-start p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30"
        >
          <Pencil size={18} />
        </motion.button>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editMode && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-[90%] max-w-md border border-white/10">
            <h3 className="text-xl font-semibold mb-4">
              Update Admin Profile
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input
                name="name"
                defaultValue={data?.name}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                placeholder="Display Name"
                required
              />

              <input
                name="photoURL"
                defaultValue={data?.photoURL}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                placeholder="Photo URL"
              />

              <p className="text-xs text-gray-400">
                Email & role cannot be changed.
              </p>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 rounded-lg bg-white/10"
                >
                  Cancel
                </button>

                <button
                  disabled={saving}
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500"
                >
                  {saving ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
