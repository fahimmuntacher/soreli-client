import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Trash2, Eye } from "lucide-react";
import { useState } from "react";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/UseAuth";
import Loading from "../../../../Components/Loading/Loading";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const [category, setCategory] = useState("all");
  const [tone, setTone] = useState("all");

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/favorites?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

  const handleRemove = async (lessonId) => {
    await axiosSecure.patch(`/lessons/remove-favorite/${lessonId}`, {
      email: user.email,
    });
    refetch();
  };
  const filteredFavorites = favorites.filter((lesson) => {
    const categoryMatch = category === "all" || lesson.category === category;

    const toneMatch = tone === "all" || lesson.tone === tone;

    return categoryMatch && toneMatch;
  });

  if (loading || isLoading) {
    return (
      <Loading></Loading>
    );
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
            <option value="life">Personal Growth</option>
            <option value="career">Career</option>
            <option value="relationship">Relationship</option>
            <option value="mindset">Mindset</option>
            <option value="mistakes">Mistakes Learned</option>
          </select>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-black border border-white/20 rounded-lg px-4 py-2"
          >
            {/* "Motivational", "Sad", "Realization", "Gratitude" */}
            <option value="all">All Tones</option>
            <option value="inspirational">Motivational</option>
            <option value="emotional">Sad</option>
            <option value="practical">Realization</option>
            <option value="practical">Gratitude</option>
          </select>
        </div>

        {/* Empty State */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No favorite lessons found.
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
