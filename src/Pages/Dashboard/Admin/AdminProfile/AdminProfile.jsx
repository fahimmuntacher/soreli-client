import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, ShieldCheck, Lock, Activity, TrendingUp, AlertCircle, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { updateProfile, updatePassword } from "firebase/auth";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import DetailPageSkeleton from "../../../../Components/Skeletons/DetailPageSkeleton";



const AdminProfile = () => {
  const { user, loading, signOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  // 🔹 Get admin profile + stats
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/profile`);
      return res.data;
    },
  });

  if (loading || isLoading) return <DetailPageSkeleton />;

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
      refetch();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      await updatePassword(user, passwordData.newPassword);
      toast.success("Password updated successfully");
      setChangePasswordMode(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else if (error.code === "auth/requires-recent-login") {
        toast.error("Please sign in again before changing password");
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Sign Out
  const handleSignOut = async () => {
    const confirm = await Swal.fire({
      title: "Sign Out?",
      text: "You will be logged out from your admin account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Sign Out",
    });

    if (confirm.isConfirmed) {
      try {
        await signOutUser();
        toast.success("Signed out successfully");
      } catch {
        toast.error("Failed to sign out");
      }
    }
  };

  return (
    <div className="text-white space-y-8">
      <head>
        <title>Admin Profile - Soreli</title>
      </head>

      {/* ================= PROFILE CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-8"
      >
        {/* Avatar */}
        <img
          src={data?.photoURL || "/avatar.png"}
          alt="admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
        />

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            {data?.name}
            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm">
              <ShieldCheck size={16} /> Admin
            </span>
          </h2>

          <p className="text-gray-400 text-lg">{data?.email}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">Lessons Moderated</p>
              <p className="text-2xl font-bold text-yellow-400">{data?.moderatedCount || 0}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">Actions Taken</p>
              <p className="text-2xl font-bold text-blue-400">{data?.actionCount || 0}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">Joined</p>
              <p className="text-lg font-bold text-green-400">{data?.joinedDate || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition"
          >
            <Pencil size={18} /> Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setChangePasswordMode(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition"
          >
            <Lock size={18} /> Change Password
          </motion.button>
        </div>
      </motion.div>

      {/* ================= ACTIVITY & STATS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Activity Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-green-400" size={24} />
            <h3 className="text-xl font-bold">Activity Summary</h3>
          </div>
          <div className="space-y-3">
            <p className="flex justify-between text-gray-300">
              <span>Lessons Reviewed:</span>
              <span className="font-bold text-green-400">{data?.reviewedCount || 0}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>Reports Resolved:</span>
              <span className="font-bold text-yellow-400">{data?.resolvedReports || 0}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>Users Managed:</span>
              <span className="font-bold text-blue-400">{data?.managedUsers || 0}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>Last Active:</span>
              <span className="font-bold text-purple-400">{data?.lastActive || "Now"}</span>
            </p>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold">Performance</h3>
          </div>
          <div className="space-y-3">
            <p className="flex justify-between text-gray-300">
              <span>Avg. Response Time:</span>
              <span className="font-bold text-green-400">{data?.avgResponseTime || "< 1h"}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>Resolution Rate:</span>
              <span className="font-bold text-yellow-400">{data?.resolutionRate || "95%"}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>User Satisfaction:</span>
              <span className="font-bold text-blue-400">{data?.satisfaction || "4.8/5"}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>Moderator Level:</span>
              <span className="font-bold text-purple-400">{data?.moderatorLevel || "Expert"}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* ================= SECURITY & ACCOUNT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="text-red-400" size={24} />
          <h3 className="text-xl font-bold">Security & Account</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Two-Factor Authentication</p>
            <p className="text-white font-semibold">{data?.twoFactorEnabled ? "Enabled ✓" : "Disabled"}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Login History</p>
            <p className="text-white font-semibold">{data?.loginCount || 0} logins this month</p>
          </div>
        </div>
      </motion.div>

      {/* ================= DANGER ZONE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition font-semibold"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </motion.div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {editMode && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0f172a] p-8 rounded-2xl w-full max-w-md border border-white/10"
          >
            <h3 className="text-2xl font-semibold mb-6">Update Admin Profile</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                <input
                  name="name"
                  defaultValue={data?.name}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-yellow-400 outline-none transition"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Photo URL</label>
                <input
                  name="photoURL"
                  defaultValue={data?.photoURL}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-yellow-400 outline-none transition"
                  placeholder="https://..."
                />
              </div>

              <p className="text-xs text-gray-500 bg-white/5 p-3 rounded">
                Email & role cannot be changed.
              </p>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-semibold"
                >
                  Cancel
                </button>

                <button
                  disabled={saving}
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 transition font-semibold"
                >
                  {saving ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      {changePasswordMode && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0f172a] p-8 rounded-2xl w-full max-w-md border border-white/10"
          >
            <h3 className="text-2xl font-semibold mb-6">Change Password</h3>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-yellow-400 outline-none transition"
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-yellow-400 outline-none transition"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <p className="text-xs text-gray-500 bg-white/5 p-3 rounded">
                Password must be at least 6 characters long.
              </p>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setChangePasswordMode(false)}
                  className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-semibold"
                >
                  Cancel
                </button>

                <button
                  disabled={saving}
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 transition font-semibold"
                >
                  {saving ? "Updating..." : "Change Password"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
