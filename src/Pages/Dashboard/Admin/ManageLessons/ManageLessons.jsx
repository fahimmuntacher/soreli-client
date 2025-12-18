import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // 🔹 filter states
  const [category, setCategory] = useState("all");
  const [privacy, setPrivacy] = useState("");
  const [reported, setReported] = useState(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "admin-lessons",
      page,
      category,
      privacy,
      reported,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons", {
        params: {
          page,
          limit,
          category,
          privacy,
          reported,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  // 🔹 actions
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/lessons/${id}`);
        refetch();
        Swal.fire("Deleted!", "Lesson removed.", "success");
      }
    });
  };

  const handleFeature = async (id) => {
    await axiosSecure.patch(`/admin/lessons/${id}/feature`);
    refetch();
  };

  const handleReview = async (id) => {
    await axiosSecure.patch(`/admin/lessons/${id}/review`);
    refetch();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Manage Lessons
      </h1>

      {/* 🔹 FILTER SECTION */}
      <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <select
          className="select select-bordered bg-black/80"
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="all">All Categories</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="programming">Programming</option>
        </select>

        <select
          className="select select-bordered bg-black/80"
          value={privacy}
          onChange={(e) => {
            setPage(1);
            setPrivacy(e.target.value);
          }}
        >
          <option value="">All Privacy</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            className="checkbox checkbox-error"
            checked={reported}
            onChange={(e) => {
              setPage(1);
              setReported(e.target.checked);
            }}
          />
          Reported only
        </label>
      </div>

      {/* 🔹 TABLE */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur rounded-xl">
        <table className="table w-full">
          <thead className="bg-white/20 text-white">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Privacy</th>
              <th>Reports</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.lessons.map((lesson) => (
              <tr key={lesson._id} className="hover:bg-white/5">
                <td className="font-semibold">{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>
                  <span className="badge badge-outline">
                    {lesson.privacy}
                  </span>
                </td>
                <td className="text-red-400 font-bold">
                  {lesson.reportCount}
                </td>
                <td className="space-x-1">
                  {lesson.isFeatured && (
                    <span className="badge badge-success">
                      Featured
                    </span>
                  )}
                  {lesson.isReviewed && (
                    <span className="badge badge-info">
                      Reviewed
                    </span>
                  )}
                </td>
                <td className="space-x-1">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleFeature(lesson._id)}
                  >
                    Feature
                  </button>
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleReview(lesson._id)}
                  >
                    Review
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 PAGINATION */}
      <div className="flex justify-center items-center gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${
              page === num + 1 ? "btn-primary" : ""
            }`}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageLessons;
