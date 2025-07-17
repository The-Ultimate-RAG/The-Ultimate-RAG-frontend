import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Messenger from "./pages/Messenger/Messenger";
import InitialRedirectHandler from "./components/InitialRedirectHandler/InitialRedirectHandler";

function App() {
  const theme = localStorage.getItem("theme") ?? "light";

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <InitialRedirectHandler />
      <div
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          margin: "12px",
        }}
      ></div>
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
        <Suspense
          fallback={
            <div className="text-white">
              <p>Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path={"/"} element={<Messenger />} />
            <Route path={"/chats/:chatId"} element={<Messenger />} />
            <Route path={"*"} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
