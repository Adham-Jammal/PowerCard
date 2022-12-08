import { Row, Col, Collapse } from "antd";
import Container from "../components/layout/container";
import { DownArrow } from "../constants/icons";
import styles from "../styles/modules/faqs.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslations } from "next-intl";
import faqsService from "../services/faqs";
import { useEffect, useState } from "react";

const { Panel } = Collapse;

const FAQsComponent = () => {
  const { locale } = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    let result = [];
    async function getData() {
      result = await faqsService.getFAQs(locale);
    }
    getData().then(() => {
      setData(result);
    });
  }, [locale]);

  return (
    <>
      {data.map((item) => {
        return (
          <Row gutter={50} style={{ marginTop: "50px" }} key={item.id}>
            <Col xs={24} sm={24} md={15} lg={12} xl={12}>
              <h2 className={styles.faqTitle}>{item.name}</h2>
            </Col>
            <Col xs={24} sm={24} md={15} lg={12} xl={12}>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <DownArrow rotate={isActive ? 90 : 0} />
                )}
                className={`${styles.mainCollapse} mainCollapse`}
              >
                {item.faq &&
                  item.faq.length > 0 &&
                  item.faq.map((faq) => {
                    return (
                      <Panel header={faq.question} key={faq.id}>
                        {faq.answer}
                      </Panel>
                    );
                  })}
              </Collapse>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

const Faqs = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  return (
    <>
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | الأسئلة الشائعة"
            : "Power Card | FAQs"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>
      <main className="faqs">
        <div className="leftBg" />
        <div className={`${styles.faqs} section-padding`}>
          <Container>
            <Row gutter={50}>
              <Col xs={24} sm={24} md={15} lg={12} xl={12}>
                <div className={styles.faqsContent}>
                  <h2 className={styles.faqsTitle}>
                    <span className={styles.span}>{t("FAQ1")}</span>
                  </h2>
                  <h2 className={styles.faqsTitle}>{t("FAQ2")}</h2>
                  <h2 className={styles.faqsTitle}>{t("FAQ3")}</h2>
                  <img
                    src={`/images/_.png`}
                    className={styles.questionMark}
                    alt="question mark"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className={styles.faqsImgCol}>
                  <div className="sublines">
                    <div className={`${styles.faqsImg} lines`}>
                      <div className={styles.faqsInnerImg}>
                        <img
                          className="img-fill"
                          alt="faqs"
                          src={`/images/merchant.png`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <FAQsComponent />
          </Container>
          <div className="leftBox">
            <div className="leftInlineBox" />
          </div>
          <div className="rightBox">
            <div className="rightInnerBox" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Faqs;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
