import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-7xl font-bold mb-4">404</h1>

      <p className="text-gray-400 text-center max-w-md mb-6">
        {error?.statusText || "Page not found"}
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
