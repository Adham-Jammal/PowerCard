import { Row, Col, Result } from "antd";
import { useTranslations } from "next-intl";
import Container from "../layout/container";
import styles from "./index.module.scss";
import ProductCard from "../product-card";

const ResultCards = ({ itemsData }) => {
  const t = useTranslations("Messages");

  return (
    <div className={`${styles.popCardsWrap} `}>
      <Container className={styles.container}>
        <Row align="center">
          {itemsData && itemsData.length > 0 ? (
            itemsData?.map((product, index) => {
              return (
                <Col key={index} className={styles.col}>
                  <div className={styles.popCardItem}>
                    <ProductCard data={product} />
                  </div>
                </Col>
              );
            })
          ) : itemsData && itemsData.length === 0 ? (
            <div>
              <Result status="404" title={t("NoProductFound")} />
            </div>
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ResultCards;
