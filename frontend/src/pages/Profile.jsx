import ProfileCard from "../components/ProfileCard";

import {
  MdVerified,
  MdFaceRetouchingNatural,
  MdHistory,
  MdEmail,
  MdPhone,
} from "react-icons/md";
const user = JSON.parse(localStorage.getItem("user"));
const Profile = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)] py-2">
        <h1 className="text-2xl font-bold">
          My{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>

        <p className="mt-0 text-sm text-gray-500">
          Manage your account information and view your activity.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        {/* Left */}

        <div>
       <ProfileCard
  name={user?.name || "User"}
  role={user?.role || "User"}
  email={user?.email || "No Email"}
  avatar={user?.photo || "/default-avatar.png"}
  phone={user?.phone || "Not Added"}
  location={user?.location || "India"}
/>
        </div>

        {/* Right */}

        <div className="space-y-6 xl:col-span-2">
          {/* Statistics */}

          <div className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]">
            <h2 className="mb-6  text-2xl font-bold">
              Account Statistics
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-pink-50 p-3 text-center">
                <MdFaceRetouchingNatural
                  className="mx-auto text-pink-500"
                  size={40}
                />
                <h3 className="mt-3 text-2xl font-bold">158</h3>
                <p className="text-gray-500">
                  Face Detections
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-3 text-center">
                <MdHistory
                  className="mx-auto text-violet-600"
                  size={40}
                />
                <h3 className="mt-3 text-2xl font-bold">248</h3>
                <p className="text-gray-500">
                  History Records
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-3 text-center">
                <MdVerified
                  className="mx-auto text-green-600"
                  size={40}
                />
                <h3 className="mt-3 text-2xl font-bold">99%</h3>
                <p className="text-gray-500">
                  Accuracy
                </p>
              </div>
            </div>
          </div>

          {/* Account Info */}

          <div className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]">
            <h2 className="mb-5 text-2xl font-bold">
              Account Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <MdEmail
                  className="text-pink-500"
                  size={28}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>
                  <h3 className="font-semibold">
                    {user?.email || "No Email"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <MdPhone
                  className="text-violet-600"
                  size={28}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Mobile Number
                  </p>
                  <h3 className="font-semibold">
                 {user?.phone || "Not Available"}
                 </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}

          <div className="rounded-3xl border border-white/80 bg-white/70 p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]">
            <h2 className="mb-6 text-2xl font-bold">
              Achievements
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 p-5 text-white">
                <h3 className="text-xl font-bold">
                  🏆 Premium User
                </h3>

                <p className="mt-1 text-sm opacity-90">
                  Active member of Face Detection System.
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
                <h3 className="text-xl font-bold">
                  ⭐ 150+ Detections
                </h3>

                <p className="mt-1 text-sm opacity-90">
                  Successfully completed more than 150 detections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;