import { Row, Col, Collapse } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/membership.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { DownArrow } from "../constants/icons";
import { useEffect, useState } from "react";
import faqsService from "../services/faqs";

const { Panel } = Collapse;

const FAQsComponent = () => {
  const { locale } = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    let result = [];
    async function getData() {
      result = await faqsService.getFAQs(locale);
    }
    getData().then(() => {
      setData(result);
    });
  }, [locale]);

  return (
    <>
      {data.map((item) => {
        return (
          <Row gutter={50} style={{ marginTop: "50px" }} key={item.id}>
            <Col xs={24} sm={24} md={15} lg={12} xl={12}>
              <h2 className={styles.faqTitle}>{item.name}</h2>
            </Col>
            <Col xs={24} sm={24} md={15} lg={12} xl={12}>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <DownArrow rotate={isActive ? 90 : 0} />
                )}
                className={`${styles.mainCollapse} mainCollapse`}
              >
                {item.faq &&
                  item.faq.length > 0 &&
                  item.faq.map((faq) => {
                    return (
                      <Panel header={faq.question} key={faq.id}>
                        {faq.answer}
                      </Panel>
                    );
                  })}
              </Collapse>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

const MembershipDetails = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");
  const theme = useSelector((state) => state.theme.value);
  const membership = useSelector((state) => state.auth.value.membership.name);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );
  function handleWindowSizeChange() {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | تفاصيل العضوية "
            : "Power Card | Membership Details"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.membership}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={50}>
              <Col xs={24}>
                {" "}
                <div>
                  <h2 className={styles.profileHeadding}>
                    {t("MemberShipPrefix")} <span>{t("MemberShip")}</span>{" "}
                    {t("MemberShipSuffix")}
                  </h2>
                  <p className={styles.profileDesc}>{t("MembershipDesc")}</p>
                  <p className={styles.profileDesc}>{t("MembershipDesc2")}</p>
                  <p className={styles.profileDesc}>{t("MembershipDesc3")}</p>
                  
                  <div className={styles.imageWrapper}>
                    <Image
                      width={240}
                      height={50}
                      src={
                        theme === "dark"
                          ? "/images/members/Merchant_White.png"
                          : "/images/members/Merchant_Black.png"
                      }
                      alt=""
                    />
                    <Image
                      width={240}
                      height={50}
                      src={
                        theme === "dark"
                          ? "/images/members/Classic_White.png"
                          : "/images/members/Classic_Black.png"
                      }
                      alt=""
                    />
                    <Image
                      width={240}
                      height={55}
                      src={
                        theme === "dark"
                          ? "/images/members/Platinum_White.png"
                          : "/images/members/Platinum_Black.png"
                      }
                      alt=""
                    />
                  </div>
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: 70 }}>
                {" "}
                <div>
                  <h2 className={styles.profileHeadding}>
                    {t("MemberShipDifferencePrefix")}{" "}
                    <span>{t("MemberShipDifferenceSuffix")}</span>{" "}
                  </h2>
                </div>
                {width <= 992 ? (
                  <>
                    <Row className={styles.rowMobile}>
                      <Col
                        xs={22}
                        className={`${styles.colMobile} ${
                          membership === "classic"
                        }`}
                        //  || membership == "" ? styles.active : ""
                      >
                        <span className={styles.titleName} >{t("Classic")}</span>
                        <span>{t("Membership")}</span>
                        <span>&nbsp;</span>
                        <div className={styles.details}>
                          <span>
                            <span>{t("MembershipD1")}</span>
                            <span>
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span>{t("MembershipD2")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span>{t("MembershipD3")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                                  fill="#FE5A43"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span> {t("MembershipD4")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                                  fill="#FE5A43"
                                />
                              </svg>
                            </span>
                          </span>
                        </div>

                        <span>&nbsp;</span>
                      </Col>
                      <Col
                        xs={22}
                        className={`${styles.colMobile} ${
                          membership === "merchant" ? styles.active : ""
                        }`}
                      >
                        <span className={styles.titleName}>{t("Merchant")}</span>
                        <span>{t("Membership2")}</span>
                        <span>&nbsp;</span>
                        <div className={styles.details}>
                          <span>
                            <span>{t("MembershipD1")}</span>
                            <span>
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                                  fill="#FE5A43"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span> {t("MembershipD2")}</span>
                            <span>
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                                  fill="#FE5A43"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span> {t("MembershipD3")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span> {t("MembershipD4")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                        </div>
                        <span>&nbsp;</span>
                      </Col>
                      <Col
                        xs={22}
                        className={`${styles.colMobile} ${
                          membership === "Platini" ? styles.active : ""
                        }`}
                      >
                        <span className={styles.titleName}>{t("Platinum")}</span>
                        <span>{t("Membership")}</span>
                        <span>&nbsp;</span>
                        <div className={styles.details}>
                          <span>
                            <span>{t("MembershipD1")}</span>
                            <span>
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span> {t("MembershipD2")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span>{t("MembershipD3")}</span>
                            <span>
                              {" "}
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                          <span>
                            <span> {t("MembershipD4")}</span>
                            <span>
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                                  fill="#5BD77E"
                                />
                              </svg>
                            </span>
                          </span>
                        </div>
                        <span>&nbsp;</span>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className={styles.firstRow}>
                      <Col xs={6}></Col>
                      <Col
                        xs={6}
                        className={`${styles.littlePadding} ${
                          membership === "classic" ? styles.active : ""
                        }`}
                      >
                        <span>{t("Classic")}</span>
                        <span>{t("Membership")}</span>
                      </Col>
                      <Col
                        xs={6}
                        className={`${styles.littlePadding} ${
                          membership === "merchant" ? styles.active : ""
                        }`}
                      >
                        <span>{t("Merchant")}</span>
                        <span>{t("Membership2")}</span>
                      </Col>
                      <Col
                        xs={6}
                        className={`${styles.littlePadding} ${
                          membership === "Platini" ? styles.active : ""
                        }`}
                      >
                        <span>{t("Platinum")}</span>
                        <span>{t("Membership")}</span>
                      </Col>
                    </Row>
                    <Row className={styles.secondRow}>
                      <Col xs={6}>
                        {" "}
                        <span>&nbsp;</span>
                        <span>{t("MembershipD1")}</span>
                        <span>{t("MembershipD2")}</span>
                        <span>{t("MembershipD3")}</span>
                        <span>{t("MembershipD4")}</span>
                        <span>&nbsp;</span>
                      </Col>
                      <Col
                        xs={6}
                        className={`${styles.col} ${styles.col1} ${
                          membership === "classic" ? styles.active : ""
                        }`}
                      >
                        <span>&nbsp;</span>
                        <span>
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                              fill="#FE5A43"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                              fill="#FE5A43"
                            />
                          </svg>
                        </span>{" "}
                        <span>&nbsp;</span>
                      </Col>
                      <Col
                        xs={6}
                        className={`${styles.col} ${
                          membership === "merchant" ? styles.active : ""
                        }`}
                      >
                        {" "}
                        <span>&nbsp;</span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                              fill="#FE5A43"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.353 6.35306C6.82163 5.88443 7.58142 5.88443 8.05005 6.35306L12.0015 10.3045L15.953 6.35306C16.4216 5.88443 17.1814 5.88443 17.6501 6.35306C18.1187 6.82169 18.1187 7.58149 17.6501 8.05011L13.6986 12.0016L17.6501 15.9531C18.1187 16.4217 18.1187 17.1815 17.6501 17.6501C17.1814 18.1187 16.4216 18.1187 15.953 17.6501L12.0015 13.6986L8.05005 17.6501C7.58142 18.1187 6.82163 18.1187 6.353 17.6501C5.88437 17.1815 5.88437 16.4217 6.353 15.9531L10.3045 12.0016L6.353 8.05011C5.88437 7.58149 5.88437 6.82169 6.353 6.35306Z"
                              fill="#FE5A43"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>{" "}
                        <span>&nbsp;</span>
                      </Col>
                      <Col
                        xs={6}
                        className={`${styles.col} ${
                          membership === "Platini" ? styles.active : ""
                        }`}
                      >
                        <span>&nbsp;</span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>
                          {" "}
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.3795 6.55131C20.1801 7.31234 20.2121 8.57826 19.4511 9.37883L11.8461 17.3788C11.4673 17.7773 10.9412 18.0023 10.3914 18.0008C9.84158 17.9994 9.31661 17.7717 8.93988 17.3712L4.54482 12.6993C3.78797 11.8948 3.82662 10.6291 4.63114 9.87223C5.43566 9.11538 6.7014 9.15403 7.45824 9.95855L10.4042 13.0901L16.552 6.62289C17.313 5.82232 18.5789 5.79027 19.3795 6.55131Z"
                              fill="#5BD77E"
                            />
                          </svg>
                        </span>
                        <span>&nbsp;</span>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
              <Col xs={24} style={{ marginTop: 50 }}>
                <FAQsComponent />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MembershipDetails;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
