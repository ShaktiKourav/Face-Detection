import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdFaceRetouchingNatural } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-10 px-6 pb-6">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/70 bg-white/70 backdrop-blur-2xl shadow-[0_15px_45px_rgba(168,85,247,.12)]">

        <div className="flex flex-col items-center justify-between gap-6 px-8 py-6 md:flex-row">

          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg">
              <MdFaceRetouchingNatural size={26} />
            </div>

            <div>
              <h2 className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-xl font-bold text-transparent">
                Face Detection System
              </h2>

              <p className="text-sm text-gray-500">
                Developed by <span className="font-semibold">Shakti Kourav</span>
              </p>
            </div>
          </div>

          {/* Center */}
          <div className="flex items-center gap-8 text-sm font-medium text-gray-800">
            <button className="transition hover:text-pink-500">
              Privacy Policy
            </button>

            <button className="transition hover:text-pink-600">
              Contact Us
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500 transition hover:scale-110 hover:bg-pink-500 hover:text-white">
              <FaGithub size={18} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition hover:scale-110 hover:bg-violet-600 hover:text-white">
              <FaLinkedin size={18} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500 transition hover:scale-110 hover:bg-pink-500 hover:text-white">
              <FaInstagram size={18} />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-violet-100 px-6 py-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 <span className="font-semibold">Face Detection System</span> |
            Developed by <span className="font-semibold text-violet-600">Shakti Kourav</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;