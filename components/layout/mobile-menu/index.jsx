import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./index.module.scss";
import {
  Category,
  Home,
  Cart,
  Orders,
  StarPoint,
} from "../../../constants/icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "antd";
import styles2 from "../../signin-modal/index.module.scss";

const MobileMenu = ({ setMenuOpened, points, menuOpened }) => {
  const userName = useSelector((state) => state.auth.value.name);
  const hasWallet = useSelector((state) => state.auth.value.membership.wallet);
  const userId = useSelector((state) => state.auth.value.id);

  const cartLength = useSelector((state) => {
    return state.cart.value
      .filter((i) => i.userId == userId)
      .reduce((partialSum, a) => partialSum + a.quantity, 0);
  });
  const { locale, pathname } = useRouter();

  const [pointsModal, setPointsModal] = useState(false);

  const t = useTranslations("Messages");
  return (
    <div className={styles.MobileMenu}>
      <ul className={styles.iconsWrap}>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link href={"/"} passHref title={t("home")}>
            <a>
              {" "}
              <Home />
              <span>{t("home")}</span>
            </a>
          </Link>
        </li>
        <li
          className={menuOpened ? styles.active : ""}
          onClick={() => {
            setMenuOpened(true);
            setTimeout(() => {
              // document.querySelector(".side").scrollTop = 2500;
              window.location.href = "#cat";
            }, 0);
          }}
        >
          <Link href={"#"} title={t("category")}>
            <a>
              {" "}
              <Category />
              <span>{t("category")}</span>
            </a>
          </Link>
        </li>
        <li className={pathname === "/cart" ? styles.active : ""}>
          <Link href={"/cart"} passHref title={t("cart")}>
            <a
              className={`bottomCartButton ${styles.cartButton} ${
                locale === "ar" ? styles.ar : ""
              }`}
            >
              <Cart />
              <span className={styles.badge}>{cartLength}</span>
              <span>{t("cart")}</span>
            </a>
          </Link>
        </li>
        {userName && (
          <li className={pathname === "/my-orders" ? styles.active : ""}>
            <Link href={"/my-orders"} passHref title={t("orders")}>
              <a>
                <Orders />
                <span>{t("orders")}</span>
              </a>
            </Link>
          </li>
        )}
        {userName && hasWallet !== 0 && (
          <li
            className={pointsModal ? styles.active : ""}
            onClick={() => {
              setPointsModal(true);
            }}
          >
            <Link href={"#"} title={t("power_star_points")}>
              <a>
                {" "}
                <StarPoint />
                <span>{t("power_star_points")}</span>
              </a>
            </Link>
          </li>
        )}
      </ul>
      <PointsModal
        visible={pointsModal}
        points={points}
        handleClose={() => {
          setPointsModal(false);
        }}
      />
    </div>
  );
};

const PointsModal = ({ visible, handleClose, points }) => {
  const t = useTranslations("Messages");

  return (
    <Modal
      wrapClassName={styles2.signModal}
      centered
      visible={visible}
      onOk={handleClose}
      maskClosable={false}
      onCancel={handleClose}
      footer={false}
    >
      <h2 className={styles2.modalTitle}>{t("power_star_points")}</h2>
      <div className={styles2.modalContent}>
        <div className={styles.body}>{points}</div>
        <div className={styles2.cancelWrap}>
          <button
            onClick={handleClose}
            type="button"
            className={styles2.cancelBtn}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;
