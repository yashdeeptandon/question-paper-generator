import { Button } from "../components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const MainScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full h-full flex justify-center">
      <section className="w-full max-w-lg flex flex-col mx-auto p-4">
        <div className="text-[32px]">Generate Question Paper</div>
        <br />
        <div className="flex flex-row gap-2">
          <Button onClick={() => navigate("/generate-paper")} className="btn">
            Generate Question Paper
          </Button>
          <Button onClick={() => navigate("/add-questions")} className="btn">
            Add Questions
          </Button>
        </div>
      </section>
    </main>
  );
};

export default MainScreen;
