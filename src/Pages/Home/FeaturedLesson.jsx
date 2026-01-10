import { Sparkles, Star, Circle } from "lucide-react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LessonCard from "../../Components/Shared/LessonCard";

const FeaturedLessons = () => {
  const axios = useAxios();

  const { data: featuredLessons = [] } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axios.get("/lessons/featured");
      return res.data;
    },
  });

  return (
    <section className="flex flex-col">
      <div className="max-w-7xl mx-auto px-5">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Life Lessons
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-300 text-lg">
            Hand-picked lessons curated for deep personal growth
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {featuredLessons.map((lesson, index) => (
            <LessonCard lesson={lesson} index={index}></LessonCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
