import { Avatar, Card } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
const Coupon = ({ data }) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();

  return (
    <div>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <Card
            key={item}
            className={`${styles.orderSummaryCard} orderSummaryCard`}
            title={
              <div className={styles.cardTitle}>
                <div className={styles.cardPrefix}>
                  {`${t("couponCode")}:`} <span>{item.code}</span>
                </div>
                <h4 className={styles.priceWrap}>
                  <span className={styles.priceCurrencyWrap}>
                    <span className={styles.price}>{item.discount_amount}</span>
                    <span className={styles.currency}>
                      {item.discount_type === "percent" ? "%" : t("sar")}
                    </span>
                  </span>
                </h4>
              </div>
            }
            bordered={false}
          >
            <div className={styles.cardFooter}>
              {item.Company ? (
                <span className={styles.paymentMethod}>
                  <span>
                    {item.Company.map((item, i) => (
                      <span key={i}>
                        <Avatar
                          className={styles.avatar}
                          src={`https://admin.powercard-sa.com${item.logo}`}
                        />
                        &nbsp;
                        {locale === "ar" ? item.name : item.name_en} &nbsp;
                      </span>
                    ))}
                  </span>
                </span>
              ) : item.Sub_Category ? (
                <span className={styles.paymentMethod}>
                  <span>
                    {item.Sub_Category.map((item, i) => (
                      <span key={i}>
                        {locale === "ar" ? item.name : item.name_en} &nbsp;
                      </span>
                    ))}
                  </span>
                </span>
              ) : (
                <span className={styles.paymentMethod}>
                  <span>
                    {item.Product !== "all" ? (
                      item.Product.map((item, i) => (
                        <span key={i}>
                          <Avatar
                            className={styles.avatar}
                            src={`https://admin.powercard-sa.com${item.image}`}
                          />{" "}
                          &nbsp;
                          {locale === "ar" ? item.name : item.name_en} &nbsp;
                        </span>
                      ))
                    ) : (
                      <>{t("CouponAll")}</>
                    )}
                  </span>
                </span>
              )}
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Coupon;
