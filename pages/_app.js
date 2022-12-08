import { NextIntlProvider } from "next-intl";
import AppLayout from "../components/layout";
import Head from "next/head";
import arEG from "antd/lib/locale/ar_EG";
import enUS from "antd/lib/locale/en_US";
import { ConfigProvider } from "antd";
import { useRouter } from "next/router";
import { persistor, store } from "../store";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "flag-icon-css/css/flag-icons.min.css";
import "antd/lib/style/default.css";
import "antd/dist/antd.css";
import "../styles/globals.scss";
import "../styles/customization.scss";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "../components/loader";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextIntlProvider
          formats={{
            dateTime: {
              short: {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            },
          }}
          messages={pageProps.messages || []}
          now={new Date(pageProps.now)}
        >
          <ConfigProvider
            locale={locale === "ar" ? arEG : enUS}
            direction={locale === "ar" ? "rtl" : "ltr"}
          >
            {loading ? (
              <Loader />
            ) : (
              <AppLayout>
                <Head>
                  <meta
                    name="viewport"
                    content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
                  />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                  />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
                    rel="stylesheet"
                  />
                </Head>
                <Component {...pageProps} />
              </AppLayout>
            )}
          </ConfigProvider>
        </NextIntlProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
