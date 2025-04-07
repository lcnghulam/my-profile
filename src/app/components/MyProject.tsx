import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectList } from "@/app/components/data/ProjectList";

export default function ProjectSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % projectList.length);
  };

  const startAutoSlide = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(next, 2000);
    }
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <div
      className="w-full max-w-md mx-auto text-white"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-lg bg-gray-800/35 flex items-center w-full"
        >
          <h3 className="text-lg font-semibold">
            <div className="me-2">
              {projectList[current].name}
            </div>
          </h3>
          <p className="text-sm text-neutral-400 mt-2">
            {projectList[current].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
