import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-6">
      <div
        className="relative max-w-md w-full text-center
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-3xl p-10 shadow-[0_0_40px_rgba(255,0,0,0.15)]"
      >
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-red-500/20 blur-3xl rounded-full" />

        {/* Icon */}
        <div className="text-7xl mb-6">🚫</div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-red-500 mb-3">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          You don’t have permission to access this page. This area is restricted
          based on your role or subscription.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-white/10 text-white
            hover:bg-white/20 transition"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400
            hover:bg-red-500/30 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
