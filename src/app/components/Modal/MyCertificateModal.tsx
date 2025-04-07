import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { certificateList } from "@/app/components/data/CertificateList";

interface MyCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyCertificateModal: React.FC<MyCertificateModalProps> = ({
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
        className="bg-gray-900 rounded-xl shadow-xl h-[90%] md:h-[70%] w-[90%] xl:w-[40%] lg:w-[50%] md:w-[60%] relative animate-fadeIn flex flex-col"
        ref={modalRef}
      >
        <div className="modal-header flex items-center px-6 py-3 gap-2 border-b border-gray-700">
          <Icon icon="ph:certificate" className="h-6 w-6" />
          <p className="text-xl font-semibold">Certificates</p>
          <button
            onClick={onClose}
            className="ms-auto text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="modal-body p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificateList.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-colors font-mono space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={cert.url}
                    alt={cert.name}
                    className="w-10 h-10 object-contain rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-x1 font-bold mb-1">{cert.name}</span>
                    <span className="text-sm font-light">{cert.publisher}</span>
                    <span className="text-xs text-gray-400">{cert.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCertificateModal;