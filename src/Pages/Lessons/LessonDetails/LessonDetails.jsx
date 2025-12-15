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
import { useState } from "react";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isPremium } = useRole();
  const [showSharePopup, setShowSharePopup] = useState(false);

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

  const isLiked = user && lesson?.likes?.includes(user.email);
  const isSaved = user && lesson?.favorites?.includes(user.email);

  /* ---------------- Comment get ---------------- */
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: commentData, isLoading: commentsLoading } = useQuery({
    queryKey: ["lesson-comments", id, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/lessons/${id}/comments?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const comments = commentData?.comments || [];

  /* ---------------- Like Mutation ---------------- */
  const likeMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/lessons/like/${id}`, { email: user?.email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson-details", id]);
    },
  });

  /* ---------------- Comment Mutation ---------------- */
  const [commentText, setCommentText] = useState("");

  const commentMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post(`/lessons/${id}/comments`, {
        comment: commentText,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });
    },
    onSuccess: () => {
      setCommentText("");
      toast.success("Comment added");
      queryClient.invalidateQueries(["lesson-comments", id]);
    },
  });

  // /* ---------------- Reports ---------------- */
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const reportMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post(`/lessons/report/${id}`, {
        email: user.email,
        reason: reportReason,
      });
    },
    onSuccess: () => {
      toast.success("Lesson reported successfully");
      setShowReport(false);
      setReportReason("");
    },
  });

  /* ---------------- Favorite Mutation ---------------- */

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/lessons/favorite/${id}`, {
        email: user.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson-details", id]);
      // toast.success("Updated favorites");
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
        {/* liked button */}
        <button
          onClick={handleLike}
          className={`btn btn-outline ${
            isLiked ? "text-red-500 border-red-500" : ""
          }`}
        >
          <Heart size={16} fill={isLiked ? "red" : "none"} />
          {isLiked ? "Liked" : "Like"}
        </button>

        {/* save button */}
        <button
          onClick={() => {
            if (!user) {
              toast.error("Please log in to save lessons");
              navigate("/signin");
              return;
            }
            favoriteMutation.mutate();
          }}
          className={`btn btn-outline ${
            isSaved ? "text-yellow-400 border-yellow-400" : ""
          }`}
        >
          <Bookmark size={16} fill={isSaved ? "#facc15" : "none"} />
          {isSaved ? "Saved" : "Save"}
        </button>

        {/* report button */}
        <button
          onClick={() => {
            if (!user) {
              toast.error("Please log in to report");
              navigate("/signin");
              return;
            }
            setShowReport(true);
          }}
          className="btn btn-outline"
        >
          <Flag size={16} /> Report
        </button>
        {showReport && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#0f172a] p-6 rounded-2xl w-full max-w-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-3">Report Lesson</h3>

              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full bg-black/40 p-2 rounded-lg text-white mb-4"
              >
                <option value="">Select reason</option>
                <option>Inappropriate Content</option>
                <option>Hate Speech or Harassment</option>
                <option>Misleading or False Information</option>
                <option>Spam or Promotional Content</option>
                <option>Sensitive or Disturbing Content</option>
                <option>Other</option>
              </select>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowReport(false)}
                  className="btn btn-sm btn-outline"
                >
                  Cancel
                </button>

                <button
                  disabled={!reportReason}
                  onClick={() => reportMutation.mutate()}
                  className="btn btn-sm btn-error"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* share button */}
        <button
          onClick={() => setShowSharePopup(true)}
          className="btn btn-outline"
        >
          <Share2 size={16} /> Share
        </button>
        {showSharePopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#0f172a] p-6 rounded-2xl w-full max-w-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Share this lesson</h3>
              <div className="flex justify-around">
                <FacebookShareButton
                  url={window.location.href}
                  quote={lesson.title}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={lesson.title}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  title={lesson.title}
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={window.location.href}>
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
                <EmailShareButton
                  url={window.location.href}
                  subject={lesson.title}
                >
                  <EmailIcon size={40} round />
                </EmailShareButton>
              </div>

              <button
                onClick={() => setShowSharePopup(false)}
                className="mt-4 w-full btn btn-sm btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= Comments ================= */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          {/* Comments ({comments?.length}) */}
        </h3>

        {user ? (
          <div className="space-y-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-black/30 rounded-lg p-3 text-white resize-none"
            />

            <button
              onClick={() => commentMutation.mutate()}
              disabled={!commentText.trim()}
              className="btn btn-sm btn-outline"
            >
              Post Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Log in to comment</p>
        )}
      </div>

      {/* ================= comments ui ================= */}
      <div className="space-y-4">
        {commentsLoading ? (
          <p className="text-gray-400">Loading comments...</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="flex gap-3 bg-black/30 rounded-xl p-4">
              <img
                src={c.userPhoto || "https://i.ibb.co/2n4nJ0k/avatar.png"}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-semibold text-sm">{c.userName}</p>
                <p className="text-gray-300 text-sm">{c.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= Pagination ================= */}
      {commentData?.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn btn-xs btn-outline"
          >
            Prev
          </button>

          <span className="text-sm text-gray-400 flex items-center">
            Page {page} of {commentData.totalPages}
          </span>

          <button
            disabled={page === commentData.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-xs btn-outline"
          >
            Next
          </button>
        </div>
      )}

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
