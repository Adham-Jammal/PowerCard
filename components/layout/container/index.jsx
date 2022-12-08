import styles from "./index.module.scss";

const Container = ({ children, fluid, className, ...otherProps }) => (
  <div
    {...otherProps}
    className={`${
      fluid ? styles.containerFluid : styles.container
    } ${className}`}
  >
    {children}
  </div>
);

export default Container;
