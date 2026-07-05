import { motion } from "framer-motion";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdEdit,
  MdFaceRetouchingNatural,
} from "react-icons/md";

const ProfileCard = ({
   name,
    role,
   email,
   avatar,
   phone,
   location
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]"
    >
      {/* Background Glow */}
      <div className="absolute -left-24 -top-24 h-60 w-60 rounded-full bg-pink-300/20 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-violet-300/20 blur-3xl"></div>

      {/* Cover */}
      <div className="h-36 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600"></div>

      <div className="relative px-8 pb-8">
        {/* Avatar */}
        <div className="-mt-16 flex justify-center">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
            />

            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-white bg-green-500"></span>
          </div>
        </div>

        {/* Name */}
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold">{name}</h2>

          <p className="mt-1 text-sm text-gray-500">{role}</p>
        </div>

        {/* Info */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-4">
            <MdEmail className="text-2xl text-pink-500" />
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-4">
            <MdPhone className="text-2xl text-violet-600" />
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/60 p-4">
            <MdLocationOn className="text-2xl text-pink-500" />
            <span>{location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-pink-50 p-5 text-center">
            <MdFaceRetouchingNatural className="mx-auto text-3xl text-pink-500" />
            <h3 className="mt-2 text-2xl font-bold">158</h3>
            <p className="text-xs text-gray-500">Detections</p>
          </div>

          <div className="rounded-2xl bg-violet-50 p-5 text-center">
            <h3 className="text-3xl">🎵</h3>
            <h3 className="mt-2 text-2xl font-bold">24</h3>
            <p className="text-xs text-gray-500">Playlists</p>
          </div>

          <div className="rounded-2xl bg-green-50 p-5 text-center">
            <h3 className="text-3xl">⭐</h3>
            <h3 className="mt-2 text-2xl font-bold">4.9</h3>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]">
          <MdEdit size={22} />
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;