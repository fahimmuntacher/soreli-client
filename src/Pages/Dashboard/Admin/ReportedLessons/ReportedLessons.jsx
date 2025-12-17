import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Eye, Trash2, ShieldOff, X, AlertTriangle } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  const handleIgnore = async (id) => {
    const confirm = await Swal.fire({
      title: "Ignore all reports?",
      text: "This will clear every report for this lesson.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (!confirm.isConfirmed) return;

    setUpdatingId(id);
    try {
      await axiosSecure.patch(`/admin/reported-lessons/${id}/ignore`);
      Swal.fire("Ignored!", "Reports have been cleared.", "success");
      refetch();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete lesson permanently?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    setUpdatingId(id);
    try {
      await axiosSecure.delete(`/admin/reported-lessons/${id}`);
      Swal.fire("Deleted!", "Lesson has been removed.", "success");
      refetch();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="text-red-400" />
          <h1 className="text-3xl sm:text-4xl font-bold">Reported Lessons</h1>
        </div>

        {/* EMPTY / LOADING */}
        {isLoading ? (
          <div className="text-center py-24 text-gray-400">
            Loading reports...
          </div>
        ) : lessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-7xl mb-6">🎉</div>
            <h3 className="text-2xl font-semibold mb-2">No reported lessons</h3>
            <p className="text-gray-400">Everything looks clean for now.</p>
          </div>
        ) : (
          <>

          {/* table */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead className="bg-white/10 sticky top-0 z-10">
                    <tr>
                      <th className="text-left p-6 font-medium">Lesson</th>
                      <th className="text-left p-6 font-medium">Reports</th>
                      <th className="text-right p-6 font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {lessons.map((lesson) => (
                      <tr
                        key={lesson.lessonId}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="p-6">
                          <p className="font-semibold text-lg">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-gray-400">
                            Author: {lesson.authorEmail}
                          </p>
                        </td>

                        <td className="p-6">
                          <span className="px-4 py-2 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                            {lesson.reportCount} Reports
                          </span>
                        </td>

                        <td className="p-6">
                          <div className="flex justify-end gap-3 flex-wrap">
                            <button
                              onClick={() => setSelectedLesson(lesson)}
                              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              disabled={updatingId === lesson.lessonId}
                              onClick={() => handleIgnore(lesson.lessonId)}
                              className="p-3 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 transition disabled:opacity-50"
                            >
                              <ShieldOff size={18} />
                            </button>

                            <button
                              disabled={updatingId === lesson.lessonId}
                              onClick={() => handleDelete(lesson.lessonId)}
                              className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition disabled:opacity-50"
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
            </div>
          </>
        )}
      </div>

      {/* REPORT DETAILS MODAL */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Reports</h3>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X size={22} />
                </button>
              </div>

              <p className="font-semibold mb-4">{selectedLesson.title}</p>

              <div className="space-y-4">
                {selectedLesson.reports.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="font-medium">{r.reason}</p>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>{r.reporterEmail}</span>
                      <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
