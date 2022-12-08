import styles from "./index.module.scss";

const HeadBox = ({ text = "", className = "" }) => (
  <div className={`${styles.headBox} ${className}`}>
    <h2>{text}</h2>
  </div>
);

export default HeadBox;
