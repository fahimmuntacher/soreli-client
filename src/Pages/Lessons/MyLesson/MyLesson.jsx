

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import { useState } from "react";
import { Eye, Pencil, Trash2, X, Globe, Lock, Crown, Gift } from "lucide-react";
import useRole from "../../../Hooks/useRole";

const MyLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isPremium } = useRole();

  const [editingLesson, setEditingLesson] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleVisibilityChange = async (lesson) => {
    const next = lesson.privacy === "public" ? "private" : "public";

    const confirm = await Swal.fire({
      title: "Change visibility?",
      text: `This lesson will become ${next}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (!confirm.isConfirmed) return;

    setUpdatingId(lesson._id);
    try {
      await axiosSecure.patch(`/lessons/${lesson._id}/visibility`, {
        privacy: next,
      });
      toast.success("Visibility updated");
      refetch();
    } catch {
      toast.error("Failed to update visibility");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAccessChange = async (lesson) => {
    const next = lesson.access === "free" ? "premium" : "free";

    const confirm = await Swal.fire({
      title: "Change access level?",
      text:
        next === "premium"
          ? "Only premium users will be able to view this lesson."
          : "This lesson will be free for everyone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (!confirm.isConfirmed) return;

    setUpdatingId(lesson._id);
    try {
      await axiosSecure.patch(`/lessons/${lesson._id}/access`, {
        access: next,
      });
      toast.success("Access level updated");
      refetch();
    } catch {
      toast.error("Failed to update access");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/lessons/${id}`);
        toast.success("Lesson deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete lesson");
      }
    }
  };

  return (
    <div className="min-h-screen text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">📘 My Lessons</h2>

        {/* Empty State */}
        {lessons.length === 0 ? (
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

              {!isPremium && (
                <Link
                  to="/upgrade"
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition text-yellow-400 border border-yellow-600/30"
                >
                  ⭐ Unlock Premium Features
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/10">
                  <tr>
                    <th className="text-left p-6 font-medium">Lesson</th>
                    <th className="text-left p-6 font-medium">Status</th>
                    <th className="text-left p-6 font-medium">Stats</th>
                    <th className="text-left p-6 font-medium">Created</th>
                    <th className="text-right p-6 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr
                      key={lesson._id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="p-6">
                        <p className="font-semibold text-lg">{lesson.title}</p>
                        <p className="text-sm text-gray-400">
                          {lesson.category} • {lesson.tone}
                        </p>
                      </td>

                      <td className="p-6">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleVisibilityChange(lesson)}
                            disabled={updatingId === lesson._id}
                            className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition ${
                              lesson.privacy === "public"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                            }`}
                          >
                            {lesson.privacy === "public" ? (
                              <Globe size={14} />
                            ) : (
                              <Lock size={14} />
                            )}
                            {lesson.privacy === "public" ? "Public" : "Private"}
                          </button>

                          <button
                            onClick={() => handleAccessChange(lesson)}
                            disabled={!isPremium || updatingId === lesson._id}
                            title={
                              !isPremium
                                ? "Upgrade to premium to set premium access"
                                : ""
                            }
                            className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition ${
                              lesson.access === "premium"
                                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                            } ${!isPremium && "opacity-50 cursor-not-allowed"}`}
                          >
                            {lesson.access === "premium" ? (
                              <Crown size={14} />
                            ) : (
                              <Gift size={14} />
                            )}
                            {lesson.access === "premium" ? "Premium" : "Free"}
                          </button>
                        </div>
                        {!isPremium && (
                          <p className="text-xs text-yellow-400 mt-2">
                            Premium required for access control
                          </p>
                        )}
                      </td>

                      <td className="p-6 text-gray-300">
                        <div>❤️ {lesson.reactionsCount || 0} Likes</div>
                        <div>🔖 {lesson.favoritesCount || 0} Favorites</div>
                      </td>

                      <td className="p-6 text-gray-400">
                        {new Date(lesson.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>

                      <td className="p-6">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/lessons/${lesson._id}`}
                            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
                          >
                            <Eye size={18} />
                          </Link>
                          <button
                            onClick={() => {
                              setEditingLesson(lesson);
                              setEditModal(true);
                            }}
                            className="p-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 transition"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(lesson._id)}
                            className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {lesson.category} • {lesson.tone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="p-2 rounded-lg bg-white/10"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          setEditingLesson(lesson);
                          setEditModal(true);
                        }}
                        className="p-2 rounded-lg bg-blue-500/20"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="p-2 rounded-lg bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <button
                      onClick={() => handleVisibilityChange(lesson)}
                      disabled={updatingId === lesson._id}
                      className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 ${
                        lesson.privacy === "public"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {lesson.privacy === "public" ? (
                        <Globe size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                      {lesson.privacy === "public" ? "Public" : "Private"}
                    </button>

                    <button
                      onClick={() => handleAccessChange(lesson)}
                      disabled={!isPremium || updatingId === lesson._id}
                      className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 ${
                        lesson.access === "premium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      } ${!isPremium && "opacity-50"}`}
                    >
                      {lesson.access === "premium" ? (
                        <Crown size={14} />
                      ) : (
                        <Gift size={14} />
                      )}
                      {lesson.access === "premium" ? "Premium" : "Free"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 text-sm text-gray-400">
                    <div>❤️ {lesson.reactionsCount || 0} Likes</div>
                    <div>🔖 {lesson.favoritesCount || 0} Favorites</div>
                    <div className="col-span-2 mt-2">
                      Created: {new Date(lesson.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Enhanced Edit Modal */}
      {editModal && editingLesson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Edit Lesson</h3>
                <button
                  onClick={() => setEditModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSaving(true);

                  const formData = new FormData(e.target);
                  const updatedLesson = {
                    title: formData.get("title"),
                    category: formData.get("category"),
                    tone: formData.get("tone"),
                    description: formData.get("description"),
                  };

                  try {
                    await axiosSecure.put(
                      `/lessons/${editingLesson._id}`,
                      updatedLesson
                    );
                    toast.success("Lesson updated successfully!");
                    refetch();
                    setEditModal(false);
                  } catch (err) {
                    toast.error("Failed to update lesson");
                  } finally {
                    setSaving(false);
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lesson Title
                  </label>
                  <input
                    name="title"
                    defaultValue={editingLesson.title}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-yellow-500 focus:outline-none transition"
                    placeholder="Enter lesson title"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      defaultValue={editingLesson.category}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-yellow-500 focus:outline-none transition"
                      placeholder="e.g., Life, Career, Health"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Emotional Tone
                    </label>
                    <input
                      name="tone"
                      defaultValue={editingLesson.tone}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-yellow-500 focus:outline-none transition"
                      placeholder="e.g., Inspirational, Reflective"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editingLesson.description}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-yellow-500 focus:outline-none transition resize-none"
                    placeholder="Describe your lesson..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-70 transition font-medium"
                  >
                    {saving ? "Updating..." : "Update Lesson"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;
