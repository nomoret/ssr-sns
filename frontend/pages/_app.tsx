import { AppProps } from "next/app";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Link from "next/link";

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log(pageProps);
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

export default MyApp;
