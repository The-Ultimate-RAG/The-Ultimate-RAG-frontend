import React, { useState, useEffect } from 'react';
import Button from '../buttons/MainButton/Button';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
      return localStorage.getItem("theme") ?? "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = theme;
      }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Button
          onClick={toggleTheme}
          children={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          width={"100%"}
          fontSize={"medium"}
        />
  );
}

export default ThemeSwitcher;