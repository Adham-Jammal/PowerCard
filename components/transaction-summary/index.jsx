import { Card } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import PowerBtn from "../button";
import RechargeBalanceModal from "../recharge-balance-modal";
import { useState } from "react";

const TransactionSummary = ({ currentBalance, currentPoints, hasWallet }) => {
  const t = useTranslations("Messages");

  const [rechargeModalVisible, setRechargeModalVisible] = useState(false);

  return (
    <div>
      <Card
        className={`${styles.orderSummaryCard} orderSummaryCard`}
        title={
          <>
            <span>{`${t("CurrentBalance")}: `}</span>
            <br />
            <span className={styles.price}>
              {currentBalance} {t("sar")}
            </span>
            <br />
            <br />
            <span>{`${t("CurrentPoints")}: `}</span>
            <br />
            <span className={styles.price}>{currentPoints}</span>
          </>
        }
        bordered={false}
      >
        {hasWallet !== 0 && (
          <>
            <div className={styles.orderSummary}>
              <div className={styles.checkoutBtnWrap}>
                <PowerBtn
                  type="primary"
                  className={styles.repeat}
                  onClick={() => setRechargeModalVisible(true)}
                >
                  {t("RechargeTheBalance")}
                </PowerBtn>
              </div>
            </div>
            <RechargeBalanceModal
              handleClose={() => setRechargeModalVisible(false)}
              visible={rechargeModalVisible}
            />
          </>
        )}
      </Card>
    </div>
  );

  return <></>;
};

export default TransactionSummary;
