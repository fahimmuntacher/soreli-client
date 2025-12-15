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

import AuthorInfo from "./AuthorInfo";
import Comments from "./Comments";
import Pagination from "./Pagination";
import SharePopup from "./SharePopup";
import SimilarLessons from "./SimilarLessons";
import ReportPopUp from "./ReportPopUp";

const LessonDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isPremium } = useRole();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  // const [showReportPopup, setShowReportPopup] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => (await axiosPublic.get(`/lessons/public/${id}`)).data,
  });

  const { data: commentData, isLoading: commentsLoading } = useQuery({
    queryKey: ["lesson-comments", id, page],
    queryFn: async () =>
      (
        await axiosPublic.get(
          `/lessons/${id}/comments?page=${page}&limit=${limit}`
        )
      ).data,
    keepPreviousData: true,
  });

  const comments = commentData?.comments || [];
  const isLiked = user && lesson?.likes?.includes(user.email);
  const isSaved = user && lesson?.favorites?.includes(user.email);
  const isLocked = lesson?.access === "premium" && !isPremium;

  const likeMutation = useMutation({
    mutationFn: async () =>
      axiosSecure.patch(`/lessons/like/${id}`, { email: user?.email }),
    onSuccess: () => queryClient.invalidateQueries(["lesson-details", id]),
  });

  const favoriteMutation = useMutation({
    mutationFn: async () =>
      axiosSecure.patch(`/lessons/favorite/${id}`, { email: user.email }),
    onSuccess: () => queryClient.invalidateQueries(["lesson-details", id]),
  });

  const commentMutation = useMutation({
    mutationFn: async () =>
      axiosSecure.post(`/lessons/${id}/comments`, {
        comment: commentText,
        userName: user.displayName,
        userPhoto: user.photoURL,
      }),
    onSuccess: () => {
      setCommentText("");
      toast.success("Comment added");
      queryClient.invalidateQueries(["lesson-comments", id]);
    },
  });

  const reportMutation = useMutation({
    mutationFn: async () =>
      axiosSecure.post(`/lessons/report/${id}`, {
        email: user.email,
        reason: reportReason,
      }),
    onSuccess: () => {
      toast.success("Lesson reported successfully");
      setShowReport(false);
      setReportReason("");
    },
  });

  if (isLoading) return <Loading />;
  if (isError || !lesson)
    return <div className="pt-28 text-center text-white">Lesson not found</div>;

  const handleLike = () => {
    if (!user)
      return toast.error("Please log in to like") && navigate("/signin");
    likeMutation.mutate();
  };

  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto text-white space-y-10">
      {/* Lesson Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden"
      >
        <div className="relative">
          <img
            src={
              lesson.image?.url || "https://i.ibb.co/4YQ6q8m/placeholder.jpg"
            }
            className={`w-full h-80 object-cover ${isLocked && "blur-md"}`}
            alt={lesson.title}
          />
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
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
              {lesson.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
              {lesson.tone}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {lesson.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 border-t border-white/10 pt-4">
            <span>📅 Created: {new Date(lesson.createdAt).toDateString()}</span>
            <span>🌍 Visibility: Public</span>
            <span>⏱️ Reading Time: ~5 min</span>
          </div>
        </div>
      </motion.div>

      {/* Author */}
      <AuthorInfo
        authorName={lesson.authorName}
        authorEmail={lesson.authorEmail}
      />

      {/* Stats & Actions */}
      <div className="flex gap-6 text-sm text-gray-300">
        <span>❤️ {lesson.likesCount || 0} Likes</span>
        <span>🔖 {lesson.favoritesCount || 0} Favorites</span>
        <span>👀 {Math.floor(Math.random() * 10000)} Views</span>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleLike}
          className={`btn btn-outline ${
            isLiked ? "text-red-500 border-red-500" : ""
          }`}
        >
          <Heart size={16} fill={isLiked ? "red" : "none"} />{" "}
          {isLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={() => {
            if (!user)
              return (
                toast.error("Please log in to save lessons") &&
                navigate("/signin")
              );
            favoriteMutation.mutate();
          }}
          className={`btn btn-outline ${
            isSaved ? "text-yellow-400 border-yellow-400" : ""
          }`}
        >
          <Bookmark size={16} fill={isSaved ? "#facc15" : "none"} />{" "}
          {isSaved ? "Saved" : "Save"}
        </button>
        <button
          onClick={() => {
            if (!user)
              return (
                toast.error("Please log in to report") && navigate("/signin")
              );
            setShowReport(true);
          }}
          className="btn btn-outline"
        >
          <Flag size={16} /> Report
        </button>
        <button
          onClick={() => setShowSharePopup(true)}
          className="btn btn-outline"
        >
          <Share2 size={16} /> Share
        </button>
      </div>
      {/* Report PopUp */}
      {showReport && (
        <ReportPopUp
          reportReason={reportReason}
          setReportReason={setReportReason}
          setShowReport={setShowReport}
          showReport={showReport}
          reportMutation={reportMutation}
        />
      )}
      {showSharePopup && (
        <SharePopup lesson={lesson} onClose={() => setShowSharePopup(false)} />
      )}

      {/* Comments */}
      <Comments
        comments={comments}
        commentsLoading={commentsLoading}
        commentText={commentText}
        setCommentText={setCommentText}
        onComment={() => commentMutation.mutate()}
        user={user}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={commentData?.totalPages}
        setPage={setPage}
      />

      {/* Similar Lessons */}
      <SimilarLessons lesson={lesson} />
    </div>
  );
};

export default LessonDetails;