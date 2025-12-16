import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import { useState } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import useRole from "../../../Hooks/useRole";

const MyLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const { isPremium } = useRole();
  const [updatingId, setUpdatingId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [saving, setSaving] = useState(false);

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["my-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
      return res.data;
    },
  });

  // UPDATE VISIBILITY & ACCESS
  const handleVisibilityChange = async (lesson) => {
    const next = lesson.privacy === "public" ? "private" : "public";

    const confirm = await Swal.fire({
      title: "Change visibility?",
      text: `This lesson will become ${next}`,
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

  // UPDATE ACCESS LEVEL
  const handleAccessChange = async (lesson) => {
    const next = lesson.access === "free" ? "premium" : "free";

    const confirm = await Swal.fire({
      title: "Change access level?",
      text:
        next === "premium"
          ? "Only premium users can view this lesson"
          : "This lesson will be free for everyone",
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
      toast.success("Access updated");
      refetch();
    } catch {
      toast.error("Failed to update access");
    } finally {
      setUpdatingId(null);
    }
  };

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${id}`);
        toast.success("Lesson deleted");
        refetch();
      }
    });
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-8">📘 My Lessons</h2>

      {/* Table Container */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/10 text-left">
            <tr>
              <th className="p-4">Lesson</th>
              <th className="p-4">Status</th>
              <th className="p-4">Stats</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr
                key={lesson._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                {/* Title */}
                <td className="p-4">
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-xs text-gray-400">
                    {lesson.category} • {lesson.tone}
                  </p>
                </td>

                {/* Visibility + Access */}
                <td className="p-4 flex items-center justify-start gap-2.5">
                  {/* Visibility */}
                  <div className="flex items-center gap-2 ">
                    <button
                      disabled={updatingId === lesson._id}
                      onClick={() => handleVisibilityChange(lesson)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                        lesson.privacy === "public"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {lesson.privacy === "public" ? "🌍 Public" : "🔒 Private"}
                    </button>
                  </div>

                  {/* Access Level */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={!isPremium || updatingId === lesson._id}
                      title={!isPremium ? "Premium subscription required" : ""}
                      onClick={() => handleAccessChange(lesson)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        lesson.access === "premium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      } ${!isPremium && "opacity-50 cursor-not-allowed"}`}
                    >
                      {lesson.access === "premium" ? "⭐ Premium" : "🆓 Free"}
                    </button>

                    {!isPremium && (
                      <span className="text-[10px] text-yellow-400">
                        Upgrade required
                      </span>
                    )}
                  </div>

                  {!isPremium && (
                    <p className="text-[10px] text-yellow-400">
                      Premium required
                    </p>
                  )}
                </td>

                {/* Stats */}
                <td className="p-4 text-gray-300">
                  ❤️ {lesson.reactionsCount || 0} <br />
                  🔖 {lesson.favoritesCount || 0}
                </td>

                {/* Date */}
                <td className="p-4 text-gray-400">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-4 text-right space-x-2 flex justify-end items-center">
                  {/* view details */}
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 inline-block"
                  >
                    <Eye size={16} />
                  </Link>

                  {/* edit lesson */}
                  <button
                    onClick={() => {
                      setEditingLesson(lesson);
                      setEditModal(true);
                    }}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30"
                  >
                    <Pencil size={16} />
                  </button>
                  {/* edit modal */}
                  {editModal && editingLesson && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                      <div className="bg-[#0f172a] rounded-2xl p-6 w-[95%] max-w-xl border border-white/10">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-semibold">
                            Update Lesson
                          </h3>
                          <button onClick={() => setEditModal(false)}>
                            <X />
                          </button>
                        </div>

                        {/* Form */}
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setSaving(true);

                            const form = e.target;
                            const updatedLesson = {
                              title: form.title.value,
                              category: form.category.value,
                              tone: form.tone.value,
                              description: form.description.value,
                            };

                            try {
                              await axiosSecure.patch(
                                `/lessons/${editingLesson._id}`,
                                updatedLesson
                              );
                              toast.success("Lesson updated");
                              refetch();
                              setEditModal(false);
                            } catch {
                              toast.error("Update failed");
                            } finally {
                              setSaving(false);
                            }
                          }}
                          className="space-y-4"
                        >
                          <input
                            name="title"
                            defaultValue={editingLesson.title}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                            placeholder="Lesson Title"
                            required
                          />

                          <input
                            name="category"
                            defaultValue={editingLesson.category}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                            placeholder="Category"
                            required
                          />

                          <input
                            name="tone"
                            defaultValue={editingLesson.tone}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                            placeholder="Emotional Tone"
                          />

                          <textarea
                            name="description"
                            defaultValue={editingLesson.description}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10"
                            rows={4}
                            placeholder="Lesson description"
                          />

                          {/* Footer */}
                          <div className="flex justify-end gap-3 pt-4">
                            <button
                              type="button"
                              onClick={() => setEditModal(false)}
                              className="px-4 py-2 rounded-lg bg-white/10"
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              disabled={saving}
                              className="px-4 py-2 rounded-lg bg-blue-500"
                            >
                              {saving ? "Saving..." : "Update"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* delete lesson */}
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] rounded-2xl p-6 w-[90%] max-w-md border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Delete Lesson</h3>
              <button onClick={() => setDeleteModal(false)}>
                <X />
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              Are you sure you want to permanently delete
              <span className="text-white font-semibold">
                {" "}
                {selectedLesson?.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await axiosSecure.delete(`/lessons/${selectedLesson._id}`);
                  toast.success("Lesson deleted");
                  setDeleteModal(false);
                  refetch();
                }}
                className="px-4 py-2 rounded-lg bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;
