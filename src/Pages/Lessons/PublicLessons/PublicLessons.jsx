import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import GridSkeleton from "../../../Components/Skeletons/GridSkeleton";
import { useState } from "react";
import useRole from "../../../Hooks/useRole";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useRole();

  const [page, setPage] = useState(1);
  const limit = 6;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["public-lessons", page, search, category, tone],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/public?page=${page}&limit=${limit}&search=${search}&category=${category}&tone=${tone}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const lessons = data?.lessons || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <GridSkeleton cols={3} rows={2} />;

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto">
      <head>
        <title>Public Lessons - Soreli</title>
      </head>
      <h1 className="text-4xl font-bold text-white mb-12 text-center">
        Public Life Lessons
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white
          border border-white/20 placeholder-gray-400 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="px-4 py-3 rounded-xl bg-black/60 text-white border border-white/20"
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationship">Relationship</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select
          value={tone}
          onChange={(e) => {
            setTone(e.target.value);
            setPage(1);
          }}
          className="px-4 py-3 rounded-xl bg-black/60 text-white border border-white/20"
        >
          <option value="">All Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Realization">Realization</option>
          <option value="Sad">Sad</option>
          <option value="Gratitude">Gratitude</option>
        </select>
      </div>

      {/* Content */}
      {lessons.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center
          py-28 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            No lessons found
          </h3>
          <p className="text-gray-400 max-w-md">
            We couldn’t find any lessons matching your search or filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setTone("");
              setPage(1);
            }}
            className="mt-6 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {lessons.map((lesson, index) => {
            const isLocked = lesson.access === "premium" && !isPremium;

            return (
              <motion.div
                key={lesson._id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-3xl overflow-hidden
                bg-linear-to-br from-white/10 to-white/5
                backdrop-blur-xl border border-white/20 shadow-lg"
              >
                <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs bg-black/60 text-white">
                  {lesson.access === "premium" ? "⭐ Premium" : "Free"}
                </div>

                <div className="relative">
                  <img
                    src={
                      lesson.image?.url ||
                      "https://i.ibb.co/4YQ6q8m/placeholder.jpg"
                    }
                    alt={lesson.title}
                    className={`w-full h-56 object-cover ${
                      isLocked ? "blur-md" : ""
                    }`}
                  />

                  {isLocked && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                      <Lock size={34} />
                      <Link
                        to="/upgrade"
                        className="text-yellow-300 underline mt-2"
                      >
                        Upgrade to view
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {lesson.description.slice(0, 90)}...
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                      {lesson.category}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                      {lesson.tone}
                    </span>
                  </div>

                  {!isLocked && (
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="text-yellow-300 text-sm hover:underline"
                    >
                      See Details →
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-16">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 rounded-xl bg-white/10 text-white disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="text-white text-sm">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 rounded-xl bg-white/10 text-white disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      {isFetching && (
        <p className="text-center text-gray-400 text-sm mt-4">
          Loading more lessons...
        </p>
      )}
    </div>
  );
};

export default PublicLessons;
