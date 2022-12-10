import Slider from "react-slick";
import Image from "next/image";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const BannerSlider = ({ data }) => {
  // const myLoader = ({ src }) => {
  //   return `https://admin.powercard-sa.com/${src}`
  // }
  const { locale } = useRouter();

  const isRtl = locale === "ar";

  let settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    rtl: isRtl,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => <span className="ft-slick__dots--custom"> </span>,
  };
  return (
    <div className={`${styles.sliderWrap} sublines sublines2`}>
      <Slider
        className={`${styles.bannerCarousel} bannerCarousel lines`}
        {...settings}
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div key={index}>
              <div className={styles.imageWarper}>
                <Image
                  // loader={myLoader}
                  alt="banner"
                  className={styles.img}
                  src={`https://admin.powercard-sa.com${item.image}`}
                  layout="fill"
                />
                {/* <div className={styles.imageCut}>
                  <img alt="d" src={`/images/banner-slider/image-cut.svg`} />
                </div> */}
              </div>
              <div className={styles.slideContent}>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
      </Slider>
      <div className={styles.bgGradient} />
    </div>
  );
};

export default BannerSlider;
