import Slider from "react-slick";
import { Row, Col } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionTitle from "../section-title";
import ProductCard from "../product-card";
import styles from "./index.module.scss";
import { SlickArrowLeft, SlickArrowRight } from "../carousel-arrow";
import { useRouter } from "next/router";

const products = [
  {
    src: "1.png",
    tagSrc: "1.png",
    tag: "App store",
    title: "iTunes & Apple card",
    content: "Buy iTunes Saudi 500 sar and get chance to win iTunes 100 sar",
    price: 400,
  },
  {
    src: "2.png",
    tagSrc: "2.png",
    tag: "Google paly",
    title: "Google play card",
    content: "Buy Google Saudi 500 sar and get chance to win Google 100 sar",
    price: 400,
  },
  {
    src: "3.png",
    tagSrc: "3.png",
    tag: "Game",
    title: "Pubg card",
    content: "Buy Pubg Saudi 500 sar and get chance to win Pubg 100 sar",
    price: 400,
  },
  {
    src: "4.png",
    tagSrc: "4.png",
    tag: "VOD",
    title: "Netflix card",
    content: "Buy Netflix Saudi 500 sar and get chance to win Netflix 100 sar",
    price: 400,
  },
  {
    src: "5.png",
    tagSrc: "5.png",
    tag: "VOD",
    title: "Shahid",
    content: "Buy Shahid Saudi 500 sar and get chance to win Shahid 100 sar",
    price: 400,
  },
  {
    src: "6.png",
    tagSrc: "6.png",
    tag: "Game",
    title: "League Legends",
    content: "Buy League Saudi 500 sar and get chance to win League 100 sar",
    price: 400,
  },
  {
    src: "4.png",
    tagSrc: "4.png",
    tag: "VOD",
    title: "Netflix card",
    content: "Buy Netflix Saudi 500 sar and get chance to win Netflix 100 sar",
    price: 400,
  },
  {
    src: "5.png",
    tagSrc: "5.png",
    tag: "VOD",
    title: "Shahid",
    content: "Buy Shahid Saudi 500 sar and get chance to win Shahid 100 sar",
    price: 400,
  },
  {
    src: "6.png",
    tagSrc: "6.png",
    tag: "Game",
    title: "League Legends",
    content: "Buy League Saudi 500 sar and get chance to win League 100 sar",
    price: 400,
  },
];

const settingsMobile = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  rows: 4,
  autoplay: false,
};
const settingsMobileWithTag = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  centerMode: true,
};

const ProductCardsCarousel = ({
  withTag = false,
  itemsData = products,
  titleAbbrev,
}) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    rows: 1,
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
        breakpoint: 460,
        settings: !withTag
          ? {
              ...settingsMobile,
            }
          : {
              ...settingsMobileWithTag,
              centerPadding: "30px",
            },
      },
      {
        breakpoint: 576,
        settings: !withTag
          ? {
              ...settingsMobile,
            }
          : {
              ...settingsMobileWithTag,
              centerPadding: "100px",
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
  return (
    <div className={styles.productCarouselWrap}>
      <SectionTitle className="section-title">
        {t(titleAbbrev)}
        {/* {!withTag && (
          <Link href="#" passHref>
            <a className="link"> {t("view_all_products")}</a>
          </Link>
        )} */}
      </SectionTitle>
      <Row align="center">
        <Col xs={24} sm={24} md={24} lg={24} xl={22}>
          <div className={`${withTag ? styles.carouselWithTag : ""}`}>
            <Slider {...settings}>
              {itemsData.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.prodCardItem} ${
                    withTag ? styles.withTag : ""
                  }`}
                >
                  <ProductCard data={item} />
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCardsCarousel;
