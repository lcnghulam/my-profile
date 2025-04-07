"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function useDateTimezone() {
  const [dateTime, setDateTime] = useState({ time: "", date: "" });

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const updateTime = () => {
      setDateTime({
        time: dayjs().tz(userTimeZone).format("HH:mm:ss"),
        date: dayjs().tz(userTimeZone).format("dddd, DD MMMM YYYY"),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return dateTime;
}
