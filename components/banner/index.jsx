import { Image, Row, Col } from "antd";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Container from "../layout/container";
import PowerBtn from "../button";
import BannerSlider from "../banner-slider";
import { Contact } from "../../constants/icons";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import homeServices from "../../services/home";
import { numFormatter } from "../../helpers/helpers";

const Banner = () => {
  const isDark = useSelector((state) => state.theme.value) === "dark";

  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const t = useTranslations("Messages");
  const { locale } = useRouter();
  useEffect(() => {
    let dataResult = [],
      statisticsResult = [];
    async function getData() {
      dataResult = await homeServices.getBanner(locale);
      statisticsResult = await homeServices.getStatistics();
    }
    getData().then(() => {
      setData(dataResult);
      setStatistics(statisticsResult);
    });
  }, [locale]);

  const imageMapping = () => {
    if (locale === "ar") {
      if (isDark) {
        return "power-card-arabic-dark.png";
      }
      return "power-card-arabic-light.png";
    }
    if (isDark) {
      return "power-card-dark.png";
    }
    return "power-card-light.png";
  };

  return (
    <div className={`${styles.bannerWrap} section-padding `}>
      <Container className={`container ${styles.container}`}>
        {/* <button type="button" className={styles.contactBtn}>
          <span>
            <Contact />
          </span>
          <span className={styles.chatText}>{t("chat_us")}</span>
        </button> */}

        {isDark && <div className={styles.leftBg} />}
        <Row className={styles.row}>
          {/* left side banner content  */}
          <Col
            className={styles.contentCol}
            xs={24}
            sm={24}
            md={24}
            lg={14}
            xl={13}
          >
            <div className={styles.contentWrap}>
              {/* <Image
                className={styles.powerCardImg}
                preview={false}
                alt={t("power_card")}
                src={`/images/${imageMapping()}`}
              /> */}
              <p className={styles.mainContent}>
                {t("banner_main_content")}

                <br className="tablet-hidden" />
                <br className="tablet-hidden" />
              </p>
              {/* <p className={styles.subMainContent}>
                {t("banner_subMain_content")}
                <br /> <br /> <br />
              </p> */}
              <div className="tablet-hidden">
                <p className={styles.bannerAboutContent}>
                  {t("banner_about_content")}
                </p>
                {/* <div className={styles.bannerBtnsWrap}>
                  <PowerBtn className={styles.button} type="primary">
                    {t("explore_now")}
                  </PowerBtn>
                  <PowerBtn>{t("create")}</PowerBtn>
                </div> */}
                <ul
                  className={`${styles.statisticsWrap} ${
                    locale === "ar" ? styles.ar : ""
                  }`}
                >
                  <li>
                    <span>{numFormatter(statistics.usercount | 0)}</span>
                    <span>{t("user")}</span>
                  </li>
                  <li>
                    <span>{numFormatter(statistics.categoriescount | 0)}</span>
                    <span>{t("category")}</span>
                  </li>
                  <li>
                    <span>{numFormatter(statistics.productcount | 0)}</span>
                    <span>{t("product")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          {/* right side banner content  */}
          <Col
            className={styles.bannerCol}
            xs={20}
            sm={18}
            md={15}
            lg={9}
            xl={{ span: 9 }}
          >
            <div className={styles.sliderWrap}>
              <BannerSlider data={data} />
              {/* <div className={styles.rightBg}>{' '}</div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
