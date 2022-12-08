import { Button } from "antd";
import styles from "./index.module.scss";

const PowerBtn = ({
  children,
  type = "default",
  withShadow = false,
  onClick,
  className,
  disabled,
  ...otherProps
}) => (
  <Button
    type={type}
    disabled={disabled}
    onClick={onClick ? onClick : () => {}}
    {...otherProps}
    className={`${styles.powerBtn} ${className} ${
      withShadow ? styles.withShadow : ""
    }  ${
      type === "primary"
        ? styles.primary
        : type === "reverse"
        ? styles.reverse
        : styles.default
    }`}
  >
    {children}
  </Button>
);

export default PowerBtn;
