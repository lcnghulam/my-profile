"use client";

import { useEffect, useState } from "react";
import WelcomeNotif from "./WelcomeNotif";

export default function useOverlay() {
  // Overlay
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showOverlay && <WelcomeNotif />}
    </>
  )
}
