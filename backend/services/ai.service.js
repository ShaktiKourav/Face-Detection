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

    const response = await axios.post(
      "http://127.0.0.1:8000/detect",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.message);

    throw new Error("Python AI Server Error");
  }
};