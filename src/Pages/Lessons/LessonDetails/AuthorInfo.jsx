import { Link } from "react-router";

const AuthorInfo = ({ authorName, authorEmail }) => {
  return (
    <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-5">
      <img
        src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
        className="w-14 h-14 rounded-full object-cover"
        alt={authorName}
      />
      <div className="flex-1">
        <h4 className="font-semibold">{authorName}</h4>
        <p className="text-sm text-gray-400">Lesson Creator</p>
      </div>
      <Link
        to={`/profile/${authorEmail}`}
        className="text-sm text-yellow-300 underline"
      >
        View lessons
      </Link>
    </div>
  );
};

export default AuthorInfo;
