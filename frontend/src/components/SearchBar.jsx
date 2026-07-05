
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiMic } from "react-icons/fi";

const SEARCH_ITEMS = [
  {
    title: "Home",
    path: "/home",
    keywords: ["home", "landing", "main"],
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    keywords: ["dashboard", "overview", "stats"],
  },
  {
    title: "Face Detection",
    path: "/face-detection",
    keywords: ["face", "camera", "detect", "emotion"],
  },
  {
    title: "History",
    path: "/history",
    keywords: ["history", "records"],
  },
  {
    title: "Music",
    path: "/music",
    keywords: ["music", "songs", "playlist"],
  },
  {
    title: "Profile",
    path: "/profile",
    keywords: ["profile", "user", "account"],
  },
  {
    title: "Settings",
    path: "/settings",
    keywords: ["settings", "preferences"],
  },
];

export default function SearchBar({
  placeholder = "Search Dashboard, Face Detection, Music...",
}) {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearch") || "[]");
  });

  const results = useMemo(() => {
    if (!search.trim()) return [];

    const value = search.toLowerCase();

    return SEARCH_ITEMS.filter((item) => {
      return (
        item.title.toLowerCase().includes(value) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(value)
        )
      );
    });
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const saveRecent = (value) => {
    const data = [
      value,
      ...recent.filter((item) => item !== value),
    ].slice(0, 5);

    setRecent(data);

    localStorage.setItem(
      "recentSearch",
      JSON.stringify(data)
    );
  };

  const openItem = (item) => {
    if (!item) return;

    saveRecent(item.title);

    setSearch("");

    setOpen(false);

    navigate(item.path);
  };

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice Search is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setSearch(text);

      setOpen(true);
    };
  };
  return (
  <div
    ref={wrapperRef}
    className="relative w-full max-w-xl"
  >
    {/* Search Box */}

    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center rounded-2xl border border-white bg-white/80 px-4 py-3 backdrop-blur-xl shadow-xl"
    >
      {/* Search Button */}

      <button
        type="button"
        aria-label="Search"
        title="Search"
        onClick={() => {
          if (results.length > 0) {
            openItem(results[0]);
          }
        }}
        className="text-violet-600 transition hover:scale-110"
      >
        <FiSearch size={20} />
      </button>

      {/* Input */}

      <input
        id="search"
        name="search"
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        value={search}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={(e) => {
          if (!results.length) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();

            setActiveIndex((prev) =>
              prev < results.length - 1 ? prev + 1 : 0
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();

            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : results.length - 1
            );
          }

          if (e.key === "Enter") {
            e.preventDefault();
            openItem(results[activeIndex]);
          }

          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="mx-4 flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 outline-none"
      />

      {/* Clear */}

      {search && (
        <button
          type="button"
          aria-label="Clear Search"
          title="Clear Search"
          onClick={() => {
            setSearch("");
            setOpen(false);
          }}
          className="mr-2 rounded-full p-2 transition hover:bg-pink-100"
        >
          <FiX size={18} />
        </button>
      )}

      {/* Voice */}

      <button
        type="button"
        aria-label="Voice Search"
        title="Voice Search"
        onClick={handleVoice}
        className={`rounded-full p-3 text-white transition-all duration-300 ${
          isListening
            ? "animate-pulse bg-gradient-to-r from-red-500 to-pink-500"
            : "bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-110"
        }`}
      >
        <FiMic size={18} />
      </button>
    </motion.div>

    <AnimatePresence>

          {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="absolute left-0 right-0 z-50 mt-3 overflow-hidden rounded-3xl border border-white/80 bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(168,85,247,.18)]"
        >
          {/* Results */}

          {results.length > 0 ? (
            <>
              <div className="border-b border-pink-100 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Search Results
              </div>

              {results.map((item, index) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => openItem(item)}
                  className={`flex w-full items-center justify-between px-5 py-4 text-left transition-all duration-200 ${
                    activeIndex === index
                      ? "bg-violet-50"
                      : "hover:bg-pink-50"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.path}
                    </p>
                  </div>

                  <span className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-1 text-xs font-semibold text-white">
                    Open
                  </span>
                </button>
              ))}
            </>
          ) : (
            <div className="p-6 text-center">
              <FiSearch
                size={30}
                className="mx-auto text-violet-500"
              />

              <h3 className="mt-3 font-semibold text-gray-800">
                No Results Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Search Home, Dashboard, Music,
                Face Detection, History...
              </p>
            </div>
          )}

          {/* Recent Searches */}

          {recent.length > 0 && (
            <>
              <div className="border-t border-pink-100 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Recent Searches
              </div>

              <div className="flex flex-wrap gap-2 p-4">
                {recent.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearch(item);
                      setOpen(true);
                    }}
                    className="rounded-full bg-pink-100 px-4 py-2 text-xs font-semibold text-pink-600 transition hover:bg-pink-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
}