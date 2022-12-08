import { useTranslations } from "next-intl";
import Container from "../components/layout/container";
import HeadBox from "../components/head-box";
import styles from "../styles/modules/terms.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import privacyPolicyService from "../services/privacy-policy";
import { useEffect, useState } from "react";

const TermsAndConditionsComponent = () => {
  const [terms, setTerms] = useState(undefined);
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  useEffect(() => {
    let result = undefined;
    async function getData() {
      result = await privacyPolicyService.getTerms(locale);
    }
    getData().then(() => {
      setTerms(result.privacy[0]?.desc);
    });
  }, [locale]);
  return (
    <div className={styles.termsInner}>
      <HeadBox className={styles.termsBox} text={t("ourTermsAndCondition")} />

      <div
        className={styles.customP}
        dangerouslySetInnerHTML={{ __html: terms }}
      />
    </div>
  );
};

const TermsAndConditions = () => {
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | الشروط والأحكام "
            : "Power Card | Terms and Conditions"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>
      <main>
        <div className={`${styles.terms} section-padding`}>
          <Container>
            <TermsAndConditionsComponent />
          </Container>
        </div>
      </main>
    </>
  );
};

export default TermsAndConditions;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
