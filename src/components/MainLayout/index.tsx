import React from "react";
// firebase auth
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
// components
import LoginScreen from "src/components/LoginScreen";
import TopNavbar from "./TopNavbar";
// mui
import { CircularProgress } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isLoggedIn, isLoading, logout } = useFirebaseAuth();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div>
      <TopNavbar />
      <div>{children}</div>
    </div>
  );
}
