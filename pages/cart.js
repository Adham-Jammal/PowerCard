import { Row, Col, Result } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/cart.module.scss";
import OrderSummary from "../components/order-summary";
import CartCard from "../components/cart-card";
import TermsAndConditions from "../components/terms-and-conditions";
import PaymentMethods from "../components/payment-methods";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import homeServices from "../services/home";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { clearCoupon } from "../features/cart-slice";

const Cart = () => {
  const userId = useSelector((state) => state.auth.value.id);
  const cart = useSelector((state) =>
    state.cart.value.filter((i) => i.userId == userId)
  );
  const userName = useSelector((state) => state.auth.value.name);
  const t = useTranslations("Messages");
  const dispatch = useDispatch();
  const { locale } = useRouter();

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    async function getData() {
      let result = await homeServices.getCoupons(locale);
      dispatch(clearCoupon());
      setCoupons(result);
    }
    if (userName && getCookie("AUTH") !== undefined) {
      getData();
    }
  }, []);
  return (
    <>
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | سلة المشتريات " : "Power Card | Cart"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.cart} section-padding`}>
        <div className={styles.leftBg}> </div>
        <Container className={styles.container}>
          <Row gutter={30}>
            {cart && cart.length > 0 ? (
              <>
                <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                  {cart && cart.length > 0 ? (
                    cart.map((item) => {
                      return <CartCard key={item.id} item={item} />;
                    })
                  ) : (
                    <></>
                  )}
                </Col>
                <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                  <OrderSummary cart={cart} coupons={coupons} />
                </Col>
              </>
            ) : (
              <Col xs={24} sm={24} md={24}>
                <Result
                  status="404"
                  title={t("CartEmpty1")}
                  subTitle={t("CartEmpty2")}
                />
              </Col>
            )}
          </Row>
        </Container>
        <div className={`${styles.terms} section-padding--xlarge`}>
          <div className={styles.rightBg}> </div>
          <div className="leftBox">
            <div className="leftInlineBox" />
          </div>
          <div className="rightBox">
            <div className="rightInnerBox" />
          </div>
          <TermsAndConditions />
        </div>
        <PaymentMethods />
      </div>
    </>
  );
};

export default Cart;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
