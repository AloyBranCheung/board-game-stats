/* eslint-disable no-console */
import { getAuth, Auth } from "firebase-admin/auth";
const admin = require("firebase-admin");

let auth;

if (!admin.apps.length) {
  const app = admin.initializeApp(
    {
      credential: admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      }),
      databaseURL: "https://board-game-stats-3420c-default-rtdb.firebaseio.com",
    },
    "firebase-admin"
  );

  auth = getAuth(app);
}

export default auth as Auth;