"use client";

import { useEffect, useState } from "react";

type BatteryStatus = {
  batteryLevel: number | null;
  isCharging: boolean | null;
  networkType: string;
  isOnline: boolean;
};

export default function BatteryNetwork() {
  const [status, setStatus] = useState<BatteryStatus>({
    batteryLevel: null,
    isCharging: null,
    networkType: "Unknown",
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : false,
  });

  useEffect(() => {
    const getBatteryStatus = async () => {
      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery();

          const updateBattery = () => {
            setStatus((prev) => ({
              ...prev,
              batteryLevel: Math.round(battery.level * 100),
              isCharging: battery.charging,
            }));
          };

          updateBattery();
          battery.addEventListener("levelchange", updateBattery);
          battery.addEventListener("chargingchange", updateBattery);
        } catch (error) {
          console.error("Battery API tidak didukung!", error);
        }
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
      window.removeEventListener("online", getNetworkStatus);
      window.removeEventListener("offline", getNetworkStatus);
    };
  }, []);

  return status;
}
