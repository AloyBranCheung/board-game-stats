import auth from "src/firebase-admin/firebaseAdmin";

const isAuthenticated = async (token: string) => {
  try {
    if (auth) {
      const decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken) return null;
      return { decodedToken };
    }
    return {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};

export default isAuthenticated;
