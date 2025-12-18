import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import { ShieldCheck, ShieldOff, Trash2, Search } from "lucide-react";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-users", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/users?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const confirmAction = async (title, text, action) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
    });

    if (result.isConfirmed) {
      await action();
      refetch();
      Swal.fire("Success!", "Action completed.", "success");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by email..."
          className="input input-bordered w-full pl-10 bg-white/10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur rounded-xl border border-white/10">
        <table className="table w-full">
          <thead className="bg-white/20">
            <tr className="text-white/80">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.users.map((user) => (
              <tr key={user._id} className="hover:bg-white/5">
                <td className="font-semibold">{user.name}</td>
                <td className="text-sm">{user.email}</td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-success" : "badge-outline"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="text-center font-bold">{user.totalLessons}</td>

                <td className="flex gap-2">
                  {user.role === "admin" ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="btn btn-xs btn-warning"
                      onClick={() =>
                        confirmAction(
                          "Demote Admin?",
                          "This user will lose admin access.",
                          () =>
                            axiosSecure.patch(`/admin/users/${user._id}/demote`)
                        )
                      }
                    >
                      <ShieldOff size={14} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        confirmAction(
                          "Promote to Admin?",
                          "This user will gain admin access.",
                          () =>
                            axiosSecure.patch(
                              `/admin/users/${user._id}/promote`
                            )
                        )
                      }
                    >
                      <ShieldCheck size={14} />
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-xs btn-error"
                    onClick={() =>
                      confirmAction(
                        "Delete User?",
                        "This action cannot be undone.",
                        () => axiosSecure.delete(`/admin/users/${user._id}`)
                      )
                    }
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
