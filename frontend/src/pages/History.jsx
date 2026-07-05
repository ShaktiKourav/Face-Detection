import { useEffect, useState } from "react";
import {
  MdDelete,
  MdDownload,
  MdHistory,
} from "react-icons/md";
import { motion } from "framer-motion";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("faceHistory")) || [];

    setHistory(data);
  }, []);

  const deleteItem = (id) => {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);

    localStorage.setItem(
      "faceHistory",
      JSON.stringify(updated)
    );
  };

  const clearHistory = () => {
    localStorage.removeItem("faceHistory");
    setHistory([]);
  };

  const downloadImage = (image, id) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `face-${id}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-3xl font-bold ">
              Detection{" "}
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                History
              </span>
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View all captured face detection records.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Empty */}

      {history.length === 0 ? (
        <div className="rounded-3xl border border-white/80 bg-white/70 p-16 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]">

          <MdHistory
            className="mx-auto text-violet-400"
            size={70}
          />

          <h2 className="mt-6 text-2xl font-bold">
            No Detection History
          </h2>

          <p className="mt-2 text-gray-500">
            Capture a face to see history here.
          </p>
        </div>
      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {history.map((item) => (

            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]"
            >

              <img
                src={item.image}
                alt=""
                className="h-64 w-full object-cover"
              />

              <div className="space-y-3 p-6">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Date
                  </span>

                  <span className="font-semibold">
                    {item.date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Time
                  </span>

                  <span className="font-semibold">
                    {item.time}
                  </span>
                </div>

                <div className="pt-4 flex gap-3">

                  <button
                    onClick={() =>
                      downloadImage(item.image, item.id)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white"
                  >
                    <MdDownload />

                    Download
                  </button>

                  <button
                    onClick={() =>
                      deleteItem(item.id)
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <MdDelete size={22} />
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
};

export default History;