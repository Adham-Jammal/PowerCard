import { Card, Avatar, Tag } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Gift } from "../../constants/icons";
import S from "./index.module.scss";
import PowerBtn from "../button/index";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart-slice";
import Image from "next/image";
const fallBackImage =
  "data:image/png;base64,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";
const ProductCard = ({
  data: {
    id,
    name_en,
    image,
    name,
    desc,
    source,
    desc_en,
    category,
    available,
    productPrice,
    productImageWhiteLabel,
    classic_price,
    topTag,
    company,
    productName,
    classic_points,
    productId,
    sub_category,
  },
  withTag,
}) => {
  const t = useTranslations("Messages");
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const userId = useSelector((state) => state.auth.value.id);

  return (
    <Card
      bordered={false}
      hoverable
      className={`${S.withTag} ${S.productCard} productCard `}
      cover={
        <Link
          href={
            productId
              ? `/external-card-details/${productId}`
              : `/card-details/${id}`
          }
          passHref
        >
          <div className={S.coverWrapper}>
            <Image
              alt={name || productName}
              layout="fill"
              src={`${
                image
                  ? "https://admin.powercard-sa.com" + image
                  : productImageWhiteLabel
                  ? productImageWhiteLabel
                  : fallBackImage
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
      {available !== undefined && !available && (
        <Tag className={`${S.topTag} ${S.topTagAvailable}`}>
          {t("NotAvailable")}
        </Tag>
      )}
      {withTag === true && classic_points !== undefined && (
        <Tag className={S.topTag} icon={<Gift />}>
          {`${classic_points} ${t("points")}`}
        </Tag>
      )}

      <div className={S.cardContent}>
        <div className={S.tagButtonWrap}>
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
          {available !== undefined && available === true ? (
            <PowerBtn
              className={S.addToCartBtn}
              type="primary"
              disabled={available !== undefined ? !available : false}
              onClick={() => {
                dispatch(
                  addToCart({
                    userId: userId,
                    id: id || productId,
                    name: name || productName,
                    name_en: name_en || productName,
                    image: image
                      ? "https://admin.powercard-sa.com" + image
                      : productImageWhiteLabel
                      ? productImageWhiteLabel
                      : fallBackImage,
                    price: classic_price || productPrice,
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
              }}
            >
              {t("add_to_cart")}
            </PowerBtn>
          ) : available === undefined ? (
            <PowerBtn
              className={S.addToCartBtn}
              type="primary"
              disabled={available !== undefined ? !available : false}
              onClick={() => {
                dispatch(
                  addToCart({
                    userId: userId,
                    id: id || productId,
                    name: name || productName,
                    name_en: name_en || productName,
                    image: image
                      ? "https://admin.powercard-sa.com" + image
                      : productImageWhiteLabel
                      ? productImageWhiteLabel
                      : fallBackImage,
                    price: classic_price || productPrice,
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
              }}
            >
              {t("add_to_cart")}
            </PowerBtn>
          ) : null}
        </div>
        <div className={`${S.descWrap} ${locale === "ar" ? S.ar : S.en}`}>
          <h3>
            <Link passHref href={"/card-details"}>
              <a> {(locale === "ar" ? name : name_en) || productName}</a>
            </Link>
          </h3>
          <p>{locale === "ar" ? desc : desc_en}</p>
          <div className={S.priceWrap}>
            <span className={S.label}>{t("price")}</span>
            <span className={S.priceCurrencyWrap}>
              <span className={S.price}>{classic_price || productPrice}</span>
              <span className={S.currency}>{t("sar")}</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ProductCard;
