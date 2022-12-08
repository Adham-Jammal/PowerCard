import { useTranslations } from "next-intl";
import Link from "next/link";
import Container from "../components/layout/container";
import HeadBox from "../components/head-box";
import styles from "../styles/modules/terms.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import privacyPolicyService from "../services/privacy-policy";
import { useEffect, useState } from "react";

const PrivacyComponent = () => {
  const [data, setData] = useState([]);
  const { locale } = useRouter();

  useEffect(() => {
    let result = [];
    async function getData() {
      result = await privacyPolicyService.getPrivacy(locale);
    }
    getData().then(() => {
      setData(result);
    });
  }, [locale]);

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id} className={styles.termsInner}>
            <HeadBox className={styles.termsBox} text={item.name} />
            {item.privacy &&
              item.privacy.length > 0 &&
              item.privacy.map((p) => {
                return (
                  <div
                    key={p.id}
                    className={styles.customP}
                    dangerouslySetInnerHTML={{ __html: p.desc }}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

const Privacy = () => {
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
            <PrivacyComponent />
          </Container>
        </div>
      </main>
    </>
  );
};

export default Privacy;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
