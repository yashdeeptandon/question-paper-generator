import { Button } from "../components/ui/button";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss();
    toast.warning("This site is Under Maintenance.");
  }, []);

  return (
    <main className="w-full h-full flex flex-col">
      <ToastContainer />
      <p className="mt-[50px] w-full pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Generate Paper
      </p>
      <section className="w-full h-[200px] flex flex-col p-4 mt-[100px]">
        <div className="w-full flex flex-row gap-2 items-center justify-center">
          <Button onClick={() => navigate("/generate-paper")}>
            Generate Question Paper
          </Button>

          <Button onClick={() => navigate("/add-questions")}>
            Add Questions
          </Button>
        </div>
      </section>
    </main>
  );
};

export default MainScreen;
