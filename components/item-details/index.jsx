import { Row, Col, Avatar, message } from "antd";
import { useTranslations } from "next-intl";
import Container from "../layout/container";
import Counter from "../counter";
import PowerBtn from "../button";
import styles from "./index.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart-slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const fallBackImage =
  "data:image/png;base64,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";

const ItemDetailsHeader = ({ data }) => {
  const t = useTranslations("Messages");
  const membership = useSelector((state) => state.auth.value.membership.name);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.value.id);
  const cart = useSelector((state) =>
    state.cart.value.filter((i) => i.userId == userId)
  );

  const count = useSelector((state) => {
    return (
      state.cart.value.filter((i) => i.userId == userId && i.id === +data.id)[0]
        ?.quantity | 0
    );
  });
  const [defaultVal, setDefaultVal] = useState(0);
  const { query, locale } = useRouter();
  useEffect(() => {
    if (cart && cart.length > 0) {
      cart.map((c) => {
        if (c.id == +query.id) {
          setDefaultVal(c.quantity);
        }
      });
    }
  });
  return (
    <div className={styles.itemDetailsHeader}>
      <div className="leftBg"> </div>
      <Container>
        <Row gutter={40} className={styles.row}>
          <Col
            className={styles.imageCol}
            xs={19}
            sm={17}
            md={16}
            lg={10}
            xl={9}
          >
            <div className={styles.imageWrap}>
              <div className={styles.linesOuterWrap}>
                <div className={styles.linesWrap}>
                  <div className={styles.imageInnerWrap}>
                    <Image
                      alt="card-img"
                      src={
                        data?.image
                          ? `https://admin.powercard-sa.com${data?.image}`
                          : data?.productImageWhiteLabel
                          ? data?.productImageWhiteLabel
                          : fallBackImage
                      }
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* content  Wrap */}
          <Col
            className={styles.contentCol}
            xs={24}
            sm={24}
            md={24}
            lg={13}
            xl={13}
          >
            <div className={styles.contentWrap}>
              {data?.category && (
                <>
                  <div className={styles.contentHead}>
                    <div className={styles.cardName}>
                      <Avatar
                        className={styles.avatar}
                        src={`https://admin.powercard-sa.com${data?.company?.logo}`}
                      />
                      <div className={styles.nameWrap}>
                        <h4>
                          {" "}
                          {locale === "ar"
                            ? data?.company?.name
                            : data?.company?.name_en}
                        </h4>
                        <span>
                          {locale === "ar"
                            ? data?.category?.name
                            : data?.category?.name_en}
                        </span>
                      </div>
                    </div>
                    <div className={styles.cardPrice}>
                      <span className={styles.priceCurrencyWrap}>
                        <span className={styles.price}>
                          {membership === "merchant"
                            ? data.biller_price
                            : membership === "Platini"
                            ? data.platinum
                            : data.classic_price}
                        </span>
                        <span className={styles.currency}>{t("sar")}</span>
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className={styles.contentBody}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>
                    {data?.name
                      ? locale === "ar"
                        ? data?.name
                        : data?.name_en
                      : data?.productName}
                  </h3>
                  {!data?.category && (
                    <div className={styles.cardPrice}>
                      <span className={styles.priceCurrencyWrap}>
                        <span className={styles.price}>
                          {membership === "merchant"
                            ? data.biller_price
                            : membership === "Platini"
                            ? data.platinum
                            : data.classic_price}
                        </span>
                        <span className={styles.currency}>{t("sar")}</span>
                      </span>
                    </div>
                  )}
                </div>
                <p className="parag">
                  {locale === "ar" ? data?.desc : data?.desc_en}
                </p>
                {data.avilable && data.quantity > 0 && (
                  <div className={styles.cardCounterWrap}>
                    <Counter
                      min={0}
                      defaultVal={defaultVal}
                      setDefaultVal={setDefaultVal}
                      item={data}
                    />
                    <PowerBtn
                      className={styles.addToCartBtn}
                      type="primary"
                      onClick={() => {
                        if (count + 1 > data.quantity) {
                          message.warn(t("NotAllowed"));
                        } else {
                          dispatch(
                            addToCart({
                              userId: userId,
                              maxQuantity: data.quantity,
                              id: data.id || data.productId,
                              name: data.name || data.productName,
                              name_en: data.name_en || data.productName,
                              image: data.image
                                ? "https://admin.powercard-sa.com" + data.image
                                : data.productImageWhiteLabel
                                ? data.productImageWhiteLabel
                                : fallBackImage,
                              price:
                                membership === "merchant"
                                  ? data.biller_price
                                  : membership === "Platini"
                                  ? data.platinum
                                  : data.classic_price,
                              points:
                                membership === "merchant"
                                  ? data.biller_points
                                  : membership === "Platini"
                                  ? data.platinum_points
                                  : data.classic_points,
                              companyName: data.company?.name,
                              companyName_en: data.company?.name_en,
                              companyLogo: data.company?.logo
                                ? `https://admin.powercard-sa.com${data.company?.logo}`
                                : fallBackImage,
                              type: data.source,
                              categoryId: data.productName
                                ? 0
                                : data.category?.id,
                              subCategoryId: data.sub_category?.id || undefined,
                            })
                          );
                        }
                        // document
                        //   .querySelector("#addCart")
                        //   .classList.add("animate");
                      }}
                    >
                      {t("add_to_cart")}
                    </PowerBtn>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemDetailsHeader;
