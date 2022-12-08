import { Row, Col, Result } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/orders.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import homeServices from "../services/home";
import { useEffect, useState } from "react";
import Coupon from "../components/coupons";
import { getCookie } from "cookies-next";

const Coupons = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");
  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function getData() {
      let result = await homeServices.getCoupons(locale);
      let company = result.filter((item) => {
        return item.Company !== undefined;
      });
      setCompanyData(company);
      let category = result.filter((item) => {
        return item.Sub_Category !== undefined;
      });
      setCategoryData(category);
      let product = result.filter((item) => {
        return item.Product !== undefined;
      });
      setProductData(product);
      console.log("sss", product);
    }
    getData();
  }, [locale]);
  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | طلباتي " : "Power Card | My Orders"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.orders}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            {companyData &&
              companyData.length === 0 &&
              productData &&
              productData.length == 0 &&
              categoryData &&
              categoryData.length == 0 && (
                <Col xs={24} sm={24} md={24}>
                  <Result status="404" title={t("CouponEmpty1")} />
                </Col>
              )}
            {companyData && companyData.length > 0 && (
              <>
                <Row gutter={50}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>
                      <h2 className={styles.profileHeadding}>
                        {t("CouponsFor")} <span>{t("Companies")}</span>
                      </h2>
                    </div>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                  <Col xs={24} sm={24} md={24} lg={15}>
                    <Coupon data={companyData} />
                  </Col>
                </Row>
              </>
            )}

            {productData && productData.length > 0 && (
              <>
                <Row gutter={50}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>
                      <h2 className={styles.profileHeadding}>
                        {t("CouponsFor")} <span>{t("Products")}</span>
                      </h2>
                    </div>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                  <Col xs={24} sm={24} md={24} lg={15}>
                    <Coupon data={productData} />
                  </Col>
                </Row>
              </>
            )}

            {categoryData && categoryData.length > 0 && (
              <>
                <Row gutter={50}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>
                      <h2 className={styles.profileHeadding}>
                        {t("CouponsFor")} <span>{t("Categories")}</span>
                      </h2>
                    </div>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                  <Col xs={24} sm={24} md={24} lg={15}>
                    <Coupon data={categoryData} />
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Coupons;
export async function getServerSideProps({ req, locale, res }) {
  if (!getCookie("AUTH", { req, res })) {
    const link = locale === "ar" ? "/ar" : "/";
    res.setHeader("location", link);
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
