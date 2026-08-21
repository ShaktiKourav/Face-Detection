import * as faceapi from "face-api.js";
import { loadFaceModels } from "./loadFaceModels";

export const detectEmotion = async (image) => {
  try {
    await loadFaceModels();

    const img = new Image();
    img.src = image;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const detection = await faceapi
      .detectSingleFace(
        img,
        new faceapi.TinyFaceDetectorOptions({
        inputSize: 512,
        scoreThreshold: 0.3, 
        })
      )
      .withFaceLandmarks()
      .withFaceExpressions();
      console.log("Detection:", detection);

    if (!detection) {
      return {
        success: false,
        message: "Face not detected",
      };
    }

    const expressions = detection.expressions;

    const mood = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    return {
      success: true,
      mood,
      confidence: Number(
        (expressions[mood] * 100).toFixed(2)
      ),
      expressions,
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: err.message,
    };
  }
};