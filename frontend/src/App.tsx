import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { cn } from "./lib/utils";
import AnimatedGridPattern from "./components/magicui/animated-grid-pattern";
import AppRoutes from "./Routes";
import "./App.css"; // Import your global styles
import { Moon, Sun } from "lucide-react";
import { RainbowButton } from "./components/ui/rainbow-button";

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
    <Router>
      <div
        className={cn(
          "h-full w-full items-center justify-center overflow-hidden",
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        )}
      >
        <RainbowButton
          onClick={toggleTheme}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full transition-all duration-500 ease-in-out transform",
            isDarkMode
              ? "bg-gray-200 text-white hover:bg-gray-300"
              : "bg-gray-800 text-white hover:bg-gray-700",
            "hover:scale-105 hover:shadow-xl"
          )}
          aria-label="Toggle theme"
        >
          {/* Rotate Sun/Moon icons based on theme */}
          <div
            className={cn(
              "transition-transform duration-500 ease-in-out",
              isDarkMode ? "rotate-180" : "rotate-0"
            )}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </div>
        </RainbowButton>

        <div className="w-full h-full z-10">
          <AppRoutes />
        </div>

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
    </Router>
  );
};

export default App;
