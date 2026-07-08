import { createContext, useContext, useEffect, useState } from "react";

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {

  const [mood, setMood] = useState("Happy");

  const [song, setSong] = useState(null);

  const [history, setHistory] = useState([]);

  const [result, setResult] = useState(null);

  /* ==========================================
          LOAD LOCAL STORAGE
  ========================================== */

  useEffect(() => {

    const savedHistory =
      JSON.parse(localStorage.getItem("history")) || [];

    setHistory(savedHistory);

  }, []);

  /* ==========================================
            SAVE HISTORY
  ========================================== */

  useEffect(() => {

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

  }, [history]);

  /* ==========================================
          ADD DETECTION
  ========================================== */

  const addDetection = (data) => {

    const record = {

      id: Date.now(),

      mood: data.mood,

      confidence: data.confidence || 0,

      song: data.song || "",

      image: data.image || "",

      date: new Date().toLocaleDateString(),

      time: new Date().toLocaleTimeString(),

    };

    setMood(record.mood);

    setSong(record.song);

    setResult(record);

    setHistory((prev) => [

      record,

      ...prev,

    ]);

  };

  /* ==========================================
          CLEAR HISTORY
  ========================================== */

  const clearHistory = () => {

    setHistory([]);

    localStorage.removeItem("history");

  };

  return (

    <MoodContext.Provider

      value={{

        mood,

        setMood,

        song,

        setSong,

        result,

        setResult,

        history,

        addDetection,

        clearHistory,

      }}

    >

      {children}

    </MoodContext.Provider>

  );

};

export const useMood = () => useContext(MoodContext);

export default MoodContext;