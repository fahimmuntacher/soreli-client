import { Lock } from "lucide-react";
import { Link } from "react-router";

const LessonDetailCard = ({ lesson, isLocked }) => (
  <div
    className={`rounded-3xl bg-linear-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden`}
  >
    <div className="relative">
      <img
        src={lesson.image?.url || "https://i.ibb.co/4YQ6q8m/placeholder.jpg"}
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
  </div>
);

export default LessonDetailCard;
