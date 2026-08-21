import api from "./api";

export const captureDetection = async (image, personName) => {
  const { data } = await api.post("/detection/capture", {
    image,
    personName,
  });

  return data;
};