import { Row, Col } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/banks.module.scss";
import EditProfileForm from "../components/edit-profile-form";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import PowerBtn from "../components/button";
import PaymentMethods from "../components/payment-methods";
import Banks from "../components/banks-accounts";

const BanksAccounts = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | الحسابات البنكية "
            : "Power Card | Banks Accounts"}
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
                  <h2 className={styles.profileHeadding2}>
                    {t("Bank")} <span>{t("Accounts")}</span>
                  </h2>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Banks />
            <PaymentMethods />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BanksAccounts;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
