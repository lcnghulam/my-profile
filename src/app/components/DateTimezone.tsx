"use client"; // ⬅️ WAJIB ada biar ini cuma render di client

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend Day.js dengan plugin UTC & Timezone
dayjs.extend(utc);
dayjs.extend(timezone);

export default function DateTimezone() {
  const [dateTime, setDateTime] = useState({ time: "", date: "" });
  const [isClient, setIsClient] = useState(false); // ⬅️ Tambah ini biar aman dari SSR

  useEffect(() => {
    setIsClient(true); // Sekarang sudah di client

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const updateTime = () => {
      setDateTime({
        time: dayjs().tz(userTimeZone).format("HH:mm:ss"),
        date: dayjs().tz(userTimeZone).format("dddd, DD MMMM YYYY"),
      });
    };

    updateTime(); // Jalankan langsung biar gak delay
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // ⬅️ Hindari render di server

  return (
    <>
      <span className="text-3xl font-bold">{dateTime.time}</span>
      <span className="text-lg text-gray-400">{dateTime.date}</span>
    </>
  );
}
