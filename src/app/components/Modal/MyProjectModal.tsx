import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { projectList } from "@/app/components/data/ProjectList";

interface MyProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyProjectModal: React.FC<MyProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
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

  if (!isClient || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden">
      <div
        className="bg-gray-900 rounded-xl shadow-xl h-[90%] w-[90%] xl:w-[40%] lg:w-[50%] md:w-[60%] relative animate-fadeIn flex flex-col"
        ref={modalRef}
      >
        <div className="modal-header flex items-center px-6 py-3 gap-2 border-b border-gray-700">
          <Icon icon="simple-icons:blueprint" className="h-6 w-6" />
          <p className="text-xl font-semibold">Projects</p>
          <button
            onClick={onClose}
            className="ms-auto text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="modal-body p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectList.map((project) => (
              <div
                key={project.name}
                className="bg-gray-800/50 rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <img
                    alt={project.name}
                    className="w-full h-full object-cover"
                    src={project.image}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.type.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectModal;