import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="justify-center">
      <p className="flex items-center gap-2">
        © 2025 Made with{" "}
        <Icon icon="emojione-v1:heart-left-tip" className="w-6 h-6" /> by AGA
        Dev
      </p>
    </footer>
  );
}
