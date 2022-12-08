import Slider from "react-slick";
import { Row, Col } from "antd";
import { useTranslations } from "next-intl";
import SectionTitle from "../section-title";
import Container from "../layout/container";
import { SlickArrowLeft, SlickArrowRight } from "../carousel-arrow";
import PowerButton from "../button";
import styles from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import itemServices from "../../services/item";

const fallBackImage =
  "data:image/png;base64,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";

const PopularCardsCarousel = ({ mobile, titleAbbrev }) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();
  let settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: locale === "ar" ? <SlickArrowRight /> : <SlickArrowLeft />,
    prevArrow: locale === "ar" ? <SlickArrowLeft /> : <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 600,
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

  let settings2 = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    rtl: true,
    speed: 500,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: locale === "ar" ? <SlickArrowRight /> : <SlickArrowLeft />,
    prevArrow: locale === "ar" ? <SlickArrowLeft /> : <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 600,
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

  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    let mostPopular = [];
    async function getData() {
      mostPopular = await itemServices.getMostPopularProducts(locale);
    }

    getData().then(() => {
      setData(mostPopular);
    });
  }, []);

  if (data.length === 0) return <></>;
  return (
    <div className={`${styles.popCardsWrap} section-padding--large`}>
      <div className={styles.sideLines} />
      <div
        className={styles.mobileBg}
        style={{
          backgroundImage: `url(/images/most-selling/mobile-bg.png)`,
        }}
      >
        {" "}
      </div>
      <Container className={styles.container}>
        <SectionTitle
          withoutMargin
          className={styles.title}
          withShadow={mobile ? false : true}
        >
          {titleAbbrev ? t(titleAbbrev) : t("most_popular_cards")}
        </SectionTitle>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={22} xl={22}>
            <div className={styles.sliderWrap}>
              <Slider {...settings}>
                {data && data.length > 0 ? (
                  mobile ? (
                    sliceIntoChunks(data, data.length / 2)[0].map(
                      (item, index) => (
                        <div
                          key={item.id}
                          className={styles.popCardItem}
                          onClick={() =>
                            (window.location.href =
                              locale === "ar"
                                ? `/ar/card-details/${item.id}`
                                : `/card-details/${item.id}`)
                          }
                        >
                          <div className={styles.cardImageWrap}>
                            <Image
                              alt={item.name}
                              layout="fill"
                              src={`${
                                item.image
                                  ? "https://admin.powercard-sa.com" +
                                    item.image
                                  : fallBackImage
                              }`}
                            />
                          </div>
                          <div className={styles.cardTitle}>
                            <p>{locale === "ar" ? item.name : item.name_en}</p>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    data.map((item, index) => (
                      <div
                        key={item.id}
                        className={styles.popCardItem}
                        onClick={() =>
                          (window.location.href =
                            locale === "ar"
                              ? `/ar/card-details/${item.id}`
                              : `/card-details/${item.id}`)
                        }
                      >
                        <div className={styles.cardImageWrap}>
                          <Image
                            alt={item.name}
                            layout="fill"
                            src={`${
                              item.image
                                ? "https://admin.powercard-sa.com" + item.image
                                : fallBackImage
                            }`}
                          />
                        </div>
                        <div className={styles.cardTitle}>
                          <p>{locale === "ar" ? item.name : item.name_en}</p>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <></>
                )}
              </Slider>
              {mobile && (
                <Slider {...settings2}>
                  {data &&
                    data.length > 0 &&
                    sliceIntoChunks(data, data.length / 2)[1].map(
                      (item, index) => (
                        <div
                          key={item.id}
                          className={styles.popCardItem}
                          onClick={() =>
                            (window.location.href =
                              locale === "ar"
                                ? `/ar/card-details/${item.id}`
                                : `/card-details/${item.id}`)
                          }
                        >
                          <div className={styles.cardImageWrap}>
                            <Image
                              alt={item.name}
                              layout="fill"
                              src={`${
                                item.image
                                  ? "https://admin.powercard-sa.com" +
                                    item.image
                                  : fallBackImage
                              }`}
                            />
                          </div>
                          <div className={styles.cardTitle}>
                            <p>{locale === "ar" ? item.name : item.name_en}</p>
                          </div>
                        </div>
                      )
                    )}
                </Slider>
              )}
            </div>
          </Col>
        </Row>

        <div className={styles.buttonWrap}>
          <PowerButton
            type="default"
            className={styles.moreBtn}
            onClick={() => {
              window.location.href = "/cards?type=popular";
            }}
          >
            {t("browse_entire_egift_catalog")}
          </PowerButton>
        </div>
      </Container>
    </div>
  );
};

export default PopularCardsCarousel;
