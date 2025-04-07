"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Header from "@/app/components/Header";
import Overlay from "@/app/components/Overlay";
import Footer from "@/app/components/Footer";
import SystemInfo from "@/app/hooks/SystemInfo";
import DateTimezone from "@/app/hooks/DateTimezone";
import BatteryNetwork from "@/app/hooks/BatteryNetwork";
import { MyProfileModal } from "./components/modal/MyProfileModal";
import TechSlider from "./components/MyTechStack";
import { MySkillModal } from "./components/modal/MySkillModal";
import CertificateSlider from "./components/MyCertificate";
import { MyCertificateModal } from "./components/modal/MyCertificateModal";
import ProjectSlider from "./components/MyProject";
import { MyProjectModal } from "./components/modal/MyProjectModal";

export default function Home() {
  // Date & Timezone
  const dateTime = DateTimezone();

  // System Info
  const deviceInfo = SystemInfo();

  // Battery & Network
  const { batteryLevel, isCharging, networkType, isOnline } = BatteryNetwork();

  // Modal
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  // Client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const anyModalOpen =
      profileModalOpen ||
      skillModalOpen ||
      certificateModalOpen ||
      projectModalOpen;

    document.body.style.overflow = anyModalOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    profileModalOpen,
    skillModalOpen,
    certificateModalOpen,
    projectModalOpen,
  ]);

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen bg-animated-gradient overflow-hidden flex flex-col items-center py-5 xl:px-60 lg:px-50 md:px-20 px-15">
      <div className="aurora-layer">
        <div
          className="aurora-glow"
          style={{
            top: "-15%",
            left: "-20%",
            animation: "aurora-move-1 17s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-glow"
          style={{
            top: "30%",
            left: "15%",
            animation: "aurora-move-2 15s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-glow"
          style={{
            top: "5%",
            left: "70%",
            animation: "aurora-move-3 12s ease-in-out infinite",
          }}
        />
      </div>
      <Header />
      <Overlay />
      <main className="flex-1 w-full mb-3">
        <div
          id="MainGrid"
          className="grid grid-flow-row-dense xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 auto-rows-max"
        >
          <div className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02]  ease-in-out transform p-4 rounded-lg overflow-x-hidden">
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
          <div className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02]  ease-in-out transform p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="ri:time-zone-line" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> Date & Time</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              {dateTime && (
                <>
                  <span className="text-3xl font-bold">{dateTime.time}</span>
                  <span className="text-lg text-gray-400">{dateTime.date}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02]  ease-in-out transform p-4 rounded-lg overflow-x-hidden">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fluent:battery-8-28-regular" className="h-6 w-6" />
              <Icon icon="tabler:wifi" className="h-6 w-6" />
              <p className="flex items-center font-extrabold">
                Battery & Network
              </p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <span className="block text-lg font-bold">
                Battery:{" "}
                {batteryLevel !== null
                  ? `${batteryLevel}%`
                  : "🔴 Not Supported"}{" "}
                {isCharging ? "🔌 Charging" : ""}
              </span>
              <span className="block text-md font-bold">
                Network: {networkType.toUpperCase()}
              </span>
              <span className="block text-lg text-gray-400">
                {isOnline ? "🟢 Online" : "🔴 Offline"}
              </span>
            </div>
          </div>
          <div
            onClick={() => setProfileModalOpen(true)}
            className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02] ease-in-out transform p-4 rounded-lg overflow-x-hidden cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fluent-emoji:person-light" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> My Profile</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <div className="flex flex-col items-center justify-center text-center mt-auto mb-2">
                <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
                  <img
                    src="/images/my-profile-pic.jpg"
                    alt="Profile picture"
                    className="w-full translate-y-0"
                  />
                </div>
                <p className="text-bold mt-2">Ahmad Ghulam Azkiya, A.Md.Kom.</p>
              </div>
              <p className="text-neutral-50/50 italic mt-auto">
                Click to see more...
              </p>
            </div>
          </div>
          <MyProfileModal
            isOpen={profileModalOpen}
            onClose={() => setProfileModalOpen(false)}
          />
          <div
            onClick={() => setSkillModalOpen(true)}
            className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02] ease-in-out transform p-4 rounded-lg overflow-x-hidden cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="ph:code-duotone" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> Skills</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <TechSlider />
              <p className="text-neutral-50/50 italic mt-auto">
                Click to see more...
              </p>
            </div>
          </div>
          <MySkillModal
            isOpen={skillModalOpen}
            onClose={() => setSkillModalOpen(false)}
          />
          <div
            onClick={() => setCertificateModalOpen(true)}
            className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02] ease-in-out transform p-4 rounded-lg overflow-hidden scrollbar-hide cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <Icon icon="ph:certificate" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> Certificates</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <div className="inline-flex items-center mt-auto mb-2">
                <CertificateSlider />
              </div>
              <p className="text-neutral-50/50 italic mt-auto">
                Click to see more...
              </p>
            </div>
          </div>
          <MyCertificateModal
            isOpen={certificateModalOpen}
            onClose={() => setCertificateModalOpen(false)}
          />
          <div className="flex flex-col bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02] ease-in-out transform p-4 rounded-lg overflow-hidden scrollbar-hide">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="proicons:globe" className="h-6 w-6" />
              <p className="flex items-center font-extrabold">
                My Social Links
              </p>
            </div>
            <div className="grid grid-flow-row-dense grid-cols-2 xs:grid-cols-1 gap-1.5 font-mono px-2">
              <a
                href="mailto:lcnghulam1@gmail.com"
                target="_blank"
                className="inline-flex items-center col-span-2 bg-gray-800/35 transition-colors duration-250 hover:bg-gray-400/80 hover:shadow-lg hover:scale-[1.02] ease-in-out transform py-2 px-4 rounded-4xl overflow-x-hidden"
              >
                <Icon icon="clarity:email-line" />
                <span className="mx-auto text-[10px]">
                  lcnghulam1@gmail.com
                </span>
              </a>
              <a
                href="https://wa.me/+6282334655255"
                target="_blank"
                className="inline-flex items-center col-span-2 bg-gray-800/35 transition-colors duration-250 hover:bg-gray-400/80 hover:shadow-lg hover:scale-[1.02] ease-in-out transform py-2 px-4 rounded-4xl overflow-x-hidden"
              >
                <Icon icon="ic:baseline-whatsapp" />
                <span className="mx-auto text-[10px]">WhatsApp</span>
              </a>
              <a
                href="https://fb.com/lcnghulam"
                target="_blank"
                className="inline-flex items-center bg-gray-800/35 transition-colors duration-250 hover:bg-gray-400/80 hover:shadow-lg hover:scale-[1.02] ease-in-out transform py-2 px-4 rounded-4xl"
              >
                <Icon icon="line-md:facebook" />
                <span className="mx-auto text-[10px]">lcnghulam</span>
              </a>
              <a
                href="https://instagram.com/lcn_ghulam"
                target="_blank"
                className="inline-flex items-center bg-gray-800/35 transition-colors duration-250 hover:bg-gray-400/80 hover:shadow-lg hover:scale-[1.02] ease-in-out transform py-2 px-4 rounded-4xl"
              >
                <Icon icon="proicons:instagram" />
                <span className="mx-auto text-[10px]">lcn_ghulam</span>
              </a>
              <a
                href="https://github.com/lcnghulam"
                target="_blank"
                className="inline-flex items-center bg-gray-800/35 transition-colors duration-250 hover:bg-gray-400/80 hover:shadow-lg hover:scale-[1.02] ease-in-out transform py-2 px-4 rounded-4xl"
              >
                <Icon icon="proicons:github" />
                <span className="mx-auto text-[10px]">lcnghulam</span>
              </a>
              <a
                href="http://linkedin.com/in/ahmad-ghulam-azkiya-778401160/"
                target="_blank"
                className="inline-flex items-center bg-gray-800/35 transition-colors duration-250 hover:bg-gray-400/80 hover:shadow-lg hover:scale-[1.02] ease-in-out transform py-2 px-4 rounded-4xl"
              >
                <Icon icon="ri:linkedin-fill" />
                <span className="mx-auto text-[10px]">A.Ghulam</span>
              </a>
            </div>
          </div>
          <div
            onClick={() => setProjectModalOpen(true)}
            className="flex flex-col xl:col-span-2 bg-gray-900/40 transition-colors duration-250 hover:bg-gray-800/40 hover:shadow-lg hover:scale-[1.02] ease-in-out transform p-4 rounded-lg overflow-x-hidden cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <Icon icon="simple-icons:blueprint" className="h-6 w-6" />
              <p className="flex items-center font-extrabold"> Projects</p>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center font-mono">
              <div className="flex items-center mt-auto mb-2">
                <ProjectSlider />
              </div>
              <p className="text-neutral-50/50 italic mt-auto">
                Click to see more...
              </p>
            </div>
          </div>
          <MyProjectModal
            isOpen={projectModalOpen}
            onClose={() => setProjectModalOpen(false)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
