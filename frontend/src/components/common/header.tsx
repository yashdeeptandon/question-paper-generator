import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, ArrowLeft, ArrowRight } from "lucide-react"; // Use icons
import { cn } from "../../lib/utils";
import { RainbowButton } from "../../components/ui/rainbow-button";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we can go back or forward in history
    setCanGoBack(window.history.length > 1);
    setCanGoForward(window.history.state?.idx < window.history.length - 1);
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  const handleForward = () => {
    if (canGoForward) {
      navigate(1);
    }
  };

  return (
    <header className="w-full flex items-center justify-between p-4 sticky top-0">
      {/* Back and Forward Buttons */}
      <div className="flex gap-4">
        {canGoBack && (
          <button
            onClick={handleBack}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Go Back"
          >
            <ArrowLeft
              size={24}
              className="text-gray-800 dark:text-gray-100 transition-colors"
            />
          </button>
        )}
        {canGoForward && (
          <button
            onClick={handleForward}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Go Forward"
          >
            <ArrowRight
              size={24}
              className="text-gray-800 dark:text-gray-100 transition-colors"
            />
          </button>
        )}
      </div>

      {/* Theme Toggle Button */}
      <RainbowButton
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-full transition-all duration-500 ease-in-out transform",
          isDarkMode
            ? "bg-gray-200 text-white hover:bg-gray-300"
            : "bg-gray-800 text-white hover:bg-gray-700",
          "hover:scale-105 hover:shadow-xl"
        )}
        aria-label="Toggle theme"
      >
        <div
          className={cn(
            "transition-transform duration-500 ease-in-out",
            isDarkMode ? "rotate-180" : "rotate-0"
          )}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </div>
      </RainbowButton>
    </header>
  );
};

export default Header;
