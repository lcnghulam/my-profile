"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { certificateList } from "./data/CertificateList";

export default function CertificateSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % certificateList.length);
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-lg bg-gray-800/35"
        >
          <h3 className="text-lg font-semibold">
            <div className="inline-flex gap-1">
              <Icon icon="iconamoon:certificate-badge-light" />
              {certificateList[current].name}
            </div>
          </h3>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
