import { useLocation } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[var(--background-color)]">
      <h1 className="text-2xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        No match for `<code>{location.pathname}</code>`
      </p>
      <button
        onClick={() => (window.location.href = "/login")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFoundPage;
