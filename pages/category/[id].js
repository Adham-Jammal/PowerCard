import { Row, Col, Spin } from "antd";
import Container from "../../components/layout/container";
import styles from "../../styles/modules/banks.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import PaymentMethods from "../../components/payment-methods";
import ResultCards from "../../components/result-cards";
import itemServices from "../../services/item";
import { useEffect, useState } from "react";

const Category = () => {
  const { locale, query } = useRouter();
  const t = useTranslations("Messages");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  useEffect(() => {
    const { id, sub } = query;

    async function getData() {
      const result = await itemServices.getItemsByCategory(id, locale, sub);
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
                    {t("CardsInThis")} <span>{t("Category")}</span>
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

export default Category;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
}
