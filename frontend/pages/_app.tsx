import { AppProps } from "next/app";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme/theme";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  console.log(router);
  return (
    <>
      <Head>
        <title>{`Title - ${router.route}`}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <AppLayout>
          <CssBaseline />
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
