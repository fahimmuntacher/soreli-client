import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import { useState } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";

const MyLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["my-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
      return res.data;
    },
  });

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
                <td className="p-4 space-y-1 flex  items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                    {lesson.privacy}
                  </span>
                  <br />
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                    {lesson.access}
                  </span>
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

                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 inline-block"
                  >
                    <Eye size={16} />
                  </Link>

                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 inline-block"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setDeleteModal(true);
                    }}
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
