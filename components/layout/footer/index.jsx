import { Row, Col } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  SnapChat,
  Tiktok,
  Twitter,
  Whatsapp,
  Youtube,
} from "../../../constants/icons";
import Container from "../container";
import Image from "next/image";
import { useEffect } from "react";

const Footer = ({ footer_dark_logo, footer_light_logo, links }) => {
  const t = useTranslations("Messages");

  const theme = useSelector((state) => state.theme.value);
  const userName = useSelector((state) => state.auth.value.name);
  const hasWallet = useSelector((state) => state.auth.value.membership.wallet);

  const socialIcons = [
    { icon: <Twitter />, socialName: "Twitter", link: links.twitter_url },
    { icon: <Facebook />, socialName: "Facebook", link: links.facebook_url },
    { icon: <Linkedin />, socialName: "Linkedin", link: links.linkedin_url },
    { icon: <Youtube />, socialName: "Youtube", link: links.youtube_url },
    { icon: <Mail />, socialName: "Email", link: links.email_url },
    { icon: <Instagram />, socialName: "Instagram", link: links.instagram_url },
    { icon: <Whatsapp />, socialName: "Whatsapp", link: links.whatsapp_url },
    { icon: <SnapChat />, socialName: "Snapchat", link: links.snapchat_url },
    { icon: <Tiktok />, socialName: "Tiktok", link: links.tiktok_url },
  ];

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Row align="center">
          <Col xs={23} sm={22} md={24} lg={24} xl={22}>
            <Row>
              <Col xs={24} sm={10} md={10} lg={7} xl={6}>
                <div className={styles.footerLogoSec}>
                  <Link passHref href={"/"}>
                    <div className={styles.footerLogo}>
                      {footer_dark_logo !== undefined &&
                        footer_light_logo !== undefined && (
                          <Image
                            alt={t("PowerCard")}
                            src={
                              theme === "light"
                                ? footer_light_logo
                                  ? `https://admin.powercard-sa.com${footer_light_logo}`
                                  : "/images/logo-light-new.png"
                                : footer_dark_logo
                                ? `https://admin.powercard-sa.com${footer_dark_logo}`
                                : "/images/logo-dark-new.png"
                            }
                            className={styles.img}
                            layout="fill"
                          />
                        )}
                    </div>
                  </Link>
                  <p>
                    <Image
                      src={"/images/tax.png"}
                      width={75}
                      height={37}
                      alt="maroof.sa"
                      onClick={() =>
                        window.open("https://maroof.sa/109494", "_blank")
                      }
                    />
                    <span>{t("TaxNumber")}</span>
                    302194579700003
                  </p>
                </div>
              </Col>

              <Col xs={24} sm={14} md={14} lg={9} xl={11}>
                <div className={styles.footerLinksWrap}>
                  {userName && (
                    <div className={styles.footerLinksSection}>
                      <h4>{t("MyAccount")}</h4>
                      <ul>
                        <li>
                          <Link href="/my-orders" passHref>
                            <a> {t("Purchased")}</a>
                          </Link>
                        </li>
                        {/* {hasWallet !== 0 && ( */}
                        <li>
                          <Link href="/wallet" passHref>
                            <a>{t("Wallet")}</a>
                          </Link>
                        </li>
                        {/* )} */}

                        <li>
                          <Link href="/profile" passHref>
                            <a> {t("MyAccount")}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/coupons" passHref>
                            <a> {t("Coupons")}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className={styles.footerLinksSection}>
                    <h4>{t("QuickLinks")}</h4>
                    <ul>
                      <li>
                        <Link href="/about-us" passHref>
                          <a> {t("AboutUs")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-and-conditions" passHref>
                          <a> {t("TermsAndConditions")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy" passHref>
                          <a> {t("PrivacyPolicy")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/faqs" passHref>
                          <a> {t("Faqs")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" passHref>
                          <a> {t("ContactUs")}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>

              <Col
                xs={24}
                sm={14}
                md={10}
                lg={8}
                xl={7}
                className={styles.socialCol}
              >
                <div className={styles.socialMediaWrap}>
                  <ul>
                    {socialIcons.map(
                      (item, index) =>
                        item.link !== null && (
                          <li key={index}>
                            <Link passHref href={item.link}>
                              <a>{item.icon}</a>
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                  <p>{t("FooterRights")}</p>
                </div>
              </Col>
            </Row>
            <p className={styles.mobileRights}>{t("FooterRights")}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
