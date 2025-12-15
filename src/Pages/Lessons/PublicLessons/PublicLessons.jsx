import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";
import { useState } from "react";
import useRole from "../../../Hooks/useRole";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user,  } = useAuth();
  const {isPremium} = useRole()
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["public-lessons", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/public?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  const lessons = data?.lessons || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-12 text-center">
        Public Life Lessons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {lessons.map((lesson, index) => {
          const isLocked = lesson.access === "premium" && !isPremium;

          return (
            <motion.div
              key={lesson._id}
              className="relative rounded-3xl overflow-hidden
              bg-linear-to-br from-white/10 to-white/5
              backdrop-blur-xl border border-white/20
              shadow-[0_0_40px_rgba(0,0,0,0.25)]"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
              }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Access Badge */}
              <div
                className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold
                bg-black/60 text-white border border-white/20"
              >
                {lesson.access === "premium" ? "⭐ Premium" : "Free"}
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={
                    lesson.image?.url ||
                    "https://i.ibb.co/4YQ6q8m/placeholder.jpg"
                  }
                  alt={lesson.title}
                  className={`w-full h-56 object-cover ${
                    isLocked ? "blur-md scale-105" : ""
                  }`}
                />

                {/* Premium Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                    <Lock size={34} />
                    <p className="mt-3 font-semibold">Premium Lesson</p>
                    <Link
                      to="/upgrade"
                      className="text-sm text-yellow-300 underline mt-1"
                    >
                      Upgrade to view
                    </Link>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">{lesson.title}</h3>

                <p className="text-gray-300 text-sm">
                  {lesson.description.slice(0, 90)}...
                </p>

                {/* Meta */}
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                    {lesson.category}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                    {lesson.tone}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-400">
                    {new Date(lesson.createdAt).toDateString()}
                  </span>

                  {!isLocked && (
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="text-sm text-yellow-300 hover:underline"
                    >
                      See Details →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-16">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}   
          className="px-5 py-2 rounded-xl bg-white/10 text-white
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-white/20 transition"
        >
          ← Prev
        </button>

        <span className="text-white text-sm">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5 py-2 rounded-xl bg-white/10 text-white
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-white/20 transition"
        >
          Next →
        </button>
      </div>

      {/* Soft loading indicator */}
      {isFetching && (
        <p className="text-center text-gray-400 text-sm mt-4">
          Loading more lessons...
        </p>
      )}
    </div>
  );
};

export default PublicLessons;
