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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [user, setUser] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>NextJS MUI Typescript starter</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Box bgcolor={"grey.100"} minHeight="100vh" color="text.primary">
            {!router.pathname.includes("login") ? (
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            ) : (
              <LoginLayout>
                <Component {...pageProps} />
              </LoginLayout>
            )}
          </Box>
        </ThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
