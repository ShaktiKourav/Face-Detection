import api from "./api";

export const getRecommendation = async () => {
  try {
    const { data } = await api.get("/music/recommendation");
    return data;
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
};