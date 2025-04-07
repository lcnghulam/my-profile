import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
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
        className="bg-gray-900 rounded-xl shadow-xl h-[90%] w-[95%] md:w-[60%] relative animate-fadeIn flex flex-col"
        ref={modalRef}
      >
        <div className="modal-header flex items-center px-6 py-3 gap-2 border-b border-gray-700">
          <Icon icon="fluent-emoji:person-light" className="h-6 w-6" />
          <p className="text-xl font-semibold">My Profile</p>
          <button
            onClick={onClose}
            className="ms-auto text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Body scrollable */}
        <div className="modal-body p-6 flex-1 overflow-y-auto">
          <h3 className="text-xl font-bold font-sans tracking-[7] mb-2">
            Introduction
          </h3>
          <div className="flex justify-center mb-4">
            <img
              src="/images/my-profile-pic.jpg"
              alt="Profile picture"
              className="rounded-2xl"
            />
          </div>
          <p className="text-gray-300 font-montserrat mb-1">
            Hello Y'All! Perkenalkan,
          </p>
          <p className="text-gray-300 text-justify mb-4 indent-8">
            Nama saya Ahmad Ghulam Azkiya, lahir di Kediri, 8 April 1999 dengan
            pendidikan terakhir D-III Manajemen Informatika, Politeknik Negeri
            Malang PSDKU Kediri & lulus pada tahun 2020. Alamat KTP: Dsn. Pangkru RT03 RW03, Bendowulung,
            Sanankulon, Blitar, Jawa Timur. Domisili sekarang: Kp.Punden Utara RT03 RW05,
            Kutoharjo, Kaliwungu, Kendal, Jawa Tengah.
          </p>

          <h3 className="text-xl font-bold font-sans tracking-[7] mb-2">
            Interest
          </h3>
          <p className="text-gray-300 text-justify indent-8 mb-2">
            Main Interest saya tefokus pada bidang Teknologi & Otomotif. Dalam
            teknologi, fokus utama saya pada pengembangan web menggunakan teknologi terbaru :
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
            <img
              src="https://camo.githubusercontent.com/b80542ddb7afbc70d9f88eeb6ac77c69a109d6684215b548f532286308005243/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c61726176656c2d2532334646324432302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c61726176656c266c6f676f436f6c6f723d7768697465"
              alt="Laravel"
              data-canonical-src="https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&amp;logo=laravel&amp;logoColor=white"
            />
            <img
              src="https://camo.githubusercontent.com/9488873e99da337edf9b00aff473e593e96df2f3e01262550045d8f811aae3d0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7675656a732d2532333335343935652e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d767565646f746a73266c6f676f436f6c6f723d253233344643303844"
              alt="Vue.js"
              data-canonical-src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&amp;logo=vuedotjs&amp;logoColor=%234FC08D"
            />
            <img
              src="https://camo.githubusercontent.com/d3aedd4248faab6a0f5fadca2a4bb563d10a11f5a580aeff58d924b94c3451d6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e7578742d3030324533423f7374796c653d666f722d7468652d6261646765266c6f676f3d6e757874646f746a73266c6f676f436f6c6f723d23303044433832"
              alt="Nuxtjs"
              data-canonical-src="https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&amp;logo=nuxtdotjs&amp;logoColor=#00DC82"
            />
            <img
              src="https://camo.githubusercontent.com/f93e05694a6f01f2f6a37713a454a942442a5ff2b33083891096a6f7e57842f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642"
              alt="React"
              data-canonical-src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB"
            />
            <img
              src="https://camo.githubusercontent.com/d4ff95c6c85e810b4acfe5dbf01bf2b44680cf75945b21a7e5438c87b473f2c6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6578742d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6578742e6a73266c6f676f436f6c6f723d7768697465"
              alt="Next JS"
              data-canonical-src="https://img.shields.io/badge/Next-black?style=for-the-badge&amp;logo=next.js&amp;logoColor=white"
            />
          </div>
          <p className="text-gray-300 text-justify mb-4 indent-8">
            Selain itu kemampuan lain yg saya kuasai adalah mengemudi kendaraan
            roda 4 seperti mobil (manual & matic), minibus (elf & hiace), truk,
            hingga bus medium. Track record developer saya bisa dilihat di
            GitHub saya:
            <a
              href="https://github.com/lcnghulam"
              target="_blank"
              className="inline-flex items-center ml-1 align-middle"
            >
              <img
                src="https://camo.githubusercontent.com/7e282220b8ec0dd29cf99be1c0f5e82d74a42bc84ed834ee6afd86b4bad3bfee/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465"
                alt="GitHub"
                className="h-4 w-auto"
              />
            </a>
          </p>
          <h3 className="text-xl font-bold font-sans tracking-[7] mb-2">
            Goal
          </h3>
          <div className="w-full h-56 bg-gray-800/50 rounded-lg overflow-hidden mb-3">
            <img
              alt="Interests"
              className="w-full xl:-translate-y-15 object-cover"
              src="/images/309458.jpg"
            />
          </div>
          <p className="text-gray-300 text-justify indent-8">
            Setiap orang pasti memiliki impian hidup yg tinggi. Begitu juga saya
            yg mempunyai cita-cita hidup tinggi yaitu menjadi Full-Stack Web Dev
            & Mobile Dev. Skill yg tinggi pasti dibutuhkan juga di semua
            perusahaan demi bisa berkontribusi besar dalam pengembangan
            teknologi yg dibutuhkan oleh perusahaan untuk kemudahan akses
            informasi & maintenance.
          </p>
        </div>
      </div>
    </div>
  );
};
