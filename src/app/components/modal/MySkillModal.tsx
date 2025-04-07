import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import techStackList from "@/app/data/TechStackList";

interface MySkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const softSkillList = [
  {
    icon: "heroicons-outline:speakerphone",
    title: "Public Speaking",
    score: "7.5/10",
  },
  {
    icon: "icon-park-outline:communication",
    title: "Communication",
    score: "8/10",
  },
  {
    icon: "garden:relationshape-connect-26",
    title: "Problem Solving",
    score: "7.5/10",
  },
  {
    icon: "garden:clock-cycle-stroke-16",
    title: "Time Management",
    score: "7.5/10",
  },
  {
    icon: "fluent:people-team-20-regular",
    title: "Teamwork",
    score: "9/10",
  },
  {
    icon: "game-icons:relationship-bounds",
    title: "Adaptability",
    score: "8/10",
  },
];


export const MySkillModal: React.FC<MySkillModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
        setActiveCategory("All")
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        setActiveCategory("All");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  const filteredIcons =
    activeCategory === "All"
      ? techStackList
      : techStackList.filter((icon) => icon.category === activeCategory);

  const categories = ["All", "Frontend", "Backend", "Tools", "Design"];

  if (!isClient || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden">
      <div
        className="bg-gray-900 rounded-xl shadow-xl h-[90%] w-[95%] md:w-[60%] relative animate-fadeIn flex flex-col"
        ref={modalRef}
      >
        <div className="modal-header flex items-center px-6 py-3 gap-2 border-b border-gray-700">
          <Icon icon="ph:code-duotone" className="h-6 w-6" />
          <p className="text-xl font-semibold">Skills</p>
          <button
            onClick={onClose}
            className="ms-auto text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="modal-body p-6 flex-1 overflow-y-auto">
          <div className="inline-flex items-center mb-3">
            <Icon icon="noto:rocket" className="h-6 w-6" />
            <h3 className="text-xl font-bold font-sans tracking-[7] ms-3">
              Tech Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-gray-800/50 text-gray-400 hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-6">
            {filteredIcons.map((icon) => (
              <div
                key={icon.name}
                className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center gap-1 hover:bg-gray-700/50 transition-colors"
              >
                {icon.type === "image" ? (
                  <img
                    src={icon.url}
                    alt={icon.name}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <Icon
                    icon={icon.iconify as string}
                    className="w-12 h-12 text-white"
                  />
                )}
                <span className="font-mono text-gray-300 text-sm text-center">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
          <div className="inline-flex items-center mb-3">
            <Icon icon="ph:brain-light" className="h-6 w-6" />
            <h3 className="text-xl font-bold font-sans tracking-[7] ms-3">
              Soft Skill
            </h3>
          </div>
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4">
            {softSkillList.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <Icon icon={skill.icon} className="w-6 h-6" />
                  <span className="font-mono font-light">{skill.title}</span>
                  <span className="font-mono font-extralight">
                    {skill.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
