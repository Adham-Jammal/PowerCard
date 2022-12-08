import React, { useState, useEffect, useRef } from "react";
import { Switch, Input, Form, Spin } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  RightArrow,
  Close,
  Moon,
  Light,
  Wallet,
  Setting,
  Home,
  Join,
  Search,
  LeftArrow,
} from "../../../constants/icons";
import PowerBtn from "../../button";
import SubCategory from "./sub-category";
import styles from "./index.module.scss";
import { changeTheme } from "../../../features/theme-slice";
import { logOut } from "../../../features/auth-slice";
import categoriesService from "../../../services/categories";

import Image from "next/image";
import { useRouter } from "next/router";

const SideMenu = ({
  opened,
  setMenuOpened,
  handelClose,
  handleOpenSignin,
  wallet,
  header_light_logo,
  header_dark_logo,
}) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value);
  const userName = useSelector((state) => state.auth.value.name);
  const userName_en = useSelector((state) => state.auth.value.name_en);
  const hasWallet = useSelector((state) => state.auth.value.membership.wallet);

  const [categories, setCategories] = useState([]);
  const isDark = theme === "dark";
  const [subMenuData, setSubMenuData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("sa");
  const [subMenuOpened, setSubMenuOpened] = useState(false);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let categoriesResult = [];
    async function getData() {
      categoriesResult = await categoriesService.getCategories(locale);
    }
    getData().then(() => {
      setCategories(categoriesResult);
    });
  }, []);

  // handle category click
  const handleClick = (index) => {
    if (index >= 0) {
      const category = categories[index];
      if (category?.sub_category) {
        setSubMenuData(category);
        setSubMenuOpened(true);
      }
    }
  };

  // handle Country Select
  const handleCountrySelect = (e) => {
    setSelectedCountry(e.currentTarget.id);
  };

  useEffect(() => {
    let root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);
  const sideRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sideRef.current && !sideRef.current.contains(event.target)) {
        setMenuOpened(false);
      } else {
        setMenuOpened(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideRef]);

  const setTheme = () => {
    dispatch(changeTheme(theme === "light" ? "dark" : "light"));
  };
  return (
    <aside
      className={`${styles.sideMenu} ${
        opened ? styles.sideMenuOpened : ""
      } side`}
      ref={sideRef}
    >
      {loading && (
        <div className="loading">
          <Spin size={"large"} />
        </div>
      )}

      <div className={styles.sideMenuWrapper}>
        <SubCategory
          data={subMenuData}
          opened={subMenuOpened}
          handelClose={handelClose}
          toggleSubMenu={setSubMenuOpened}
        />

        <div className={`${styles.innerCont} `}>
          <div className={styles.logoCloseWrap}>
            <button
              className={styles.closeBtn}
              type="button"
              onClick={handelClose}
            >
              <Close />
            </button>
            <div className={styles.logoWrap}>
              <Link href={"/"} passHref>
                <a>
                  {header_light_logo !== undefined &&
                    header_dark_logo !== undefined && (
                      <Image
                        alt="power card"
                        width={212}
                        height={71}
                        src={
                          !isDark
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
          </div>

          {/* user wrap */}
          <div className={styles.userWrap}>
            <div>
              {userName && (
                <p className=" ">{`${t("welcome")} ${
                  locale === "ar" ? userName : userName_en
                }`}</p>
              )}
            </div>
            {userName && hasWallet !== 0 && (
              <div className={styles.balanceWrap}>
                <span className={styles.walletBalance}>
                  <Wallet />
                  {t("wallet_balance")}
                </span>
                <span className={styles.balance}>
                  <span>{wallet}</span>
                  {t("sar")}
                </span>
              </div>
            )}
          </div>

          {/* search wrap */}
          <div className={styles.searchWrap}>
            <Form>
              <Form.Item name="searchVal">
                <Input
                  className={styles.searchInput}
                  placeholder={t("search")}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Form.Item>
              <button
                onClick={() => {
                  Router.push({
                    pathname: "/search",
                    query: { keyword: keyword },
                  });
                }}
                className={styles.searchButton}
                type="button"
              >
                <Search />
              </button>
            </Form>
          </div>
          {/* theme wrap */}
          <div className={`${styles.themeWrap} theme-wrap`}>
            <Switch
              onChange={setTheme}
              checked={theme === "dark"}
              unCheckedChildren={
                <span className={`${styles.lightIcon} lightIcon`}>
                  <Light />
                </span>
              }
              checkedChildren={
                <span className={`${styles.moonIcon} moonIcon `}>
                  <Moon />
                </span>
              }
              defaultChecked
            />
            <span className={`${styles.themeLabel}  `}>
              {theme === "light" ? t("light_theme_on") : t("dark_theme_on")}
            </span>
          </div>
          {/* mobile tabs  */}
          <div className={styles.mobileTabs}>
            <ul>
              <li>
                <Link href="/" passHref>
                  <a className={styles.tabItem}>
                    <span>
                      <Home />
                    </span>
                    <span className="nav-link-title">{t("home")}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/join-our-merchants" passHref>
                  <a className={styles.tabItem}>
                    <span>
                      <Join />
                    </span>
                    <span className="nav-link-title">
                      {t("JoinOurMerchants")}
                    </span>
                  </a>
                </Link>
              </li>
              {/* <li>
                <Collapse
                  className={`${styles.countryCollapse} country-collapse`}
                  bordered={false}
                  expandIconPosition="end"
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <RightArrow rotate={isActive ? 90 : 0} />
                  )}
                >
                  <Collapse.Panel
                    header={
                      <div className={styles.tabItem}>
                        <Position />
                        {t("country")}
                      </div>
                    }
                    key="1"
                  >
                    {countries.map((country) => (
                      <button
                        onClick={handleCountrySelect}
                        id={country?.code?.toLowerCase()}
                        className={`${styles.countryButton} ${
                          country?.code?.toLowerCase() === selectedCountry
                            ? styles.active
                            : ""
                        }`}
                        type="button"
                        key={country.code}
                      >
                        <span
                          className={styles.flagTextWrap}
                          onClick={handleCountrySelect}
                          id={country?.code?.toLowerCase()}
                        >
                          <span
                            className={`flag-icon flag-icon-${country.code.toLowerCase()}`}
                          >
                            {" "}
                          </span>
                          <span className={styles.countryName}>
                            {t(`${country.code.toLowerCase()}`)}
                          </span>
                        </span>
                        {country?.code?.toLowerCase() === selectedCountry && (
                          <Check />
                        )}
                      </button>
                    ))}
                  </Collapse.Panel>
                </Collapse>
              </li> */}
            </ul>
          </div>
          <div className={styles.categoriesWrap} id="cat">
            <h3>{t("shops_by_categories")}</h3>
            <ul>
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <li key={index} onClick={() => handleClick(index)}>
                    <span>
                      {locale === "ar" ? category.name : category.name_en}
                    </span>
                    <span className={styles.arrowSpan}>
                      {category.sub_category &&
                        category.sub_category.length > 0 &&
                        locale === "en" && <RightArrow />}
                      {category.sub_category &&
                        category.sub_category.length > 0 &&
                        locale === "ar" && <LeftArrow />}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.helpSettingsWrap}>
            <h3 className=" ">
              <Setting />
              {t("help_and_settings")}
            </h3>

            <ul className={styles.helpSettingsMenu}>
              {userName && (
                <li>
                  <Link href="/profile" passHref>
                    <a> {t("Profile")}</a>
                  </Link>
                </li>
              )}
              {userName && (
                <li>
                  <Link href="/my-orders" passHref>
                    <a>{t("my_orders")}</a>
                  </Link>
                </li>
              )}
              {userName && (
                <li>
                  <Link href="/coupons" passHref>
                    <a> {t("Coupons")}</a>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/bank-accounts" passHref>
                  <a>{t("bank_account")}</a>
                </Link>
              </li>
              {userName && (
                <li>
                  <Link href="#" passHref>
                    <a onClick={() => dispatch(logOut())}>{t("logout")}</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {!userName && (
            <div className={styles.signInButtonWrap}>
              <PowerBtn
                className={styles.signInBtn}
                onClick={() => {
                  handelClose();
                  handleOpenSignin(true);
                }}
                size="large"
                type="primary"
              >
                {t("SignIn")}
              </PowerBtn>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
