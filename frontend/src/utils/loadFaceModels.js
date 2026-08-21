import * as faceapi from "face-api.js";

let loaded = false;

export const loadFaceModels = async () => {
  if (loaded) return;

  const MODEL_URL = "/models";

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);

  loaded = true;

  console.log("✅ Face-api Models Loaded");
};