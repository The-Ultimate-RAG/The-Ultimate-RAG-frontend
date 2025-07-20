import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InitialRedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleInitialRedirect = async () => {
      if (location.pathname === "/") {
        try {
          const response = await fetch("/_api/", {
            method: "GET",
            redirect: "follow",
          });
          if (response.ok) {
            console.log("Backend redirect response URL", response.url);
            if (response.url && response.url != window.location.href) {
              const newPath = new URL(response.url).pathname;
              if (location.pathname !== newPath) {
                navigate(newPath, { replace: true });
              }
            } else {
              const data = await response.json();
              if (data && data.url) {
                navigate(data.url, { replace: true });
              }
            }
          } else {
            console.error("Failed to get initial chat URL: ", response.status);
          }
        } catch (error) {
          console.error("Error getting chat URL: ", error);
        }
      }
    };

    handleInitialRedirect();
  }, [location.pathname, navigate]);

  return null;
};

export default InitialRedirectHandler;
