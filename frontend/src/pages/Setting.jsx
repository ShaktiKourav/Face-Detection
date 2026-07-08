import { motion } from "framer-motion";

import ProfileCard from "../components/profile/ProfileCard";
import SettingsCard from "../components/profile/SettingsCard";

import {
  MdPerson,
  MdSettings,
  MdVerified,
} from "react-icons/md";

const Profile = () => {

  return (

  <div className="space-y-6">

    {/* ==========================================
                    HERO
    ========================================== */}

    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass rounded-[28px] p-6 lg:p-7"
    >

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-3xl">

          <span
            className="
            inline-flex
            rounded-full
            bg-pink-100
            px-3
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-pink-600
            "
          >
            User Account
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[var(--text-primary)]">

            My Profile

            

          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">

            Manage your personal information, AI preferences,
            application settings, detection statistics and
            account security from one unified dashboard.

          </p>

        </div>

        {/* Right */}

        <div
          className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-[22px]
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-violet-600
          text-white
          shadow-[0_15px_45px_rgba(168,85,247,.25)]
          "
        >

          <MdPerson size={38} />

        </div>

      </div>

    </motion.section>
          {/* ==========================================
                  QUICK OVERVIEW
      ========================================== */}

      <section className="grid gap-5 md:grid-cols-3">

        {/* ================= Profile ================= */}

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          className="
          glass
          rounded-[24px]
          p-5
          transition-all
          duration-300
          hover:shadow-xl
          "
        >

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-pink-500/10
            text-pink-500
            "
          >
            <MdPerson size={26} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">

            Personal Profile

          </h3>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

            View and update your personal account
            information, profile details and connected
            authentication settings.

          </p>

        </motion.div>

        {/* ================= Preferences ================= */}

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          className="
          glass
          rounded-[24px]
          p-5
          transition-all
          duration-300
          hover:shadow-xl
          "
        >

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-violet-500/10
            text-violet-500
            "
          >

            <MdSettings size={26} />

          </div>

          <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">

            Preferences

          </h3>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

            Customize theme, notifications,
            AI recommendations and dashboard
            experience.

          </p>

        </motion.div>

        {/* ================= Security ================= */}

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          className="
          glass
          rounded-[24px]
          p-5
          transition-all
          duration-300
          hover:shadow-xl
          "
        >

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-green-500/10
            text-green-500
            "
          >

            <MdVerified size={26} />

          </div>

          <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">

            Secure Account

          </h3>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

            Your account is protected using
            secure authentication and encrypted
            local preferences.

          </p>

        </motion.div>

      </section>

      {/* ==========================================
                PROFILE INFORMATION
      ========================================== */}

      <ProfileCard />

      {/* ==========================================
                SETTINGS
      ========================================== */}

      <SettingsCard />
      {/* ==========================================
            PROFILE CENTER
========================================== */}

<motion.section
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  whileHover={{ y: -4 }}
  className="
    relative
    overflow-hidden
    rounded-[28px]
    border
    border-[var(--border-color)]
    bg-gradient-to-r
    from-pink-500
    via-fuchsia-500
    to-violet-600
    p-6
    lg:p-8
    shadow-[0_20px_60px_rgba(236,72,153,.22)]
  "
>

  {/* Background Glow */}

  <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

  <div className="absolute -bottom-10 left-0 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

  <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    {/* Left */}

    <div className="max-w-3xl">

      <span
        className="
          inline-flex
          rounded-full
          bg-white/20
          px-3
          py-1
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white
          backdrop-blur-lg
        "
      >
        AI MoodSense
      </span>

      <h2 className="mt-4 text-2xl font-bold lg:text-3xl">

        Profile & Settings Center

      </h2>

      <p className="mt-3 text-sm leading-7 text-white/90">

        Manage your personal profile, dashboard preferences,
        AI music recommendations, privacy controls and
        application settings from one premium workspace.
        Everything is synchronized to provide a seamless,
        intelligent and personalized experience.

      </p>

    </div>

    {/* Right */}

    <div
      className="
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-[28px]
        border
        border-white/20
        bg-white/15
        backdrop-blur-xl
      "
    >

      <MdPerson size={44} className="text-white" />

    </div>

  </div>

</motion.section>

</div>
  )

};

export default Profile;