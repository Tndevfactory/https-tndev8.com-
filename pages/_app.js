/** @format */
import "antd/dist/antd.css";
import "../styles/globals.css";

import Head from "next/head";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProductProvider } from "../contexts/ProductsContext";
import Layout from "../components/layout/Layout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="software of paie" />

        <meta name="author" content="ch" />
        <meta name="og:title" property="og:title" content="soft paie" />
        <meta name="twitter:card" content="soft paie" />
        <meta name="robots" content="index, follow" />

        <title>Soft-paie</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <Component {...pageProps} key={router.route} />
        </ProductProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
