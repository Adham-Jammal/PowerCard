import { Modal, Form, Input, Checkbox, message } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

const ConfirmationModal = ({ visible, handleClose, msg, onOK }) => {
  const t = useTranslations("Messages");

  return (
    <>
      <Modal
        wrapClassName={styles.signModal}
        centered
        visible={visible}
        onOk={onOK}
        maskClosable={false}
        onCancel={handleClose}
        footer={false}
      >
        <h2 className={styles.modalTitle}>{t("ConfirmationMsg")}</h2>
        <div className={styles.modalContent}>
          <p>{msg}</p>
          <div className={styles.submitBtnWrap}>
            <button
              className={styles.submitBtn}
              type="primary"
              htmltype="submit"
              onClick={onOK}
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
    </>
  );
};

export default ConfirmationModal;
