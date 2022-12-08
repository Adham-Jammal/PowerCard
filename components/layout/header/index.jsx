import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Container from "../container";
import PowerBtn from "../../button";
import { Menu, Search, Home, Join, Cart } from "../../../constants/icons";
import useSticky from "../../../hooks/useSticky";
import SignInModal from "../../signin-modal";
import SignUpModal from "../../signup-modal";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import SideMenu from "../side-menu";
import ForgetPasswordModal from "../../forget-password-modal";
import ConfirmForgetPasswordModal from "../../confirm-forget-password-modal";
import { message } from "antd";

const Header = ({
  setMenuOpened,
  menuOpened,
  wallet,
  header_dark_logo,
  header_light_logo,
  setWallet,
  setPoints,
}) => {
  const t = useTranslations("Messages");
  const theme = useSelector((state) => state.theme.value);
  const userName = useSelector((state) => state.auth.value.name);
  const membership = useSelector((state) => state.auth.value.membership.name);
  const userId = useSelector((state) => state.auth.value.id);

  const cartLength = useSelector((state) => {
    return state.cart.value
      .filter((i) => i.userId == userId)
      .reduce((partialSum, a) => partialSum + a.quantity, 0);
  });

  const navRef = useRef(null);
  // const langRef = useRef(null);

  const { isFix } = useSticky(navRef);
  const { locale, locales, route, query } = useRouter();
  const router = useRouter();

  const otherLocale = locales?.find((cur) => cur !== locale);
  const languageMap = {
    en: "ltr",
    ar: "rtl",
  };
  // const [opened, setOpened] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(locale);
  const [verificationOK, setVerificationOK] = useState(false);

  const [signInVisible, setSignInVisible] = useState(false);
  const [forgetPasswordVisible, setForgetPasswordVisible] = useState(false);
  const [confirmForgetPasswordVisible, setConfirmForgetPasswordVisible] =
    useState(false);

  useEffect(() => {
    if (query && query.verified && !verificationOK) {
      setVerificationOK(true);
      setSignInVisible(true);
      message.success(t("AccountVerifiedSuccessfully"), 7);
    }
  });
  useEffect(() => {
    if (process.browser) {
      document.body.dir = languageMap[locale] || "ltr";
      document.documentElement.setAttribute("lang", locale);
      document.documentElement.classList.add(languageMap[locale]);
      document.documentElement.classList.remove(
        locale === "en" ? "rtl" : "ltr"
      );
    }
  }, [locale]);

  const closeSignUpModal = () => {
    setSignUpVisible(false);
  };
  const closeSignInModal = () => {
    setSignInVisible(false);
  };

  return (
    <header>
      {userName === undefined && (
        <>
          <SignInModal
            visible={signInVisible}
            handleOpenSignup={() => setSignUpVisible(true)}
            handleClose={closeSignInModal}
            setWallet={setWallet}
            setPoints={setPoints}
            handleOpenForgetPassword={() => setForgetPasswordVisible(true)}
          />
          <SignUpModal
            handleOpenLogin={() => setSignInVisible(true)}
            visible={signUpVisible}
            handleClose={closeSignUpModal}
          />
          <ForgetPasswordModal
            visible={forgetPasswordVisible}
            handleOpenConfirmForgetPassword={() =>
              setConfirmForgetPasswordVisible(true)
            }
            handleClose={() => setForgetPasswordVisible(false)}
          />
          <ConfirmForgetPasswordModal
            visible={confirmForgetPasswordVisible}
            handleOpenLogin={() => setSignInVisible(true)}
            handleClose={() => setConfirmForgetPasswordVisible(false)}
          />
        </>
      )}

      <SideMenu
        opened={menuOpened}
        setMenuOpened={setMenuOpened}
        wallet={wallet}
        handelClose={() => setMenuOpened(false)}
        handleOpenSignin={() => setSignInVisible(true)}
        handleCloseSignin={closeSignInModal}
        header_dark_logo={header_dark_logo}
        header_light_logo={header_light_logo}
      />
      <div
        onClick={() => setMenuOpened(false)}
        className={`${menuOpened && "visible"}`}
      />

      <nav
        ref={navRef}
        className={`${styles.nav} ${isFix ? styles.sticky : ""} ff`}
      >
        <Container className={styles.littlePadding}>
          <div>
            <div className={styles.innerWrap}>
              <div className={styles.startNav}>
                <div className={styles.flex}>
                  <button
                    onClick={() => setMenuOpened(true)}
                    className={styles.menuBtn}
                    type="button"
                  >
                    <Menu />
                  </button>
                  {userName === undefined && (
                    <PowerBtn
                      onClick={() => setSignInVisible(true)}
                      withShadow
                      type="default"
                      className={`${styles.signInBtn} tablet-hidden`}
                    >
                      {t("SignIn")}
                    </PowerBtn>
                  )}
                  <button
                    className={`mobile-hidden tablet-hidden ${
                      styles.cartButton
                    } ${locale === "ar" ? styles.ar : ""}`}
                    onClick={() => {
                      window.location.href =
                        (locale === "ar" ? "/ar" : "") + "/cart";
                    }}
                    type="button"
                    id="cartButton"
                  >
                    <Cart />
                    <span className={styles.badge}>{cartLength}</span>
                  </button>
                  <button
                    className={styles.searchBtn}
                    onClick={() => {
                      window.location.href =
                        (locale === "ar" ? "/ar" : "") + "/search";
                    }}
                    type="button"
                  >
                    <Search />
                    <span
                      className="mobile-hidden  tablet-hidden"
                      onClick={() => {
                        window.location.href =
                          (locale === "ar" ? "/ar" : "") + "/search";
                      }}
                    >
                      {t("search")}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.langBtn} mobile-hidden`}
                    onClick={() => {
                      setSelectedLang(locale);
                    }}
                  >
                    <Link
                      href={{
                        pathname: route,
                        query: query,
                      }}
                      locale={otherLocale}
                    >
                      <a>
                        {locale === "en" ? (
                          <>
                            <span
                              className={`${styles.flagIcon} flag-icon-${
                                locale === "ar" ? "gb" : "sa"
                              }`}
                            />
                            العربية
                          </>
                        ) : (
                          <>
                            English
                            <span
                              className={`${styles.flagIcon} flag-icon-${
                                locale === "ar" ? "gb" : "sa"
                              }`}
                            />
                          </>
                        )}
                      </a>
                    </Link>
                  </button>
                  <Link
                    href={{
                      pathname: route,
                      query: query,
                    }}
                    locale={otherLocale}
                    onClick={() => {
                      setSelectedLang(locale);
                    }}

                    // onClick={handleLangClick}
                  >
                    <button className={`${styles.langButton} `}>
                      {" "}
                      {locale === "en" ? "ع" : "E"}
                    </button>
                  </Link>
                  {/* <div
                    className={`${styles.selectWrap} langDropdown tablet-hidden`}
                  > */}
                  {/* {locale === "ar" ? (
                      <Select
                        onSelect={() => setOpened(false)}
                        open={opened}
                        dropdownClassName={`${styles.langDropdown}`}
                        className={styles.langSelect}
                        defaultValue={"ar"}
                      >
                        {languages.map((lang) => (
                          <Option value={lang.code} key={lang.code}>
                            <span
                              className={`${styles.flagIcon} flag-icon-${lang.country_code}`}
                            />
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        onSelect={() => setOpened(false)}
                        open={opened}
                        dropdownClassName={`${styles.langDropdown}`}
                        className={styles.langSelect}
                        defaultValue={"en"}
                      >
                        {languages.map((lang) => (
                          <Option value={lang.code} key={lang.code}>
                            <span
                              className={`${styles.flagIcon} flag-icon-${lang.country_code}`}
                            />
                          </Option>
                        ))}
                      </Select>
                    )} */}
                  {/* <button
                      className={`${styles.selectBtn} ${
                        opened && styles.opened
                      } ${locale === "ar" ? styles.rtl : ""}`}
                      type="button"
                      onClick={() => setOpened((o) => !o)}
                    >
                      <SelectIcon />
                    </button> */}
                  {/* </div> */}
                  {/* {userName && ( */}

                  {/* )} */}
                </div>
              </div>
              <div
                    onClick={() => router.push("/membership")}
                    className={`${styles.membershipWrap} `}
                  >
                    <Image
                      alt={t("PowerCard")}
                      src={`/images/members/${
                        theme !== "light"
                          ? membership === "merchant"
                            ? "Merchant_White.png"
                            : membership === "Platini"
                            ? "Platinum_White.png"
                            : "Classic_White.png"
                          : membership === "merchant"
                          ? "Merchant_Black.png"
                          : membership === "Platini"
                          ? "Platinum_Black.png"
                          : "Classic_Black.png"
                      }`}
                      layout="fill"
                    />
                  </div>
              <div className={styles.endNav}>
                <Link href={locale === "ar" ? "/ar" : "/"} passHref>
                  <a className={`${styles.navLink} tablet-hidden`}>
                    <span>
                      <Home />
                    </span>
                    <span className={styles.navLinkTitle}>{t("home")}</span>
                  </a>
                </Link>
                <Link
                  href={(locale === "ar" ? "/ar" : "") + "/join-our-merchants"}
                  passHref
                >
                  <a
                    className={`${styles.navLink} ${styles.joinMerchants} tablet-hidden`}
                  >
                    <span>
                      <Join />
                    </span>
                    <span className={styles.navLinkTitle}>
                      {t("JoinOurMerchants")}
                    </span>
                  </a>
                </Link>
                <Link href="/" passHref>
                  <a className={styles.navLogo}>
                    {header_light_logo !== undefined &&
                      header_dark_logo !== undefined && (
                        <Image
                          alt={t("PowerCard")}
                          layout="fill"
                          src={
                            theme === "light"
                              ? header_light_logo
                                ? `https://admin.powercard-sa.com${header_light_logo}`
                                : "/images/logo-light-new.png"
                              : header_dark_logo
                              ? `https://admin.powercard-sa.com${header_dark_logo}`
                              : "/images/logo-dark-new.png"
                          }
                        />
                      )}
                  </a>
                </Link>
              </div>
              {/*  */}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
