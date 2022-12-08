import { Row, Col, Spin } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/banks.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import PaymentMethods from "../components/payment-methods";
import ResultCards from "../components/result-cards";
import itemServices from "../services/item";
import { useEffect, useState } from "react";

const Cards = () => {
  const { locale, query } = useRouter();
  const t = useTranslations("Messages");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { type } = query;

    async function getData() {
      const result =
        type && type === "popular"
          ? await itemServices.getMostPopularProducts(locale)
          : await itemServices.getBuyAndWinsProducts(locale);
      return result;
    }
    getData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);
  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | البطاقات " : "Power Card | Cards"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.banks}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={50}>
              <Col xs={24}>
                {" "}
                <div>
                  <h2 className={styles.profileHeadding}>
                    {t("All")} <span>{t("Cards")}</span>
                  </h2>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={24}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <ResultCards itemsData={data} />
              )}
            </Col>
            <Col xs={24}>
              <PaymentMethods />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Cards;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
