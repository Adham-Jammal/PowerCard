import { Col, Row } from "antd";
import { useTranslations } from "next-intl";
import Container from "../layout/container";
import styles from "./index.module.scss";
import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Boxes = ({ data }) => {
  const t = useTranslations("Messages");

  return (
    <div className={`${styles.benefitsWrap} `} style={{ marginTop: 20 }}>
      <Container>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={22}>
            <Row
              gutter={[
                {
                  xs: 0,
                  sm: 0,
                  md: 25,
                  lg: 25,
                  xl: 0,
                },
                {
                  xs: 16,
                  sm: 25,
                  md: 25,
                  lg: 25,
                  xl: 0,
                },
              ]}
            >
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <div className={styles.benefitCard}>
                  <div className={styles.iconWrap}>
                    <GlobalOutlined />
                  </div>
                  <div className={styles.content}>
                    <h3>{t("VisitUS")}</h3>
                    <p
                      className="text-lines"
                      onClick={() => window.open(data.url, "_blank")}
                    >
                      {data.name}
                    </p>
                  </div>
                </div>
              </Col>{" "}
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <div className={styles.benefitCard}>
                  <div className={styles.iconWrap}>
                    <MailOutlined />
                  </div>
                  <div className={styles.content}>
                    <h3>{t("EmailUS")}</h3>
                    <p
                      className="text-lines"
                      onClick={() => window.open("mailto:" + data.email)}
                    >
                      {data.email}
                    </p>
                  </div>
                </div>
              </Col>{" "}
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <div className={styles.benefitCard}>
                  <div className={styles.iconWrap}>
                    <PhoneOutlined />
                  </div>
                  <div className={styles.content}>
                    <h3>{t("CallUS")}</h3>
                    <p
                      className="text-lines"
                      onClick={() => window.open("tel:" + data.phone)}
                    >
                      {data.phone}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Boxes;
