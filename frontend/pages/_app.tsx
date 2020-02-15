import { AppProps } from "next/app";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Link from "next/link";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  console.log(router);
  return (
    <>
      <Head>
        <title>{`Title - ${router.route}`}</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

export default MyApp;
