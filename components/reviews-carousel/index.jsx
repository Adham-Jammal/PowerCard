import Slider from "react-slick";
import { Row, Col } from "antd";
import { useTranslations } from "next-intl";
import SectionTitle from "../section-title";
import styles from "./index.module.scss";
import ReviewCard from "./review-card";
import Container from "../layout/container";
import { useState } from "react";
import { useEffect } from "react";
import homeServices from "../../services/home";
import { useRouter } from "next/router";

const ReviewsCarousel = () => {
  const { locale } = useRouter();

  const t = useTranslations("Messages");
  const [data, setData] = useState([]);
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: data.length > 2 ? 3 : 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    responsive: [
      {
        breakpoint: 575.9,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767.9,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991.9,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    let reviews = [];
    async function getData() {
      reviews = await homeServices.getReviews(locale);
    }
    getData().then(() => {
      setData(reviews);
    });
  }, [locale]);
  if (data.length === 0) return <></>;
  return (
    <div className={`${styles.reviewsWrap} `}>
      <Container>
        <SectionTitle className={styles.sectionTitle} align="center">
          <span>
            {t("our_clients_reviews")} <b>{t("our_clients_reviews2")}</b>
          </span>{" "}
        </SectionTitle>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={22}>
            <div className={styles.sliderWrap}>
              <Slider
                {...settings}
                className={`${styles.reviewSlider} reviewSlider`}
              >
                {data.map((item, index) => (
                  <div key={index} className={styles.reviewSlide}>
                    <ReviewCard data={item} />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ReviewsCarousel;
