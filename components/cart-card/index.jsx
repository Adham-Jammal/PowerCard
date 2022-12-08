import { Avatar } from "antd";
import { useTranslations } from "next-intl";
import { Delete } from "../../constants/icons";
import Counter from "../counter";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../features/cart-slice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CartCard = ({ item }) => {
  const t = useTranslations("Messages");
  const dispatch = useDispatch();
  const { locale } = useRouter();

  return (
    <div className={styles.cartCard}>
      <div className={styles.innerCard}>
        <div className={styles.imageWrap}>
          <Image alt="cart-item-img" src={item.image} layout="fill" />
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.startContentSide}>
            <h4
            // onClick={() => {
            //   let type =
            //     item.type === "ours"
            //       ? "/card-details/"
            //       : "/external-card-details/";
            //   let lang = locale === "ar" ? "/ar" : "";
            //   window.location.href = lang + type + item.id;
            // }}
            >
              {locale === "ar" ? item.name : item.name_en}
            </h4>
            <div className={styles.avatarTextWrap}>
              {/* <Avatar size={25} src={item.companyLogo} />
              <span className={styles.avatarText}>
                {locale === "ar" ? item.companyName : item.companyName_en}
              </span> */}
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                dispatch(removeFromCart(item));
              }}
              type="button"
            >
              <Delete />
              <span>{t("deleteFromCart")}</span>
            </button>
          </div>
          <div className={styles.endContentSide}>
            <Counter
              min={1}
              defaultVal={item.quantity}
              setDefaultVal={(i) => {}}
              item={item}
              from="cart"
            />
            <h4 className={styles.price}>
              {item.price} <span>{t("sar")}</span>
            </h4>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};
export default CartCard;
