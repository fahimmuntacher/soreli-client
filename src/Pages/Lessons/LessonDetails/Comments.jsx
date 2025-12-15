import { useState } from "react";

const Comments = ({ comments, commentsLoading, commentText, setCommentText, onComment, user }) => {
  return (
    <>
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>

        {user ? (
          <div className="space-y-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-black/30 rounded-lg p-3 text-white resize-none"
            />
            <button
              onClick={onComment}
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

      <div className="space-y-4 mt-4">
        {commentsLoading ? (
          <p className="text-gray-400">Loading comments...</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="flex gap-3 bg-black/30 rounded-xl p-4">
              <img
                src={c.userPhoto || "https://i.ibb.co/2n4nJ0k/avatar.png"}
                className="w-10 h-10 rounded-full"
                alt={c.userName}
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
    </>
  );
};

export default Comments;
