import "../styles/globals.css";
import type { AppProps } from "next/app";
// mui
import { ThemeProvider } from "@mui/material";
import theme from "src/theme";
// react toastify
import { ToastContainer } from "react-toastify";
// components
import MainLayout from "src/components/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
