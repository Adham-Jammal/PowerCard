import { Card, Result } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
const Transactions = ({ data }) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();

  return (
    <div>
      {data && data.length > 0 ? (
        data?.map((item) => (
          <Card
            key={item.id}
            className={`${styles.orderSummaryCard} orderSummaryCard`}
            title={
              <div className={styles.cardTitle}>
                <div className={styles.cardPrefix}>
                  {`${t("orderNumber")}:`} <span>{"#" + item.id}</span>
                </div>
                <h4 className={styles.priceWrap}>
                  <span className={styles.priceCurrencyWrap}>
                    <span className={styles.price}>{item.amount}</span>
                    <span className={styles.currency}>{t("sar")}</span>
                  </span>
                </h4>
              </div>
            }
            bordered={false}
          >
            <div className={styles.cardFooter}>
              <span className={styles.date}>
                {item.created_at
                  ? moment(item.created_at).format("DD/MM/YYYY")
                  : ""}
              </span>
              |
              <span
                className={`${styles.status} ${
                  item.type === "put" ? styles.pending : styles.paid
                }`}
              >
                {item.type ? t(item.type) : ""}
              </span>
              {/* <span className={styles.paymentMethod}>
              <span className={styles.imgWrap}>
                <Image
                  className={styles.img}
                  src={"/images/payments/2.svg"}
                  alt="ss"
                  layout="fill"
                />
              </span>
              STC Pay
            </span> */}
            </div>
          </Card>
        ))
      ) : (
        <Result status="404" title={t("WalletEmpty")} />
      )}
    </div>
  );
};

export default Transactions;
