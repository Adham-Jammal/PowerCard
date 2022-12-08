import { Modal } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

const CancelModal = ({ visible, handleClose, onOk }) => {
  const t = useTranslations("Messages");

  return (
    <Modal
      wrapClassName={styles.signModal}
      centered
      destroyOnClose={true}
      visible={visible}
      maskClosable={false}
      footer={false}
    >
      <h2 className={styles.modalTitle}>{t("CancelOrder")}</h2>
      <div className={styles.modalContent}>
        <p>{t("ConfirmCancelOrder")}</p>

        <div className={styles.submitBtnWrap}>
          <button
            className={styles.submitBtn}
            type="primary"
            onClick={onOk}
            htmltype="submit"
          >
            {t("Confirm")}
          </button>
        </div>
        <div className={styles.cancelWrap}>
          <button
            onClick={handleClose}
            type="button"
            className={styles.cancelBtn}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
