import axios from "axios";
import FormData from "form-data";
import fs from "fs";

/* ==========================================
   Send Image To Python AI
========================================== */

export const detectEmotion = async (imagePath) => {
  try {
    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(imagePath)
    );
    console.log("Sending File:", imagePath);
    const { data } = await axios.post(
      "http://127.0.0.1:8000/detect",
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 30000,
      }
    );

    console.log("✅ AI Response:", data);

    return data;
  } catch (error) {
    console.error("❌ AI Service Error");

    if (error.response) {
      console.error("Status :", error.response.status);
      console.error("Data   :", error.response.data);
    } else {
      console.error(error.message);
    }

    throw new Error("Python AI Server Error");
  }
};