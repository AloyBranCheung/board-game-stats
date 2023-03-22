import auth from "src/firebase-admin/firebaseAdmin";

const isAuthenticated = async (token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  if (!decodedToken) return null;
  return { decodedToken };
};

export default isAuthenticated;
