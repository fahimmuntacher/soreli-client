import { useParams, Link, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lock, Heart, Bookmark, Flag, Share2 } from "lucide-react";
import Loading from "../../../Components/Loading/Loading";
import useAuth from "../../../Hooks/UseAuth";
import { toast } from "react-toastify";
import useRole from "../../../Hooks/useRole";
import useAxios from "../../../Hooks/useAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isPremium } = useRole();

  /* ---------------- Fetch Lesson ---------------- */
  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/lessons/public/${id}`);
      return res.data;
    },
  });

  const isLiked = user && lesson.likes?.includes(user.email);

  /* ---------------- Like Mutation ---------------- */
  const likeMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/lessons/like/${id}`, { email: user?.email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson-details", id]);
    },
  });

  if (isLoading) return <Loading />;

  if (isError || !lesson) {
    return <div className="pt-28 text-center text-white">Lesson not found</div>;
  }

  const isLocked = lesson.access === "premium" && !isPremium;

  /* ---------------- Actions ---------------- */
  const handleLike = () => {
    if (!user) {
      toast.error("Please log in to like");
      navigate("/signin");
      return;
    }
    likeMutation.mutate();
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto text-white space-y-10">
      {/* ================= Lesson Card ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-linear-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden"
      >
        {/* Image */}
        <div className="relative">
          <img
            src={
              lesson.image?.url || "https://i.ibb.co/4YQ6q8m/placeholder.jpg"
            }
            className={`w-full h-80 object-cover ${isLocked && "blur-md"}`}
            alt={lesson.title}
          />

          {/* Premium Lock Overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
              <Lock size={40} />
              <p className="mt-3 font-semibold">Premium Lesson</p>
              <Link to="/upgrade" className="mt-2 text-yellow-300 underline">
                Upgrade to unlock
              </Link>
            </div>
          )}
        </div>

        <div className={`p-8 space-y-6 ${isLocked && "blur-sm select-none"}`}>
          {/* Title */}
          <h1 className="text-3xl font-bold">{lesson.title}</h1>

          {/* Category + Tone */}
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
              {lesson.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
              {lesson.tone}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {lesson.description}
          </p>

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 border-t border-white/10 pt-4">
            <span>📅 Created: {new Date(lesson.createdAt).toDateString()}</span>
            <span>🌍 Visibility: Public</span>
            <span>⏱️ Reading Time: ~5 min</span>
          </div>
        </div>
      </motion.div>

      {/* ================= Author Section ================= */}
      <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-5">
        <img
          src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold">{lesson?.authorName}</h4>
          <p className="text-sm text-gray-400">Lesson Creator</p>
        </div>
        <Link
          to={`/profile/${lesson.authorEmail}`}
          className="text-sm text-yellow-300 underline"
        >
          View lessons
        </Link>
      </div>

      {/* ================= Stats ================= */}
      <div className="flex gap-6 text-sm text-gray-300">
        <span>❤️ {lesson.likesCount || 0} Likes</span>
        <span>🔖 {lesson.favoritesCount || 0} Favorites</span>
        <span>👀 {Math.floor(Math.random() * 10000)} Views</span>
      </div>

      {/* ================= Actions ================= */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleLike}
          className={`btn btn-outline ${
            isLiked ? "text-red-500 border-red-500" : ""
          }`}
        >
          <Heart size={16} fill={isLiked ? "red" : "none"} />
          {isLiked ? "Liked" : "Like"}
        </button>

        <button className="btn btn-outline">
          <Bookmark size={16} /> Save
        </button>
        <button className="btn btn-outline">
          <Flag size={16} /> Report
        </button>
        <button className="btn btn-outline">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* ================= Comments ================= */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        {user ? (
          <textarea
            placeholder="Write a comment..."
            className="w-full bg-black/30 rounded-lg p-3 text-white"
          />
        ) : (
          <p className="text-gray-400">Log in to comment</p>
        )}
      </div>

      {/* ================= Similar Lessons ================= */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Similar Lessons</h3>
        <p className="text-gray-400 text-sm">
          (Fetch by category: {lesson.category} or tone: {lesson.tone})
        </p>
      </div>
    </div>
  );
};

export default LessonDetails;

// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import Loading from "../../../Components/Loading/Loading";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const LessonDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();

//   /* ---------------- Fetch lesson ---------------- */
//   const {
//     data: lesson,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["lesson-details", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/lessons/public/${id}`);
//       return res.data;
//     },
//   });

//   /* ---------------- States ---------------- */
//   if (isLoading) return <Loading />;

//   if (isError || !lesson) {
//     return <div className="pt-28 text-center text-white">Lesson not found</div>;
//   }

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="pt-28 px-6 max-w-4xl mx-auto text-white">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="rounded-3xl bg-linear-to-br from-white/10 to-white/5
//         backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden"
//       >
//         {/* Image */}
//         <img
//           src={lesson.image?.url || "https://i.ibb.co/4YQ6q8m/placeholder.jpg"}
//           className="w-full h-72 object-cover"
//           alt={lesson.title}
//         />

//         <div className="p-8 space-y-6">
//           {/* Title */}
//           <h1 className="text-3xl font-bold">{lesson?.title}</h1>

//           {/* Meta */}
//           <div className="flex gap-3 flex-wrap">
//             <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
//               {lesson.category}
//             </span>
//             <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
//               {lesson.tone}
//             </span>
//           </div>

//           {/* Description */}
//           <p className="text-gray-300 leading-relaxed">{lesson?.description}</p>

//           {/* Metadata */}
//           <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 border-t border-white/10 pt-4">
//             <span>📅 Created: {new Date(lesson?.createdAt).toDateString()}</span>
//             <span>🌍 Visibility: Public</span>
//             <span>⏱️ Reading Time: ~5 min</span>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LessonDetails;
