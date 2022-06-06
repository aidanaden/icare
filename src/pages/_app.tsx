import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../../src/lib/createEmotionCache";
import MainLayout from "@/components/Layout/MainLayout";
import { Box } from "@mui/material";
import LoginLayout from "@/components/Layout/LoginLayout";
import useAuth, { AuthProvider } from "@/hooks/useAuth";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // const router = useRouter();
  const { user } = useAuth();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ICare</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RecoilRoot>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Box bgcolor={"grey.100"} minHeight="100vh" color="text.primary">
              {user ? (
                <MainLayout>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Component {...pageProps} />
                  </ErrorBoundary>
                </MainLayout>
              ) : (
                <LoginLayout>
                  <Component {...pageProps} />
                </LoginLayout>
              )}
            </Box>
          </ThemeProvider>
        </AuthProvider>
      </RecoilRoot>
    </CacheProvider>
  );
};

export default App;
