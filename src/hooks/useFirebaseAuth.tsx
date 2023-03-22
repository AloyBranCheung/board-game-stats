import { useState, useEffect } from "react";
// next-router
import { useRouter } from "next/router";
// react-toastify
import useToastErrorMessage from "./useToastErrorMessage";
// Firebase functions
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// validators
import loginSchema from "src/validators/LoginValidation";
import { getDatabase } from "firebase/database";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMUW3VGi8Ei-v4K1PpJ9aIYZR6WxHFV1I",
  authDomain: "board-game-stats-3420c.firebaseapp.com",
  projectId: "board-game-stats-3420c",
  storageBucket: "board-game-stats-3420c.appspot.com",
  messagingSenderId: "504930971739",
  appId: "1:504930971739:web:802340d19737e28a20cf7e",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "firebase");
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// basic config for CRUD actions
export const database = getDatabase(app);

export default function useFirebaseAuth() {
  const router = useRouter();
  const toastErrorMessage = useToastErrorMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // error message
  const setError = (error: any, message: string) => {
    // eslint-disable-next-line no-console
    console.error(error);
    toastErrorMessage(message);
    setIsError(true);
    setIsLoading(false);
  };

  // success message
  const setSuccess = (message: string) => {
    setIsError(false);
    setIsLoading(false);
    // eslint-disable-next-line no-console
    console.log(message);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      loginSchema.parse({ email, password });
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Successfully logged in.");
      router.replace("/");
    } catch (error) {
      setError(error, "Wrong email or password.");
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      signOut(auth);
      setSuccess("Successfully logged out.");
      router.replace("/");
    } catch (error) {
      setError(error, "Failed to log out. Something went wrong :(");
    }
  };

  const getUserIdToken = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      return token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return "";
    }
  };

  useEffect(() => {
    const loginState = async () => {
      setIsLoading(true);
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      });
    };
    loginState();
  }, []);

  const userProfile = auth.currentUser;

  return {
    login,
    logout,
    isLoading,
    isError,
    isLoggedIn,
    userProfile,
    getUserIdToken,
  };
}
