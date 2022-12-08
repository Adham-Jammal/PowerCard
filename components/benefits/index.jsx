import { Col, Row } from "antd";
import { useTranslations } from "next-intl";
import Container from "../layout/container";
import SectionTitle from "../section-title";
import BenefitCard from "./benefit-card";
import { Competitive, Fast, Convenient } from "../../constants/icons";
import styles from "./index.module.scss";

const Benefits = () => {
  const t = useTranslations("Messages");

  const benefits = [
    {
      icon: <Competitive />,
      abbrev: "competitive_prices",
      contentAbbrev: "competitive_content",
      title: "competitive prices",
      content:
        "Pre-paid cards that would give our customers competitive prices.",
    },
    {
      icon: <Fast />,
      title: "Fast",
      abbrev: "fast",
      contentAbbrev: "fast_content",
      content:
        "Online access, friendly user experience and virtual accounts arrive within minutes",
    },
    {
      icon: <Convenient />,
      title: "Convenient",
      contentAbbrev: "convenient_content",
      abbrev: "convenient",
      content:
        "We offer the widest variety of cards online in any RAS amount between 10-500 RAS.",
    },
  ];
  return (
    <div className={`${styles.benefitsWrap} section-padding--large`}>
      <Container>
        <SectionTitle className={styles.sectionTitle} align="center">
          {t("power_cards_benefits")} <b>{t("power_cards_benefits2")}</b>
        </SectionTitle>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={22}>
            <Row gutter={30}>
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} data={benefit} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Benefits;
