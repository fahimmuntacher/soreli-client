import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { BookOpen, Bookmark, PlusCircle, BarChart3 } from "lucide-react";

import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LessonCard from "../../../Components/Shared/LessonCard";

const UserDashBoardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  /* ================= STATS ================= */

  // 🔹 Lessons (for count + recent)
  const { data: lessonData, isLoading: lessonsLoading } = useQuery({
    queryKey: ["dashboard-lessons", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/by-user/paginated?email=${user.email}&page=1&limit=4`
      );
      return res.data;
    },
  });

  // 🔹 Favorites count
  const { data: favorites = [], isLoading: favLoading } = useQuery({
    queryKey: ["dashboard-favorites", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/favorites?email=${user.email}`
      );
      return res.data;
    },
  });

  if (lessonsLoading || favLoading) return <Loading />;

  const totalLessons = lessonData?.pagination?.total || 0;
  const recentLessons = lessonData?.lessons || [];
  const totalFavorites = favorites.length;

  /* ================= CHART DATA ================= */
  const weeklyStats = Object.values(
    recentLessons.reduce((acc, lesson) => {
      const day = new Date(lesson.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!acc[day]) {
        acc[day] = { day, lessons: 0 };
      }

      acc[day].lessons += 1;
      return acc;
    }, {})
  );

  // console.log(weeklyStats[0]?.lessons);

  return (
    <div className="text-white space-y-12">
        <head>
        <title>User Dashboard - Soreli</title>  
        <meta name="description" content="User Dashboard Home Page of Soreli - Your Learning Companion" />
        </head>
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back,{" "}
          <span className="text-green-400">{user?.displayName}</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Here’s a snapshot of your learning journey
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BookOpen />}
          title="Total Lessons"
          value={totalLessons}
        />
        <StatCard
          icon={<Bookmark />}
          title="Saved Lessons"
          value={totalFavorites}
        />
        <StatCard
          icon={<BarChart3 />}
          title="This Week"
          value={weeklyStats[0]?.lessons || 0}
        />
        <StatCard
          icon={<PlusCircle />}
          title="Create New"
          link="/dashboard/add-lesson"
          isAction
        />
      </div>

      {/* ================= RECENT LESSONS ================= */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recently Added</h2>

        {recentLessons.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-10 rounded-xl text-center text-gray-400">
            No lessons yet. Start creating!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentLessons.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      {/* ================= MINI ANALYTICS ================= */}
        <h1 className="text-xl font-bold mb-4">Weekly Activity</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyStats}>
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis allowDecimals={false} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                background: "#020617",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar dataKey="lessons" radius={[8, 8, 0, 0]} fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashBoardHome;

/* ================= SMALL COMPONENT ================= */

const StatCard = ({ icon, title, value, link, isAction }) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 cursor-pointer"
    >
      <div className="p-3 rounded-xl bg-white/10">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );

  return isAction ? <Link to={link}>{content}</Link> : content;
};
