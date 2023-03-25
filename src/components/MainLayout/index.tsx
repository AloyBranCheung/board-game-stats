import React from "react";
// firebase auth
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
// components
import LoginScreen from "src/components/LoginScreen";
import TopNavbar from "./TopNavbar";
// mui
import { CircularProgress, Box, useTheme } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isLoggedIn, isLoading } = useFirebaseAuth();
  const theme = useTheme();

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
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          paddingBottom: "25vh",
        }}
      >
        {children}
      </Box>
    </div>
  );
}
