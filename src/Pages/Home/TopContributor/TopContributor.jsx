import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/top-contributors");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />;
  }

  if (contributors.length === 0) return null;

  const topOne = contributors[0];

  return (
    <div className="max-w-7xl mx-auto">
      {/* SECTION TITLE */}
      <h2 className="flex items-center justify-center gap-2  text-white text-4xl my-16 font-bold">
        <Crown className=" text-yellow-400" size={35} />
        Top Contributors
      </h2>

      {/* MAIN BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#020617] via-[#020617]/90 to-[#020617] border border-white/10 px-6 py-5">
        {/* glow */}
        <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 to-transparent opacity-40 pointer-events-none" />

        <div className="relative flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {topOne.photoURL ? (
              <img
                src={topOne.photoURL}
                alt={topOne.name}
                className="w-14 h-14 rounded-xl object-cover border border-white/20"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center text-2xl font-bold text-white">
                {topOne.name?.charAt(0)}
              </div>
            )}

            <div>
              <h3 className="text-white font-semibold leading-tight">
                {topOne.name}
              </h3>
              <p className="text-xs text-gray-400">{topOne.email}</p>

              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                <Crown size={12} />
                #1 Contributor
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <p className="text-2xl font-bold text-green-400 leading-none">
              {topOne.lessonsCount}
            </p>
            <p className="text-xs text-gray-400">Lessons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
