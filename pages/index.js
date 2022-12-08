import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "../styles/modules/index.module.scss";
import Container from "../components/layout/container";
import dynamic from "next/dynamic";
import Banner from "../components/banner";
import PowerBtn from "../components/button";

const PaymentMethods = dynamic(() => import("../components/payment-methods"));
const Subscribe = dynamic(() => import("../components/subscribe"));
const Benefits = dynamic(() => import("../components/benefits"));
const ReviewsCarousel = dynamic(() => import("../components/reviews-carousel"));
const MostSelling = dynamic(() => import("../components/most-selling"));
const PopularCardsCarousel = dynamic(() =>
  import("../components/popular-cards-carousel")
);
const PopularCardsCarousel2 = dynamic(() =>
  import("../components/popular-cards-carousel2")
);

export default function HomePage({ isMobileView }) {
  const { locale } = useRouter();
  const router = useRouter();

  const t = useTranslations("Messages");

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );
  function handleWindowSizeChange() {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | الرئيسية" : "Power Card | Home"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>
      <Banner />
      <PopularCardsCarousel visible mobile={width <= 600} />
      <MostSelling mobile={width <= 600} />
      <div className={`${styles.appleCards} section-padding--large`}>
        <Container>
          <PopularCardsCarousel2
            titleAbbrev="apple_cards"
            mobile={width <= 600}
          />
          <h3
            className={`${styles.backWordStart} ${
              locale === "ar" ? styles.ar : ""
            } back-word`}
          >
            {t("buy")}
          </h3>
          <h3
            className={`${styles.backWordEnd} ${
              locale === "ar" ? styles.ar : ""
            } back-word`}
          >
            {t("win")}
          </h3>
        </Container>
      </div>
      {width <= 600 && (
        <div className={`${styles.appleCards} section-padding--large`}>
          <Container>
            <PopularCardsCarousel2
              titleAbbrev="pubg_cards"
              mobile={width <= 600}
            />
          </Container>
        </div>
      )}
      <div className={`${styles.buyAndWinCards} section-padding--large`}>
        {width > 600 ? (
          <Container>
            <PopularCardsCarousel2
              withTag={true}
              mobile={width <= 600}
              className={styles.container}
              titleAbbrev="buy_and_win_with_power_stars"
            />
          </Container>
        ) : (
          <>
            <PopularCardsCarousel2
              withTag={true}
              mobile={width <= 600}
              className={styles.container}
              titleAbbrev="buy_and_win_with_power_stars"
            />
            <div className={styles.mobileBtn}>
              <PowerBtn withShadow onClick={() => router.push("/cards")}>
                {t("view_all_products")}
              </PowerBtn>
            </div>
          </>
        )}
      </div>
      <ReviewsCarousel />
      <Benefits />
      <Subscribe />
      <PaymentMethods />
    </>
  );
}
export async function getServerSideProps({ locale, req }) {
  let isMobileView = (
    req ? req.headers["user-agent"] : navigator.userAgent
  ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  return {
    props: {
      isMobileView: Boolean(isMobileView),
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
