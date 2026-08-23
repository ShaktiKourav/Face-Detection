// import ImageKit from "imagekit";

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// export const uploadImageToImageKit = async (buffer, fileName) => {
//   const result = await imagekit.upload({
//     file: buffer,
//     fileName,
//     folder: "/face-detection/detections",
//     useUniqueFileName: true,
//   });

//   return result.url;
// };

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadImageToImageKit = async (
  buffer,
  fileName
) => {
  const result = await imagekit.upload({
    file: buffer,
    fileName,
    folder: "/face-detection/detections",
    useUniqueFileName: true,
  });

  return result.url;
};