import styles from "./index.module.scss";

const SectionTitle = ({ children, withShadow = false, align, className }) => (
  <h2
    style={align && { textAlign: align }}
    className={`${className || ""} ${styles.sectionTitle} ${
      withShadow ? styles.withShadow : ""
    }`}
  >
    {children}
  </h2>
);

export default SectionTitle;
