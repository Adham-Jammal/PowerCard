import { Row, Col } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/merchants.module.scss";
import JoinForm from "../components/join-form";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";

const JoinMerchants = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | انضم إلى تجارنا "
            : "Power Card | Join our Merchants"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.merchants}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={80}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div
                  className={`${styles.merchantsImgCol} ${
                    locale === "ar" ? styles.ar : ""
                  } `}
                >
                  <div className="sublines">
                    <div className={`${styles.merchantsImg} lines`}>
                      <div className={styles.merchantsInnerImg}>
                        <img
                          className="img-fill"
                          alt="merchants"
                          src={`/images/merchant.png`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={15} lg={12} xl={12}>
                <div className={styles.merchantContent}>
                  <h2 className={styles.merchantsTitle}>
                    <span>{t("JoinOurMerchants")}</span>
                  </h2>
                  <p>{t("MerchantFeaturesTitle")}</p>
                  <ul>
                    <li>{t("MerchantFeatures1")}</li>
                    <li>{t("MerchantFeatures2")}</li>
                    <li>{t("MerchantFeatures3")}</li>
                    <li>{t("MerchantFeatures4")}</li>
                    <li>{t("MerchantFeatures5")}</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          <JoinForm />
        </Container>
      </div>
    </>
  );
};

export default JoinMerchants;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
