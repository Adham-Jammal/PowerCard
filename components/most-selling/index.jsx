import Slider from "react-slick";
import { Row, Col } from "antd";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import SectionTitle from "../section-title";
import Container from "../layout/container";
import ProductCardWrap from "./product-card-wrap";
import { SlickArrowLeft, SlickArrowRight } from "../carousel-arrow";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import itemServices from "../../services/item";
import Link from "next/link";

const MostSelling = ({ mobile }) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();

  const [data, setData] = useState([]);
  useEffect(() => {
    let mostSelling = [];
    async function getData() {
      mostSelling = await itemServices.getMostSellingProducts(locale);
    }

    getData().then(() => {
      setData(mostSelling.slice(0, 5));
    });
  }, []);
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 600px)",
  });
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    rows: data.length > 3 ? 2 : 1,
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
          slidesToShow: 2,
          arrows: true,
          slidesToScroll: 2,
          rows: 3,
        },
      },
    ],
  };

  if (data.length === 0) return <></>;

  return (
    <div className={styles.wrapper}>
      {" "}
      <h3 className={styles.backWord}>{t("products")}</h3>
      <div
        className={`${styles.mostSellingWrap} section-padding--large mostSellingWrap`}
      >
        <Container className={styles.container}>
          <SectionTitle className={`${styles.sectionTitle} section-title`}>
            <div className={styles.flex}>
              {t("most_selling_products")}
              {mobile ? (
                <Link href={`#`} passHref>
                  <a className={styles.more}>{t("view_all_products")}</a>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </SectionTitle>
          <Row align="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={22}>
              <div className={styles.sliderWrap}>
                <Slider {...settings}>
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                      return (
                        <div key={index} className={styles.prodCardItem}>
                          <ProductCardWrap products={[item]} />
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={styles.sideLines}>
          {/* <img alt={t('side_lines')} src={`${process.env.PUBLIC_URL}/assets/images/cards/side-lines.svg`} /> */}
        </div>
      </div>
    </div>
  );
};
export default MostSelling;
