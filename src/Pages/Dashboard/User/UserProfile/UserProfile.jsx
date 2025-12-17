import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router";
import { motion } from "framer-motion";

import useAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import useRole from "../../../../Hooks/useRole";
import LessonCard from "../../../../Components/Shared/LessonCard";

const UserProfile = () => {
  const { user: firebaseUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useRole();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 8;

  // 🔹 Get full profile (user + lessons + counts)
  const { data: lessonData, isLoading: lessonsLoading } = useQuery({
    queryKey: ["user-lessons", firebaseUser?.email, page],
    enabled: !!firebaseUser,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/by-user/paginated?email=${firebaseUser.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const { data: favorites, isLoading: favoritesLoading } = useQuery({
    queryKey: ["user-profile", firebaseUser?.email],
    enabled: !!firebaseUser,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/favorites?email=${firebaseUser.email}`);
      return res.data;
    },
  });

  const lessons = lessonData?.lessons || [];
  // console.log(lessonData);
  const totalPages = lessonData?.pagination?.totalPages || 1;

  if (loading || lessonsLoading || favoritesLoading) return <Loading />;

  // 🔹 Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    try {
      // Firebase update
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL,
      });

      // DB update
      await axiosSecure.patch(`/user/${firebaseUser?.email}`, {
        name,
        photoURL,
      });

      toast.success("Profile updated");
      setEditMode(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="text-white space-y-10">
      <head>
        <title>User Profile - Soreli</title>
        <meta name="description" content="User profile page on Soreli" />
      </head>
      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <img
          src={lessonData?.photoURL || "/avatar.png"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border border-white/20"
        />

        {/* Info */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {firebaseUser.displayName}
            {isPremium && (
              <span className="text-yellow-400 text-sm">⭐ Premium</span>
            )}
          </h2>

          <p className="text-gray-400">{lessonData?.email}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-3 text-sm">
            <p>📘 Lessons: {lessons?.length}</p>
            <p>🔖 Saved: {favorites?.length}</p>
          </div>
        </div>

        {/* Edit */}
        <button
          onClick={() => setEditMode(true)}
          className="self-start p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30"
        >
          <Pencil size={18} />
        </button>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editMode && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-[90%] max-w-md border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input
                name="name"
                defaultValue={firebaseUser.displayName}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                placeholder="Display Name"
                required
              />

              <input
                name="photoURL"
                defaultValue={firebaseUser.photoURL}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                placeholder="Photo URL"
              />

              <p className="text-xs text-gray-400">
                Email cannot be changed for security reasons.
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

      {/* ================= USER LESSONS ================= */}
      <div>
        <h3 className="text-2xl font-bold mb-8">
          Lessons by{" "}
          <span className="text-green-400">{firebaseUser?.displayName}</span>
        </h3>

        {lessonData?.lessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-6xl sm:text-8xl mb-8">📭</div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              No lessons created yet
            </h3>
            <p className="text-gray-400 max-w-md mb-10 px-4">
              You haven’t published any lessons yet. Start creating and share
              your knowledge with the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/add-lesson"
                className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition font-medium text-lg"
              >
                ➕ Create your first lesson
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {lessonData?.lessons.map((lesson, index) => (
              <LessonCard lesson={lesson} index={index}></LessonCard>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3 mt-12">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="px-4 py-2 text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
