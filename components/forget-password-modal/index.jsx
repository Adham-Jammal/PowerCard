import { Modal, Form, Input, Checkbox } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import authServices from "../../services/auth";
// import { setCurrentUser } from "../../features/auth-slice";
// import { useDispatch } from "react-redux";

const ForgetPasswordModal = ({
  visible,
  handleClose,
  handleOpenConfirmForgetPassword,
}) => {
  const t = useTranslations("Messages");
  // const dispatch = useDispatch();

  const onFinish = async (values) => {
    await authServices.forgetPassword(values);
    handleSignupClick();
  };

  const handleSignupClick = () => {
    handleClose();
    handleOpenConfirmForgetPassword();
  };
  return (
    <Modal
      wrapClassName={styles.signModal}
      centered
      visible={visible}
      onOk={handleClose}
      maskClosable={false}
      onCancel={handleClose}
      footer={false}
    >
      <h2 className={styles.modalTitle}>{t("ForgetPassword")}</h2>
      <div className={styles.modalContent}>
        <Form
          initialValues={{ email: "" }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={t("Email")}
            name="email"
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
              {
                type: "email",
                message: t("please_enter_valid_email"),
              },
            ]}
          >
            <Input
              autoComplete="off"
              type="email"
              placeholder={t("enter_an_email")}
            />
          </Form.Item>

          <div className={styles.submitBtnWrap}>
            <button
              className={styles.submitBtn}
              type="primary"
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
            <p className={styles.signInLink}>
              {t("AlreadyHaveACode")}
              {"  "}
              <span onClick={handleSignupClick}>{t("SetPasswordNow")}</span>
            </p>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ForgetPasswordModal;
