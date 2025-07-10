// In App.tsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

import NotFoundPage from "./pages/NotFoundPage";
import PdfViewerComponent from "./components/Viewer/PdfViewerComponent";
import Chat from "./components/Chat/Chat";
import Button from "./components/buttons/MainButton/Button";
import Sidebar from "./components/Sidebar/Sidebar";
import UploadedFileCard from "./components/UploadedFileCard/UploadedFileCard";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));

const PdfViewerExample = () => {
  return (
    <PdfViewerComponent
      pdfUrl="/COMP_ARCH.pdf"
      textToHighlight={
        "Reference: CUDA Extension for C/C++ for GPU Programming"
      }
      initialPage={1466}
    />
  );
};

function App() {

  const theme = localStorage.getItem("theme") ?? "light";
  
  useEffect(() => {
          localStorage.setItem("theme", theme);
          document.body.className = theme;
        }, [theme]);

  return (
    <Router>
      <div
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          margin: "12px",
        }}
      >
      </div>
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
            <Route
              path={"/file-card"}
              element={
                <UploadedFileCard
                  fileName={"Some filename"}
                  fileType={"pdf"}
                  fileSize={42398443}
                />
              }
            />
            <Route path={"/chat"} element={<Chat />} />
            <Route path={"sidebar"} element={<Sidebar />} />
            <Route path={"/test"} element={<PdfViewerExample />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path={"*"} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
