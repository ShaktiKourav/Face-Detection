import { motion } from "framer-motion";

import {
  MdOutlineFaceRetouchingNatural,
  MdCameraAlt,
  MdHistory,
  MdMusicNote,
  MdSecurity,
  MdArrowForward,
} from "react-icons/md";

/* =====================================================
    FEATURES
===================================================== */

const features = [
  {
    icon: <MdCameraAlt size={26} />,
    title: "Face Detection",
    description:
      "Detect human faces instantly using AI-powered computer vision with real-time webcam support.",
    color: "from-pink-500 via-fuchsia-500 to-violet-600",
  },

  {
    icon: <MdOutlineFaceRetouchingNatural size={26} />,
    title: "Mood Analysis",
    description:
      "Recognize facial expressions and predict emotions with confidence scoring.",
    color: "from-violet-500 to-purple-600",
  },

  {
    icon: <MdMusicNote size={26} />,
    title: "Music Recommendation",
    description:
      "Automatically recommend personalized music according to detected mood.",
    color: "from-cyan-500 to-blue-600",
  },

  {
    icon: <MdHistory size={26} />,
    title: "Detection History",
    description:
      "Store mood, confidence score, date and time for future analytics.",
    color: "from-orange-500 to-red-500",
  },
];

const ProjectInfo = () => {

 return (

<motion.section
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className="
  relative
  overflow-hidden
  rounded-[32px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  backdrop-blur-3xl
  shadow-[var(--shadow-lg)]
"
>

{/* =====================================================
                    BACKGROUND GLOW
===================================================== */}

<div className="absolute -left-36 -top-36 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px]" />

<div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[130px]" />

<div className="relative">

{/* =====================================================
                    HEADER
===================================================== */}

<div
className="
flex
flex-col
gap-8
p-6
md:p-8
xl:flex-row
xl:items-center
xl:justify-between
"
>

<div className="max-w-4xl">

<span
className="
inline-flex
items-center
rounded-full
bg-gradient-to-r
from-pink-500/15
to-violet-500/15
px-4
py-1.5
text-[11px]
font-semibold
uppercase
tracking-[2px]
text-pink-500
"
>

PROJECT OVERVIEW

</span>

<h2
className="
mt-4
text-2xl
font-bold
tracking-tight
text-[var(--text-primary)]
md:text-3xl
"
>

AI Mood Based Face Detection

</h2>

<p
className="
mt-4
max-w-3xl
text-[14px]
leading-7
text-[var(--text-secondary)]
"
>

AI MoodSense combines advanced computer vision,
facial landmark detection and emotion recognition
to identify human expressions in real time.

The detected emotion is instantly analyzed and
used to recommend personalized music while
securely maintaining detection history for
future analytics and intelligent insights.

</p>

<div className="mt-6 flex flex-wrap gap-3">

<div
className="
rounded-xl
border
border-[var(--border-color)]
bg-[var(--glass)]
px-4
py-2
text-xs
font-medium
text-[var(--text-secondary)]
"
>

Real-Time AI

</div>

<div
className="
rounded-xl
border
border-[var(--border-color)]
bg-[var(--glass)]
px-4
py-2
text-xs
font-medium
text-[var(--text-secondary)]
"
>

Emotion Recognition

</div>

<div
className="
rounded-xl
border
border-[var(--border-color)]
bg-[var(--glass)]
px-4
py-2
text-xs
font-medium
text-[var(--text-secondary)]
"
>

Music Recommendation

</div>

</div>

</div>

<motion.div

whileHover={{
rotate:8,
scale:1.04,
}}

transition={{
duration:.3
}}

className="
relative
flex
h-24
w-24
items-center
justify-center
rounded-[30px]
bg-gradient-to-br
from-pink-500
via-fuchsia-500
to-violet-600
text-white
shadow-[0_20px_45px_rgba(168,85,247,.35)]
"
>

<div className="absolute inset-0 rounded-[30px] bg-white/10 backdrop-blur-xl" />

<MdOutlineFaceRetouchingNatural
className="relative"
size={52}
/>

</motion.div>

</div>
</div>

{/* =====================================================
                  FEATURE CARDS
===================================================== */}

<div
className="
grid
gap-5
px-6
pb-8
md:grid-cols-2
xl:grid-cols-4
"
>

{features.map((item,index)=>(

<motion.div

key={item.title}

initial={{
opacity:0,
y:25
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:index*.08
}}

whileHover={{
y:-8,
}}

className="
group
relative
overflow-hidden
rounded-[26px]
border
border-[var(--border-color)]
bg-[var(--glass)]
p-6
backdrop-blur-xl
transition-all
duration-300
hover:border-pink-300
hover:shadow-[var(--shadow-lg)]
"
>

<div
className={`
absolute
-right-10
-top-10
h-32
w-32
rounded-full
bg-gradient-to-br
${item.color}
opacity-10
blur-3xl
transition-all
duration-500
group-hover:scale-125
`}
/>

<div
className={`
relative
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-gradient-to-r
${item.color}
text-white
shadow-lg
`}
>

{item.icon}

</div>

<h3
className="
relative
mt-5
text-lg
font-bold
text-[var(--text-primary)]
"
>

{item.title}

</h3>

<p
className="
relative
mt-3
text-[14px]
leading-7
text-[var(--text-secondary)]
"
>

{item.description}

</p>

<div
className={`
absolute
bottom-0
left-0
h-1
w-full
bg-gradient-to-r
${item.color}
`}
 />

</motion.div>

))}
</div>

{/* =====================================================
                    AI WORKFLOW
===================================================== */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: .5 }}
  className="
  mx-6
  mb-8
  overflow-hidden
  rounded-[30px]
  bg-gradient-to-r
  from-pink-500
  via-fuchsia-500
  to-violet-600
  shadow-[0_20px_60px_rgba(168,85,247,.30)]
"
>

<div
className="
flex
flex-col
gap-6
p-7
lg:flex-row
lg:items-center
lg:justify-between
"
>

<div>

<p
className="
text-[11px]
font-semibold
uppercase
tracking-[3px]
text-pink-100
"
>

AI  PROCESS

</p>

<h2
className="
mt-2
text-2xl
font-bold
text-white
"
>

Real-Time Detection Workflow

</h2>

<p
className="
mt-3
max-w-2xl
text-sm
leading-7
text-pink-100
"
>

Every face captured by the camera follows an
optimized AI pipeline. From facial landmark
detection to emotion prediction and smart music
recommendation, each stage is processed within
seconds for an accurate experience.

</p>

</div>

<div
className="
hidden
xl:flex
h-24
w-24
items-center
justify-center
rounded-[28px]
border
border-white/20
bg-white/10
backdrop-blur-xl
"
>

<MdOutlineFaceRetouchingNatural
size={48}
className="text-white"
/>

</div>

</div>

<div
className="
grid
gap-14
px-7
pb-8
sm:grid-cols-2
xl:grid-cols-5
"
>

{[
{
step:"Open Camera",
desc:"Initialize webcam and prepare live video stream."
},
{
step:"Detect Face",
desc:"Locate face using AI computer vision model."
},
{
step:"Analyze Mood",
desc:"Recognize facial emotion with confidence score."
},
{
step:"Recommend Music",
desc:"Suggest personalized playlist based on mood."
},
{
step:"Save History",
desc:"Store mood, confidence and detection timestamp."
},
].map((item,index)=>(

<motion.div

key={item.step}

whileHover={{
y:-8,
scale:1.02,
}}

transition={{
duration:.25
}}

className="
relative
overflow-visible
rounded-[26px]
border
border-white/20
bg-white/10
p-6
backdrop-blur-xl
transition-all
duration-300
hover:bg-white/15
"

>

<div
className="
mx-auto
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-white
text-lg
font-bold
text-violet-700
shadow-lg
"
>

{index+1}

</div>

<h3
className="
mt-5
text-center
text-base
font-semibold
text-white
"
>

{item.step}

</h3>

<p
className="
mt-3
text-center
text-sm
leading-6
text-pink-100
"
>

{item.desc}

</p>

{index!==4 && (

<div
className="
absolute
top-1/2
-right-12
hidden
-translate-y-1/2
xl:flex
"
>

<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white/15
backdrop-blur-xl
"
>

<MdArrowForward
size={24}
className="text-white"
/>

</div>

</div>

)}

</motion.div>

))}

</div>

</motion.div>
{/* =====================================================
                    SECURITY
===================================================== */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  whileHover={{ y: -5 }}
  className="
    relative
    mx-6
    mb-1
    overflow-hidden
    rounded-[32px]
    border
    border-[var(--border-color)]
    bg-[var(--card-bg)]
    shadow-[var(--shadow-lg)]
    backdrop-blur-3xl
  "
>
  {/* Glow */}

  <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-[130px]" />

  <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-pink-500/10 blur-[130px]" />

  <div className="relative px-8 py-7">

  <div className="space-y-6">

  {/* Row 1 */}
  <div>

    <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[2px] text-green-500">
      <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
      Secure Environment
    </span>

    <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">
      Privacy & Security
    </h2>

  </div>

  {/* Row 2 */}
  <div className="flex flex-col xl:flex-row gap-8">

    {/* Left */}
    <div className="flex flex-1 items-start gap-5">

      {/* Icon */}
      <div
        className="
        flex
        h-20
        w-20
        shrink-0
        items-center
        justify-center
        rounded-[24px]
        bg-gradient-to-br
        from-pink-500
        via-fuchsia-500
        to-violet-600
        text-white
        shadow-[0_20px_45px_rgba(168,85,247,.35)]
        "
      >
        <MdSecurity size={34} />
      </div>

      {/* Description */}
      <p
        className="
        max-w-5xl
        text-[15px]
        leading-9
        text-[var(--text-secondary)]
        "
      >
        AI MoodSense protects every user through secure
        Firebase Authentication, encrypted sessions and
        modern cloud security. Detection history stores
        only mood labels, confidence scores and timestamps,
        while facial images are never permanently saved
        unless explicitly enabled by the administrator.
      </p>

    </div>

     {/* Right Status Card */}

     <div

    className="

    shrink-0

    rounded-[28px]

    bg-gradient-to-br

    from-green-500

    via-emerald-500

    to-teal-600

    px-3
    py-3
    pt-0
    text-center

    text-white

    shadow-[0_18px_40px_rgba(16,185,129,.35)]

    "

  >



    <p className="text-xs mt-5 uppercase tracking-[2px]">

      Security

    </p>



    <h2 className="mt-1 text-xl font-bold">

      100%

    </h2>



    <p className="mt-1 text-sm">

      Protected

    </p>



  </div>

 
  </div>
  
</div>

    {/* ================= Security Cards ================= */}

<div
  className="
    mt-10
    grid
    gap-4
    md:grid-cols-2
    xl:grid-cols-4
  "
>
  {[
    {
      title: "Firebase Authentication",
      desc: "Secure user login & identity verification",
    },
    {
      title: "Encrypted Sessions",
      desc: "Protected login sessions with encryption",
    },
    {
      title: "Detection History",
      desc: "Secure storage of mood analytics records",
    },
    {
      title: "Face Privacy",
      desc: "No permanent facial image storage",
    },
  ].map((item, index) => (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        px-5
        py-4
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-pink-300
        hover:shadow-[var(--shadow-lg)]
      "
    >
      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative flex items-start gap-4">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-pink-500
            via-fuchsia-500
            to-violet-600
            text-white
            shadow-lg
          "
        >
          ✓
        </div>

        <div>

          <h4
            className="
              text-sm
              font-semibold
              text-[var(--text-primary)]
            "
          >
            {item.title}
          </h4>

          <p
            className="
              mt-1
              text-xs
              leading-6
              text-[var(--text-secondary)]
            "
          >
            {item.desc}
          </p>

        </div>

      </div>

    </motion.div>
  ))}
</div>

{/* ================= Enterprise Section ================= */}

  <div
  className="
    mt-8
    mb-0
   
    rounded-[28px]
    border
    border-pink-500/15
    bg-gradient-to-r
    from-pink-500/5
    via-fuchsia-500/5
    to-violet-500/5
    px-7
    py-5
  "
>

  <div
    className="
      flex
      flex-col
      gap-5
      lg:flex-row
      lg:items-center
      lg:justify-between
    "
  >

    <div className="max-w-3xl">

      <span
        className="
          rounded-full
          bg-pink-500/10
          px-3
          py-1
          text-[10px]
          font-semibold
          uppercase
          tracking-[2px]
          text-pink-500
        "
      >
        Enterprise Security
      </span>

      <h3
        className="
          mt-4
          text-xl
          font-bold
          text-[var(--text-primary)]
        "
      >
        Enterprise Grade Protection
      </h3>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-[var(--text-secondary)]
        "
      >
        Every request is authenticated before access.
        AI MoodSense securely performs face detection,
        mood recognition and music recommendation while
        protecting user privacy using modern cloud
        security standards.
      </p>

    </div>

    <div
      className="
        rounded-[24px]
        bg-gradient-to-r
        from-pink-500
        via-fuchsia-500
        to-violet-600
        px-7
        py-4
        text-center
        text-white
        shadow-[0_18px_40px_rgba(168,85,247,.35)]
      "
    >

      <p className="text-xs uppercase tracking-[2px]">

        System Status

      </p>

      <h2 className="mt-2 text-2xl font-bold">

        Active

      </h2>

      <div className="mt-3 flex items-center justify-center gap-2">

        <span className="h-3 w-2 rounded-full bg-green-300 animate-pulse" />

        <span className="text-sm">

          Secure Connection

        </span>

      </div>

    </div>

  </div>

  </div>




</div>

</motion.div>
{/* =====================================================
                    PROJECT FOOTER
===================================================== */}



{/* Bottom Footer */}

<div
  className="
  flex
  flex-col
  gap-2
  mb-2
  py-2
  px-7
  text-sm
  text-[var(--text-secondary)]
  lg:flex-row
  lg:items-center
  lg:justify-between
  "
>

  {/* Copyright */}

  <p className="leading-7">

    © {new Date().getFullYear()}{" "}

    <span className="font-semibold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">

      AI MoodSense

    </span>

    . All Rights Reserved.

  </p>

  {/* Tags */}

  <div
    className="
    flex
    flex-wrap
    items-center
    gap-3
    "
  >

    {[
      "AI Face Detection",
      "Mood Recognition",
      "Music Recommendation",
      "Firebase Secure",
    ].map((item) => (

      <span
        key={item}
        className="
        rounded-full
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        px-4
        py-2
        text-xs
        font-medium
        text-[var(--text-secondary)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-pink-300
        hover:text-pink-500
        hover:shadow-lg
        "
      >

        {item}

      </span>

    ))}

  </div>

</div>
</motion.section>

);

};

export default ProjectInfo;