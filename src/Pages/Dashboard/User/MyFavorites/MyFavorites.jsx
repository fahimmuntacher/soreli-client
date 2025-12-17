import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Trash2, Eye } from "lucide-react";
import { useState } from "react";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/UseAuth";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useRole from "../../../../Hooks/useRole";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { isPremium } = useRole();

  const [category, setCategory] = useState("all");
  const [tone, setTone] = useState("all");
  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-favorites", user?.email, category, tone],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/favorites", {
        params: {
          email: user?.email,
          category,
          tone,
        },
      });
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

  //   delte favorite handler
  const handleRemove = async (lessonId) => {
    const result = await Swal.fire({
      title: "Remove from favorites?",
      text: "This lesson will be removed from your favorites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/lessons/remove-favorite/${lessonId}`, {
        email: user.email,
      });

      await Swal.fire({
        title: "Removed!",
        text: "The lesson has been removed from your favorites.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to remove favorite. Please try again.",
        icon: "error",
      });
    }
  };

  // filter favorites based on category and tone
  const filteredFavorites = favorites.filter((lesson) => {
    const categoryMatch = category === "all" || lesson.category === category;

    const toneMatch = tone === "all" || lesson.tone === tone;

    return categoryMatch && toneMatch;
  });

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-gray-400">{favorites.length} saved lessons</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-black border border-white/20 rounded-lg px-4 py-2"
          >
            <option value="all">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationship">Relationship</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-black border border-white/20 rounded-lg px-4 py-2"
          >
            {/* "Motivational", "Sad", "Realization", "Gratitude" */}
            <option value="all">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>

        {/* Empty State */}
        {filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-6xl sm:text-8xl mb-8"> </div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              No favorite lessons yet
            </h3>
            <p className="text-gray-400 max-w-md mb-10 px-4">
              You haven't added any lessons to your favorites. Start exploring
              and save the ones you love!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/lessons"
                className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition font-medium text-lg"
              >
                ➕ Create your first favorite lesson
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
          /* Table */
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-sm uppercase text-gray-400">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Tone</th>
                  <th className="px-5 py-4">Privacy</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredFavorites.map((lesson) => (
                  <tr
                    key={lesson._id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-5 py-4 font-medium">{lesson.title}</td>

                    <td className="px-5 py-4 text-sm text-gray-400">
                      {lesson.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-400">
                      {lesson.tone}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          lesson.privacy === "public"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {lesson.privacy}
                      </span>
                    </td>

                    <td className="px-5 py-4 flex gap-3">
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                      <button
                        onClick={() => handleRemove(lesson._id)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
