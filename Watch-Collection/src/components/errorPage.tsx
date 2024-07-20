import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md">
          Go back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;