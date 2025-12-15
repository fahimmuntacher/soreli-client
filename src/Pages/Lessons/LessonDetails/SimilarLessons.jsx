import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../../Components/Loading/Loading";

const SimilarLessons = ({ lesson }) => {
  const axiosPublic = useAxios();
  const id = lesson?._id;
  console.log(id);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["similar-lessons", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/lessons/similar/${id}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-gray-400">Loading similar lessons...</p>;
  }

  if (!lessons.length) {
    return <p className="text-gray-500">No similar lessons found</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Similar Lessons</h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {lessons.map((lesson) => (
          <Link
            key={lesson._id}
            to={`/lessons/${lesson._id}`}
            className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:scale-[1.02] transition"
          >
            <img
              src={
                lesson.image?.url || "https://i.ibb.co/4YQ6q8m/placeholder.jpg"
              }
              className="h-40 w-full object-cover"
              alt={lesson.title}
            />

            <div className="p-4 space-y-2">
              <h4 className="font-semibold line-clamp-2">{lesson.title}</h4>

              <div className="flex gap-2 text-xs text-gray-400">
                <span>{lesson.category}</span>
                <span>•</span>
                <span>{lesson.tone}</span>
              </div>

              <div className="flex gap-3 text-xs text-gray-400 mt-2">
                <span>❤️ {lesson.likesCount || 0}</span>
                <span>🔖 {lesson.favoritesCount || 0}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarLessons;
