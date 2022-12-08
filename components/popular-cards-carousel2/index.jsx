import Slider from "react-slick";
import { Row, Col } from "antd";
import { useTranslations } from "next-intl";
import SectionTitle from "../section-title";
import Container from "../layout/container";
import { SlickArrowLeft, SlickArrowRight } from "../carousel-arrow";
import styles from "./index.module.scss";
import ProductCard from "../product-card";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import itemServices from "../../services/item";
import Link from "next/link";

const PopularCardsCarousel2 = ({ mobile, titleAbbrev, withTag }) => {
  const t = useTranslations("Messages");
  const [itemsData, setItemsData] = useState([]);
  const { locale } = useRouter();
  let settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    speed: 500,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: locale === "ar" ? <SlickArrowRight /> : <SlickArrowLeft />,
    prevArrow: locale === "ar" ? <SlickArrowLeft /> : <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 576,
        settings: {
          rows: 1,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          // easing: 'linear',
          // cssEase: 'linear',
          // speed: 4000,
          pauseOnHover: false,
          centerMode: true,
          swipeToSlide: true,
          draggable: true,
        },
      },
    ],
  };

  let mobileSettings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 1,
    arrows: false,
  };

  useEffect(() => {
    let buyAndWinsProducts = [];
    async function getData() {
      buyAndWinsProducts = await itemServices.getBuyAndWinsProducts(locale);
    }

    let appleCards = [];
    async function getData2() {
      appleCards = await itemServices.getItemsByCategory(1, locale);
    }
    let pubgCards = [];
    async function getData3() {
      pubgCards = await itemServices.getItemsByCategory(2, locale);
    }

    if (titleAbbrev === "buy_and_win_with_power_stars") {
      getData().then(() => {
        setItemsData(buyAndWinsProducts);
      });
    } else if (titleAbbrev === "apple_cards") {
      getData2().then(() => {
        setItemsData(mobile ? appleCards.slice(0, 4) : appleCards);
      });
    } else if (titleAbbrev === "pubg_cards") {
      getData3().then(() => {
        setItemsData(pubgCards.slice(0, 4));
      });
    }
  }, [locale]);
  if (itemsData.length === 0) {
    return <></>;
  }

  return (
    <div className={`${styles.popCardsWrap} section-padding--large`}>
      <Container className={styles.container}>
        <SectionTitle
          withoutMargin
          className={styles.title}
          withShadow={!mobile ? true : false}
        >
          <div className={styles.flex}>
            {titleAbbrev ? t(titleAbbrev) : t("most_popular_cards")}
            {titleAbbrev === "apple_cards" && mobile ? (
              <Link href={`/category/1`} passHref>
                <a className={styles.more}>{t("view_all_products")}</a>
              </Link>
            ) : titleAbbrev === "pubg_cards" && mobile ? (
              <Link href={`/category/2`} passHref>
                <a className={styles.more}>{t("view_all_products")}</a>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </SectionTitle>
      </Container>
      <Row align="center">
        {mobile && titleAbbrev !== "buy_and_win_with_power_stars" ? (
          itemsData &&
          itemsData.length > 0 &&
          itemsData.map((product, index) => (
            <Col
              key={index}
              // xs={12}
              sm={12}
              md={12}
              lg={22}
              xl={22}
              className={styles.col}
            >
              {" "}
              <div key={index} className={styles.popCardItem}>
                <ProductCard
                  titleAbbrev={titleAbbrev}
                  withTag={withTag}
                  data={product}
                />
              </div>
            </Col>
          ))
        ) : (
          <Col xs={24} sm={24} md={24} lg={22} xl={22}>
            <div className={styles.sliderWrap}>
              {mobile ? (
                <Slider {...mobileSettings}>
                  {itemsData &&
                    itemsData.length > 0 &&
                    itemsData.map((product, index) => (
                      <div key={index} className={styles.popCardItem}>
                        <ProductCard
                          mobile={true}
                          titleAbbrev={titleAbbrev}
                          withTag={withTag}
                          data={product}
                        />
                      </div>
                    ))}
                </Slider>
              ) : (
                <Slider {...settings}>
                  {itemsData &&
                    itemsData.length > 0 &&
                    itemsData.map((product, index) => (
                      <div key={index} className={styles.popCardItem}>
                        <ProductCard
                          titleAbbrev={titleAbbrev}
                          withTag={withTag}
                          data={product}
                        />
                      </div>
                    ))}
                </Slider>
              )}{" "}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default PopularCardsCarousel2;
