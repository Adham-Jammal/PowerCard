import { Card, Avatar, Tag, message } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AddToCart, Cart, Gift } from "../../constants/icons";
import S from "./index.module.scss";
import PowerBtn from "../button/index";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart-slice";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
const fallBackImage =
  "data:image/png;base64,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";
const ProductCard = ({
  mobile,
  data: {
    id,
    name_en,
    quantity,
    image,
    source,
    name,
    desc,
    desc_en,
    category,
    avilable,
    productPrice,
    productImageWhiteLabel,
    productImage,
    topTag,
    company,
    productName,
    classic_points,
    platinum_points,
    biller_points,
    classic_price,
    platinum,
    biller_price,
    productId,
    sub_category,
  },
  withTag,
  titleAbbrev,
}) => {
  const t = useTranslations("Messages");
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { locale } = useRouter();
  const membership = useSelector((state) => state.auth.value.membership.name);
  const userId = useSelector((state) => state.auth.value.id);

  const qtyInCart = useSelector((state) => {
    return (
      state.cart.value.filter((i) => i.userId == userId && i.id === +id)[0]
        ?.quantity | 0
    );
  });

  const addItem = (e) => {
    let cart =
      window.innerWidth > 600
        ? document.querySelector("#cartButton")
        : document.querySelector(".bottomCartButton");

    let flyingBtn =
      e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode
        .querySelector(".ant-card-cover")
        .cloneNode();
    flyingBtn.style.background = `url(${
      image
        ? "https://admin.powercard-sa.com" + image
        : productImageWhiteLabel
        ? productImageWhiteLabel.indexOf(".jpg") > -1 ||
          productImageWhiteLabel.indexOf(".png") > -1 ||
          productImageWhiteLabel.indexOf(".jpeg") > -1 ||
          productImageWhiteLabel.indexOf(".webp") > -1
          ? productImageWhiteLabel
          : productImage
        : fallBackImage
    }) no-repeat 100%`;
    flyingBtn.style.backgroundSize = "contain";
    flyingBtn.style.transition = `all ${700 / 1000}s ease, top ${
      (700 + 800) / 1000
    }s ease, left ${700 / 1000}s ease, transform ${700 / 1000}s ease ${
      (700 - 10) / 1000
    }s`;
    flyingBtn.classList.add("flyingBtn");

    document.querySelector("#dd").appendChild(flyingBtn);
    setTimeout(() => {
      flyingBtn.style.top =
        window.innerWidth > 600
          ? `${cart.offsetTop + cart.offsetHeight - 110}px`
          : "90%";
      flyingBtn.style.left =
        window.innerWidth > 600
          ? `${cart.offsetLeft + cart.offsetWidth - 8}px`
          : "22%";
      flyingBtn.style.transform = "scale(0)";
    }, 500);
    setTimeout(() => {
      flyingBtn.remove();
    }, 1500);
  };

  return (
    <Card
      bordered={false}
      hoverable
      className={`${S.withTag} ${S.productCard} ${
        mobile ? S.mobile : ""
      } productCard `}
      cover={
        <Link href={`/card-details/${id}`} passHref>
          <div
            className={S.coverWrapper}
            // style={{
            //   background: `url(${
            //     image
            //       ? "http://167.172.130.0/power-card/public" + image
            //       : productImageWhiteLabel
            //       ? productImageWhiteLabel.indexOf(".jpg") > -1 ||
            //         productImageWhiteLabel.indexOf(".png") > -1 ||
            //         productImageWhiteLabel.indexOf(".jpeg") > -1 ||
            //         productImageWhiteLabel.indexOf(".webp") > -1
            //         ? productImageWhiteLabel
            //         : productImage
            //       : fallBackImage
            //   }) no-repeat 100%`,
            //   backgroundSize: "200%",
            // }}
          >
            <Image
              alt={name || productName}
              layout="fill"
              ref={imageRef}
              src={`${
                image ? "https://admin.powercard-sa.com" + image : fallBackImage
              }`}
              onError={(e) => {
                e.target.src = fallBackImage;
              }}
              className={S.cover}
            />
          </div>
        </Link>
      }
    >
      {avilable === true && quantity > 0 && withTag === true && (
        <Tag className={S.topTag} icon={<Gift />}>
          {`${
            membership === "merchant"
              ? biller_points
              : membership === "Platini"
              ? platinum_points
              : classic_points
          } ${t("points")}`}
        </Tag>
      )}
      {(!avilable || (avilable === true && quantity === 0)) && (
        <Tag className={`${S.topTag} ${S.topTagAvailable}`}>
          {t("NotAvailable")}
        </Tag>
      )}
      <div className={S.cardContent}>
        {titleAbbrev === "buy_and_win_with_power_stars" && (
          <div className={S.tagWrap}>
            <Avatar
              className={S.avatar}
              size={38}
              src={
                company?.logo
                  ? `https://admin.powercard-sa.com${company?.logo}`
                  : fallBackImage
              }
            />
            <span className={S.tagName}>
              {locale === "ar" ? company?.name : company?.name_en}
            </span>
          </div>
        )}

        <div className={`${S.descWrap} ${locale === "ar" ? S.ar : S.en}`}>
          <h3>
            <Link
              passHref
              href={
                productId
                  ? `/external-card-details/${productId}`
                  : `/card-details/${id}`
              }
            >
              <a> {(locale === "ar" ? name : name_en) || productName}</a>
            </Link>
          </h3>
        </div>
        <div className={S.tagButtonWrap}>
          <div className={S.priceWrap}>
            <span className={S.priceCurrencyWrap}>
              <span className={S.price}>
                {membership === "merchant"
                  ? biller_price
                  : membership === "Platini"
                  ? platinum
                  : classic_price}
              </span>
              <span className={S.currency}>{t("sar")}</span>
            </span>
          </div>
          <div>
            {avilable && quantity > 0 && (
              <PowerBtn
                className={S.addToCartBtn}
                type="primary"
                id="addToCart"
                onClick={(e) => {
                  if (qtyInCart + 1 > quantity) {
                    message.warn(t("NotAllowed"));
                  } else {
                    dispatch(
                      addToCart({
                        userId: userId,
                        maxQuantity: quantity,
                        id: id || productId,
                        name: name || productName,
                        name_en: name_en || productName,
                        image: image
                          ? "https://admin.powercard-sa.com" + image
                          : productImageWhiteLabel
                          ? productImageWhiteLabel
                          : fallBackImage,
                        price:
                          membership === "merchant"
                            ? biller_price
                            : membership === "Platini"
                            ? platinum
                            : classic_price,
                        points:
                          membership === "merchant"
                            ? biller_points
                            : membership === "Platini"
                            ? platinum_points
                            : classic_points,
                        companyName: company?.name,
                        companyName_en: company?.name_en,
                        companyLogo: company?.logo
                          ? `https://admin.powercard-sa.com${company?.logo}`
                          : fallBackImage,
                        type: source,
                        categoryId: productName ? 0 : category?.id,
                        subCategoryId: sub_category?.id || undefined,
                      })
                    );
                    addItem(e);
                  }
                }}
              >
                <AddToCart />
              </PowerBtn>
            )}
            {/* ) : avilable === undefined && quantity != 0 ? (
              <PowerBtn
                className={S.addToCartBtn}
                type="primary"
                id="addToCart"
                onClick={(e) => {
                  if (qtyInCart + 1 > quantity) {
                    message.warn(t("NotAllowed"));
                  } else {
                    dispatch(
                      addToCart({
                        maxQuantity: quantity,
                        userId: userId,
                        id: id || productId,
                        name: name || productName,
                        name_en: name_en || productName,
                        image: image
                          ? "http://167.172.130.0/power-card/public" + image
                          : productImageWhiteLabel
                          ? productImageWhiteLabel
                          : fallBackImage,
                        price:
                          membership === "merchant"
                            ? biller_price
                            : membership === "Platini"
                            ? platinum
                            : classic_price,
                        points:
                          membership === "merchant"
                            ? biller_points
                            : membership === "Platini"
                            ? platinum_points
                            : classic_points,
                        companyName: company?.name,
                        companyName_en: company?.name_en,
                        companyLogo: company?.logo
                          ? `http://167.172.130.0/power-card/public${company?.logo}`
                          : fallBackImage,
                        type: source,
                        categoryId: productName ? 0 : category?.id,
                      })
                    );
                    addItem(e);
                  }
                }}
              >
                <AddToCart />
               </PowerBtn>
             ) : null} */}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ProductCard;
