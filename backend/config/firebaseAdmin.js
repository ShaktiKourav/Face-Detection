// // // import { initializeApp, cert, getApps } from "firebase-admin/app";
// // // import { getAuth } from "firebase-admin/auth";
// // // import { createRequire } from "module";

// // // const require = createRequire(import.meta.url);

// // // const serviceAccount = require("../serviceAccountKey.json");

// // // if (!getApps().length) {
// // //   initializeApp({
// // //     credential: cert(serviceAccount),
// // //   });
// // // }

// // // export const adminAuth = getAuth();



// // import { initializeApp, cert, getApps } from "firebase-admin/app";
// // import { getAuth } from "firebase-admin/auth";
// // import { createRequire } from "module";

// // const require = createRequire(import.meta.url);

// // /* ==========================================================
// //    FIREBASE SERVICE ACCOUNT
// // ========================================================== */

// // const serviceAccount = require("../serviceAccountKey.json");

// // /* ==========================================================
// //    INITIALIZE FIREBASE ADMIN
// //    Prevent duplicate initialization
// // ========================================================== */

// // const firebaseAdminApp = getApps().length
// //   ? getApps()[0]
// //   : initializeApp({
// //       credential: cert(serviceAccount),
// //     });

// // /* ==========================================================
// //    FIREBASE ADMIN AUTH
// // ========================================================== */

// // export const adminAuth = getAuth(firebaseAdminApp);




// import { initializeApp, cert, getApps } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";

// /* ==========================================================
//    FIREBASE SERVICE ACCOUNT
//    Read credentials from environment variable
// ========================================================== */

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// /* ==========================================================
//    INITIALIZE FIREBASE ADMIN
//    Prevent duplicate initialization
// ========================================================== */

// const firebaseAdminApp = getApps().length
//   ? getApps()[0]
//   : initializeApp({
//       credential: cert(serviceAccount),
//     });

// /* ==========================================================
//    FIREBASE ADMIN AUTH
// ========================================================== */

// export const adminAuth = getAuth(firebaseAdminApp);


import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Render / production
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local development
  const serviceAccountPath = path.join(
    __dirname,
    "..",
    "serviceAccountKey.json"
  );

  serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );
}

const firebaseAdminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });

export const adminAuth = getAuth(firebaseAdminApp);