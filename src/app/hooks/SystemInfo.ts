"use client";

import { useEffect, useState } from "react";

export default function SystemInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    os: "Detecting...",
    browser: "Detecting...",
    resolution: "Detecting...",
  });

  useEffect(() => {
    const ua = navigator.userAgent;

    const os = /Windows NT 10/.test(ua)
      ? "Windows 10 / 11"
      : /Mac/.test(navigator.platform)
      ? "macOS"
      : /Linux/.test(navigator.platform)
      ? "Linux"
      : /Android/.test(ua)
      ? "Android"
      : /iPhone|iPad/.test(ua)
      ? "iOS"
      : "Unknown OS";

    const browserMatch = () => {
      if (ua.includes("Edg")) return "Microsoft Edge";
      if (ua.includes("Brave")) return "Brave";
      if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
      if (ua.includes("Firefox")) return "Mozilla Firefox";
      if (ua.includes("Chrome")) return "Google Chrome";
      if (ua.includes("Safari")) return "Safari";
      return "Unknown Browser";
    };

    const version = () => {
      const match = ua.match(/(Chrome|Firefox|Safari|Edg|Opera|OPR)\/([\d.]+)/) || [];
      return match[2] || "Unknown";
    };

    const getResolution = () => `${window.innerWidth} × ${window.innerHeight}`;

    const updateDeviceInfo = () => {
      setDeviceInfo({
        os,
        browser: `${browserMatch()} ${version()}`,
        resolution: getResolution(),
      });
    };

    updateDeviceInfo();

    const resizeHandler = () => {
      setDeviceInfo((prev) => ({ ...prev, resolution: getResolution() }));
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return deviceInfo;
}
