import { useTranslations } from "next-intl";
import Link from "next/link";
import Container from "../layout/container";
import HeadBox from "../head-box";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import privacyPolicyService from "../../services/privacy-policy";

const TermsAndConditions = () => {
  const t = useTranslations("Messages");
  const [terms, setTerms] = useState(undefined);
  const { locale } = useRouter();

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
    <div className={styles.terms}>
      <Container>
        <div className={styles.termsInner}>
          <HeadBox
            className={styles.termsBox}
            text={t("ourTermsAndCondition")}
          />
          <p
            className={styles.ol}
            dangerouslySetInnerHTML={{ __html: terms }}
          ></p>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
