import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="w-full max-w-lg text-center">
        <div className="relative mb-6">
          <h1 className="text-9xl font-extrabold tracking-widest text-indigo-500">
            404
          </h1>
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          </div>
        </div>

        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Page Not Found</h2>

        <p className="mx-auto mb-8 max-w-md text-gray-400">
          Oops! The page you are looking for doesn't exist, has been moved, or
          the URL is incorrect.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
          >
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-700 px-6 py-3 font-semibold transition hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-600">Error code: 404</p>
      </div>
    </div>
  );
};

export default PageNotFound;
