import "../../styles/globals.css";
import type { AppProps } from "next/app";
// react-query set-up
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// dayjs datepicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
// next-head
import Head from "next/head";
// mui
import { ThemeProvider } from "@mui/material";
import theme from "src/theme";
// react toastify
import { ToastContainer } from "react-toastify";
// components
import MainLayout from "src/components/MainLayout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Board Game Stats</title>
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </QueryClientProvider>
        </LocalizationProvider>
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
