import { Row, Col } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/merchants.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import homeServices from "../services/home";
import dynamic from "next/dynamic";

const Subscribe = dynamic(() => import("../components/subscribe"));
const Benefits = dynamic(() => import("../components/benefits"));
const Boxes = dynamic(() => import("../components/boxes"));

const AboutUS = ({ data }) => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | حول باور كارد"
            : "Power Card | About Us"}
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
                    <span>
                      {t("AboutPowerCard1")}&nbsp;
                      <span className={styles.orange}>
                        {t("AboutPowerCard2")}
                      </span>
                    </span>
                  </h2>
                  <p>{data.desc}</p>
                </div>
              </Col>
            </Row>

            <Boxes data={data} />
            <Row style={{ marginTop: 20 }}></Row>
            <Benefits />
            <Subscribe />
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutUS;
export async function getServerSideProps({ locale }) {
  let data = [];

  data = await homeServices.getInfo(locale);

  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
      data: data[0] || {},
    },
  };
}
