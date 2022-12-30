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

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMUW3VGi8Ei-v4K1PpJ9aIYZR6WxHFV1I",
  authDomain: "board-game-stats-3420c.firebaseapp.com",
  projectId: "board-game-stats-3420c",
  storageBucket: "board-game-stats-3420c.appspot.com",
  messagingSenderId: "504930971739",
  appId: "1:504930971739:web:802340d19737e28a20cf7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default function useFirebaseAuth() {
  const router = useRouter();
  const toastMessage = useToastErrorMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // error message
  const setError = (error: any, message: string) => {
    console.error(error);
    toastMessage(message);
    setIsError(true);
    setIsLoading(false);
  };

  // success message
  const setSuccess = (message: string) => {
    setIsError(false);
    setIsLoading(false);
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

  return { login, logout, isLoading, isError, isLoggedIn };
}
