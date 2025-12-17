import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, BookOpen, Flag, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";


const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  /* ================= PLATFORM STATS ================= */

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const { data: lessonGrowth = [] } = useQuery({
    queryKey: ["lesson-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lesson-growth");
      return res.data;
    },
  });

  const { data: userGrowth = [] } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/user-growth");
      return res.data;
    },
  });

  const { data: contributors = [] } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/top-contributors");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="text-white space-y-12">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <p className="text-gray-400 mt-2">
          Monitor system activity & growth at a glance
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users />}
          title="Total Users"
          value={stats.totalUsers}
        />
        <StatCard
          icon={<BookOpen />}
          title="Public Lessons"
          value={stats.totalLessons}
        />
        <StatCard
          icon={<Flag />}
          title="Reported Lessons"
          value={stats.reportedLessons}
        />
        <StatCard
          icon={<TrendingUp />}
          title="Today's Lessons"
          value={stats.todayLessons}
        />
      </div>

      {/* ================= GRAPHS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Lesson Growth */}
        <ChartCard title="Lesson Growth">
          <LineChart data={lessonGrowth}>
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="lessons"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ChartCard>

        {/* User Growth */}
        <ChartCard title="User Growth">
          <LineChart data={userGrowth}>
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ChartCard>
      </div>

      {/* ================= TOP CONTRIBUTORS ================= */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Most Active Contributors
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {contributors.map((user, index) => (
            <motion.div
              key={user.email}
              className="flex items-center justify-between p-4 border-b border-white/10 last:border-none"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              <span className="text-sm text-green-400 font-semibold">
                {user.lessonsCount} lessons
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

/* ================= REUSABLE ================= */

const StatCard = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4"
  >
    <div className="p-3 rounded-xl bg-white/10">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-80">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
);
