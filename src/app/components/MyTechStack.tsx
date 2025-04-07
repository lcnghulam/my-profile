import techStackList from "../data/TechStackList";
import { Icon } from "@iconify/react";

export default function TechSlider() {
  return (
    <div className="overflow-hidden w-full my-auto mb-2">
      <style>{`
          @keyframes scrollLoop {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
  
          .slider-track {
            animation: scrollLoop 50s linear infinite;
          }
  
          .slider:hover .slider-track {
            animation-play-state: paused;
          }
  
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
  
          .no-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}</style>

      <div className="slider relative w-full overflow-hidden no-scrollbar">
        <div className="slider-track flex w-max">
          {[...techStackList, ...techStackList].map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-15 flex-shrink-0 mx-2"
            >
              {tech.type === "image" ? (
                <img src={tech.url} alt={tech.name} className="h-10 w-10" />
              ) : (
                <Icon
                  icon={tech.iconify as string}
                  className="h-10 w-10 text-white"
                />
              )}
              <p className="text-sm mt-1 text-white/70 text-center">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
