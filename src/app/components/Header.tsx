import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <header className="items-center text-center justify-center py-5 mb-5">
      <div className="inline-flex items-center">
        <h1 id="MainTitle" className="font-bold text-2xl tracking-[10] me-3">
          HELLO, Y'ALL!
        </h1>
        <Icon icon="game-icons:hand-bandage" className="h-10 w-10" />
      </div>
      <div className="relative flex flex-col items-center">
        <span className="font-medium tracking-[10]">
          Welcome to My Digital Space
        </span>
        <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent transform mt-3"></div>
      </div>
    </header>
  );
}
