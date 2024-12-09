import Head from "next/head";
import { Fragment } from "react";
import { Provider } from "react-redux";
import BootstrapProvider from "@bootstrap";
import { ThemeProvider, theme } from "@styled";
import { persistor, store } from "@global/store";
import { GlobalStyle } from "@assets/css/global.style";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

// CSS import
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-fade/effect-fade.scss";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
//import "swiper/components/effect-fade/effect-fade.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

// Fonts Import
import "@fontsource/raleway";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/300-italic.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";
import { MainProvider } from "src/context";

// Customize Bootstrap
const themeBootstrap = {
  "$container-max-widths": {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1200px",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      //retry: EnvUtility.isProd(),
      //refetchIntervalInBackground: EnvUtility.isProd(),
    },
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Griha Decor :: Latest Interior Products for Modern Living</title>
        <meta
          name="description"
          content="Griha Decor :: Latest Interior Products for Modern Living"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BootstrapProvider theme={themeBootstrap} reset={true}>
            <GlobalStyle />
            <MainProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <Component {...pageProps} />
                </PersistGate>
              </Provider>
            </MainProvider>
          </BootstrapProvider>
        </ThemeProvider>
        {/* {process.env.NODE_ENV != 'production' && <ReactQueryDevtoolsPanel initialIsOpen={false} />} */}
        <ProgressBar
          height="4px"
          color="#E89400"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </QueryClientProvider>
    </Fragment>
  );
};

export default App;
