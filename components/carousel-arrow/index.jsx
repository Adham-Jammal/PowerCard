import { NextArrow, PrevArrow } from "../../constants/icons";
import styles from "./index.module.scss";

const SliderArrow = ({
  arrowType = "prev",
  className,
  children,
  otherProps,
  onClick,
}) => (
  <button
    className={`${styles.sliderArrow} ${className}`}
    onClick={onClick}
    type="button"
    {...otherProps}
  >
    {arrowType === "prev" ? <PrevArrow /> : <NextArrow />}
    {children}
  </button>
);
const SlickArrowLeft = ({ className, currentSlide, ...props }) => (
  <SliderArrow className={className} {...props} arrowType="prev" />
);
const SlickArrowRight = ({ className, currentSlide, ...props }) => (
  <SliderArrow className={className} {...props} arrowType="next" />
);
export { SlickArrowLeft, SlickArrowRight };
