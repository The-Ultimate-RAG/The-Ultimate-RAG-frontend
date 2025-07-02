import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";

const NotFoundPage = () => {
  const location = useLocation(); // To show the path not found
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[var(--background-color)]">
      <h1 className="text-2xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        No match for `<code>{location.pathname}</code>`
      </p>
      <button
        onClick={() => (window.location.href = "/login")} // Or use useNavigate for internal navigation
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
      >
        Go to Login
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "var(--background-color)",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
