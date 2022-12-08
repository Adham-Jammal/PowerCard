import { Col } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

const BenefitCard = ({ data: { icon, abbrev, contentAbbrev } }) => {
  const t = useTranslations("Messages");

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
      <div className={styles.benefitCard}>
        <div className={styles.iconWrap}>{icon}</div>
        <div className={styles.content}>
          <h3>{t(abbrev)}</h3>
          <p className="text-lines">{t(contentAbbrev)}</p>
        </div>
      </div>
    </Col>
  );
};
export default BenefitCard;
