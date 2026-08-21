// import { initializeApp, cert, getApps } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { createRequire } from "module";

// const require = createRequire(import.meta.url);

// const serviceAccount = require("../serviceAccountKey.json");

// if (!getApps().length) {
//   initializeApp({
//     credential: cert(serviceAccount),
//   });
// }

// export const adminAuth = getAuth();



import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

/* ==========================================================
   FIREBASE SERVICE ACCOUNT
========================================================== */

const serviceAccount = require("../serviceAccountKey.json");

/* ==========================================================
   INITIALIZE FIREBASE ADMIN
   Prevent duplicate initialization
========================================================== */

const firebaseAdminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });

/* ==========================================================
   FIREBASE ADMIN AUTH
========================================================== */

export const adminAuth = getAuth(firebaseAdminApp);