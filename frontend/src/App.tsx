import React, { useState, useEffect } from "react";
import { cn } from "./lib/utils";
import AnimatedGridPattern from "./components/magicui/animated-grid-pattern";
import AppRoutes from "./Routes";
import Header from "./components/common/header"; // Import the Header component
import "./App.css"; // Import your global styles

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full items-center justify-center overflow-auto",
        "min-h-screen",
        isDarkMode ? "bg-dark-background" : "bg-light-background"
      )}
    >
      {/* Header Component */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <div className="w-full h-[90%] z-10">
        <AppRoutes />
      </div>

      {/* Animated Grid Pattern */}
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
        )}
      />
    </div>
  );
};

export default App;
