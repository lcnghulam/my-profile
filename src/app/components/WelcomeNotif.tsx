"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function WelcomeNotif() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-5 right-5 p-6 py-3 bg-white backdrop-blur-md text-black text-sm font-[system-ui] font-medium rounded-2xl shadow-lg z-50 items-center inline-flex space-x-2"
        >
          <Icon icon="fluent-color:chat-more-24" className="w-7 h-7" />
          <p className="font-bold text-base">Welcome to My Profile!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}