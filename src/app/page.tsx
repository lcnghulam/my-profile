"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import WelcomeNotif from "./components/WelcomeNotif";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend Day.js dengan plugin UTC & Timezone
dayjs.extend(utc);
dayjs.extend(timezone);

type BatteryStatus = {
  batteryLevel: number | null;
  isCharging: boolean | null;
  networkType: string;
  isOnline: boolean;
};

export default function Home() {
  // Overlay
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(true), 800); // Munculkan setelah 0.8 detik
    return () => clearTimeout(timer);
  }, []);

  // Date & Timezone
  const [deviceInfo, setDeviceInfo] = useState({
    os: "Detecting...",
    browser: "Detecting...",
    resolution: "Detecting...",
    time: "",
    date: "",
  });

  const [status, setStatus] = useState<BatteryStatus>({
    batteryLevel: null,
    isCharging: null,
    networkType: "Unknown",
    isOnline: navigator.onLine,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
      const ua = navigator.userAgent;
      if (ua.includes("Edg")) return "Microsoft Edge";
      if (ua.includes("Brave")) return "Brave";
      if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
      if (ua.includes("Firefox")) return "Mozilla Firefox";
      if (ua.includes("Chrome")) return "Google Chrome";
      if (ua.includes("Safari")) return "Safari";
      return "Unknown Browser";
    };

    const version = () => {
      const ua = navigator.userAgent;
      const match =
        ua.match(/(Chrome|Firefox|Safari|Edg|Opera|OPR)\/([\d.]+)/) || [];
      return match[2] || "Unknown";
    };
    // const browserMatch =
    //   ua.match(/(Chrome|Firefox|Safari|Edg|Opera|OPR|Brave)\/([\d.]+)/) || [];
    const browser = browserMatch();
    const browserVersion = version();

    const getResolution = () => `${window.innerWidth} × ${window.innerHeight}`;

    const updateTime = () => {
      setDeviceInfo({
        os,
        browser: `${browser} ${browserVersion}`,
        resolution: getResolution(),
        time: dayjs().tz(userTimeZone).format("HH:mm:ss"),
        date: dayjs().tz(userTimeZone).format("dddd, DD MMMM YYYY"),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    window.addEventListener("resize", () =>
      setDeviceInfo((prev) => ({ ...prev, resolution: getResolution() }))
    );

    const getBatteryStatus = async () => {
      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          setStatus((prev) => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
            isCharging: battery.charging,
          }));

          battery.addEventListener("levelchange", () =>
            setStatus((prev) => ({
              ...prev,
              batteryLevel: Math.round(battery.level * 100),
            }))
          );

          battery.addEventListener("chargingchange", () =>
            setStatus((prev) => ({
              ...prev,
              isCharging: battery.charging,
            }))
          );
        } catch (error) {
          console.error("Battery API tidak didukung!", error);
        }
      } else {
        console.warn("Battery API tidak tersedia di browser ini!");
      }
    };

    const getNetworkStatus = () => {
      const connection = (navigator as any).connection || null;
      let networkType = "Unknown";

      if (connection) {
        networkType = connection.type || connection.effectiveType || "Unknown";
      }

      if (networkType === "4g" && connection?.type === "wifi") {
        networkType = "Wi-Fi";
      }

      setStatus((prev) => ({
        ...prev,
        networkType: networkType.toUpperCase(),
        isOnline: navigator.onLine,
      }));
    };

    getBatteryStatus();
    getNetworkStatus();

    window.addEventListener("online", getNetworkStatus);
    window.addEventListener("offline", getNetworkStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  if (!isClient) return null;

  const techStackIcons = [
    {
      name: "HTML5",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
    },
    {
      name: "CSS3",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
    },
    {
      name: "JavaScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "PHP",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    },
    {
      name: "Laravel",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    },
    {
      name: "Vue.js",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Nuxt.js",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
    },
    {
      name: "React",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    // {
    //   name: "Flutter",
    //   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    // },
    // {
    //   name: "Dart",
    //   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    // },
    {
      name: "Tailwind",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "MySQL",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    // {
    //   name: "Python",
    //   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    // },
    {
      name: "Git",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Vercel",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-black flex flex-col items-center py-5 xl:px-40 lg:px-30 md:px-20 px-15">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Header />
      </motion.div>
      {showOverlay && <WelcomeNotif />}
      <main className="flex-1 w-full mb-3">
        <div
          id="MainGrid"
          className="grid grid-flow-row-dense grid-rows-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 auto-rows-max"
        >
          <div className="flex flex-col bg-gray-900/40 p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="icon-park-outline:computer" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> System Info</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <span className="text-xl font-bold">{deviceInfo.os}</span>
              <span className="text-lg text-gray-400">
                {deviceInfo.browser}
              </span>
              <span className="text-lg text-gray-400">
                {deviceInfo.resolution}
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-gray-900/40 p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="ri:time-zone-line" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> Date & Time</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <span className="text-3xl font-bold">{deviceInfo.time}</span>
              <span className="text-lg text-gray-400">{deviceInfo.date}</span>
            </div>
          </div>
          <div className="flex flex-col bg-gray-900/40 p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fluent:battery-8-28-regular" className="h-6 w-6" />
              <Icon icon="tabler:wifi" className="h-6 w-6" />
              <p className="flex items-center font-extrabold">
                Battery & Network
              </p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <span className="block text-xl font-bold">
                Battery:{" "}
                {status.batteryLevel !== null
                  ? `${status.batteryLevel}%`
                  : "🔴 Not Supported"}{" "}
                {status.isCharging ? "🔌 Charging" : ""}
              </span>
              <span className="block text-lg font-bold">
                Network: {status.networkType.toUpperCase()}
              </span>
              <span className="block text-lg text-gray-400">
                {status.isOnline ? "🟢 Online" : "🔴 Offline"}
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-gray-900/40 p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fluent-emoji:person-light" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> My Profile</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <div className="flex flex-col items-center justify-center text-center mt-auto mb-2">
                <img
                  src="/images/blank-profile.png"
                  alt="Profile picture"
                  className="h-[100px] w-[100px]"
                />
                <p className="text-bold mt-2">Ahmad Ghulam Azkiya, A.Md.Kom.</p>
              </div>
              <p className="text-neutral-50/50 italic mt-auto">
                Click to See Full...
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-gray-900/40 p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="ph:code-duotone" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> Skills</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <div className="flex flex-wrap gap-4 mb-2">
                {techStackIcons.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center mt-auto"
                  >
                    <img src={tech.url} alt={tech.name} className="h-10 w-10" />
                    <p className="text-sm mt-1 text-white/70">{tech.name}</p>
                  </div>
                ))}
              </div>
              <p className="text-neutral-50/50 italic mt-auto">
                Click to See Full...
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
