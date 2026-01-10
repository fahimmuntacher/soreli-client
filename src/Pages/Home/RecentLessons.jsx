import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Sparkles, Star, Users, Clock } from "lucide-react";

const StatCard = ({ title, value, suffix, icon, color = "yellow" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 800;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad approx
      setCount(Math.floor(eased * value));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{count}{suffix || ""}</h3>
            <span className="text-sm text-gray-400">{value ? "" : ""}</span>
          </div>
        </div>

        <div className={`p-3 rounded-lg bg-${color}-500/20 border border-${color}-400/20`}> 
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-yellow-400 to-pink-500" style={{ width: `${Math.min(100, (value / Math.max(1, value)) * 100)}%` }} />
        </div>
      </div>
    </motion.div>
  );
};

const RecentLessons = () => {
  const axios = useAxios();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      try {
        const res = await axios.get("/stats/overview");
        return res.data;
      } catch (e) {
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  // Fallback sample numbers when no API available
  const sample = {
    totalLessons: 1245,
    featured: 42,
    contributors: 512,
    avgWeekly: 36,
  };

  const s = stats || sample;

  return (
    <section className="w-full max-w-7xl mx-auto px-5 flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Platform Statistics</h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">High-level metrics to show community growth and activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Lessons"
          value={s.totalLessons}
          icon={<Sparkles size={20} className="text-yellow-400" />}
          color="yellow"
        />

        <StatCard
          title="Featured"
          value={s.featured}
          icon={<Star size={20} className="text-pink-400" />}
          color="pink"
        />

        <StatCard
          title="Contributors"
          value={s.contributors}
          icon={<Users size={20} className="text-blue-400" />}
          color="blue"
        />

        <StatCard
          title="Avg / Week"
          value={s.avgWeekly}
          icon={<Clock size={20} className="text-green-400" />}
          color="green"
        />
      </div>
    </section>
  );
};

export default RecentLessons;
