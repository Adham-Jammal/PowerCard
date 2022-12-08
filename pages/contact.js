import { Row, Col } from "antd";
import Container from "../components/layout/container";
import ContactForm from "../components/contact-form";
import styles from "../styles/modules/contact.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Head from "next/head";
const ContactUs = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | تواصل معنا"
            : "Power Card | Contact US"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>
      <main className={`${styles.main}`}>
        <div className="leftBg" />
        <div className={`${styles.contactus} section-padding`}>
          <Container>
            <div className={`${styles.bannerWrap} section-padding `}>
              <Row gutter={80}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div
                    className={`${styles.contactusImgCol} ${
                      locale === "ar" ? styles.ar : ""
                    } `}
                  >
                    <div className="sublines">
                      <div className={`${styles.contactusImg} lines`}>
                        <div className={styles.contactusInnerImg}>
                          <img
                            className="img-fill"
                            alt="contact"
                            src={`/images/merchant.png`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={15} lg={12} xl={12}>
                  <div className={styles.contactusContent}>
                    <h2 className={styles.contactusTitle}>
                      <span>{t("ContactUs")}</span>
                    </h2>
                    <p>{t("contact_text")}</p>
                  </div>
                </Col>
              </Row>
            </div>
            <ContactForm />
          </Container>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
