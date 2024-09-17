import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { cn } from "./lib/utils";
import AnimatedGridPattern from "./components/magicui/animated-grid-pattern";
import AppRoutes from "./Routes";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background p-20">
        <div className="z-10">
          <AppRoutes />
        </div>
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
    </Router>
  );
};

export default App;
