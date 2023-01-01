import "../styles/globals.css";
import type { AppProps } from "next/app";
//
import Head from "next/head";
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
        <Head>
          <title>Board Game Stats</title>
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        </Head>
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
