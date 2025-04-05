const techStackIcons = [
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "Vue.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "Nuxt.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" },
    { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" },
    { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Vercel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  ];
  
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
            {[...techStackIcons, ...techStackIcons].map((tech, index) => (
              <div key={index} className="flex flex-col items-center w-15 flex-shrink-0 mx-2">
                <img src={tech.url} alt={tech.name} className="h-10 w-10" />
                <p className="text-sm mt-1 text-white/70 text-center">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  