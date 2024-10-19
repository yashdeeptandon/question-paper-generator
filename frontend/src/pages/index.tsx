import { Button } from "../components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainScreen: React.FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   toast.dismiss();
  //   toast.warning("This site is Under Maintenance.");
  // }, []);

  return (
    <main className="w-full h-full flex flex-col">
      <ToastContainer />
      {/* Gradient Text */}
      <p className="mt-[50px] w-full pointer-events-none bg-gradient-to-b from-black to-gray-300/80 dark:from-white dark:to-slate-900/10 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent">
        Generate Paper
      </p>

      {/* Buttons Section */}
      <section className="w-full flex flex-col p-4 mt-[50px] md:mt-[100px]">
        <div className="w-full flex flex-row md:flex-row gap-4 items-center justify-center flex-wrap">
          {/* Generate Question Paper Button */}
          <Button
            onClick={() => navigate("/generate-paper")}
            className="w-fit md:w-auto px-6 py-3 text-lg"
          >
            Generate Question Paper
          </Button>

          {/* Add Questions Button */}
          <Button
            onClick={() => navigate("/add-questions")}
            className="w-fit md:w-auto px-6 py-3 text-lg"
          >
            Add Questions
          </Button>
        </div>
      </section>
    </main>
  );
};

export default MainScreen;
