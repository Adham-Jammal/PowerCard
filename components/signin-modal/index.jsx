import { Modal, Form, Input, Checkbox, message } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import authServices from "../../services/auth";
import walletService from "../../services/wallet";
import { setCurrentUser } from "../../features/auth-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const VerificationModal = ({ visible, handleClose }) => {
  const t = useTranslations("Messages");

  const onFinish = async (values) => {
    values.login_url = window.location.href + "?verified=true";
    await authServices.verifyAccount(values);
    message.success(t("GoToYourMail"), 10);
    handleClose();
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
      <h2 className={styles.modalTitle}>{t("VerifyAccount")}</h2>
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
          </div>
        </Form>
      </div>
    </Modal>
  );
};

const SignInModal = ({
  visible,
  handleClose,
  handleOpenForgetPassword,
  handleOpenSignup,
  setWallet,
  setPoints,
}) => {
  const t = useTranslations("Messages");
  const dispatch = useDispatch();
  const [verificationModal, setVerificationModal] = useState(false);
  const onFinish = async (values) => {
    let result = await authServices.signIn(values);
    dispatch(setCurrentUser(result));
    let walletResult = await walletService.getWallet();
    setWallet(+walletResult?.data?.total | 0);
    setPoints(+walletResult?.data?.point | 0);

    handleClose();
  };

  const handleVerificationClick = () => {
    // handleClose();
    setVerificationModal(true);
  };
  const handleSignupClick = () => {
    handleClose();
    handleOpenSignup();
  };
  return (
    <>
      <VerificationModal
        visible={verificationModal}
        handleClose={() => setVerificationModal(false)}
      />
      <Modal
        wrapClassName={styles.signModal}
        centered
        visible={visible}
        onOk={handleClose}
        maskClosable={false}
        onCancel={handleClose}
        footer={false}
      >
        <h2 className={styles.modalTitle}>{t("SignIn")}</h2>
        <div className={styles.modalContent}>
          <Form
            initialValues={{ remember: false, email: "", password: "" }}
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

            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("please_fill_this_field"),
                },
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                placeholder={t("password")}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div className={styles.rememberForgetWrap}>
                <Checkbox>{t("remember_me")}</Checkbox>
                <button
                  className={styles.forgetBtn}
                  onClick={() => handleOpenForgetPassword()}
                  type="button"
                >
                  {t("forget_password")}
                </button>
              </div>
            </Form.Item>

            <div className={styles.submitBtnWrap}>
              <button
                className={styles.submitBtn}
                type="primary"
                htmltype="submit"
              >
                {t("SignIn")}
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
            <p className={styles.signInLink}>
              {t("dont_verify_an_account")}
              {"  "}
              <span onClick={handleVerificationClick}>{t("verfiy_now")}</span>
            </p>
            <p className={styles.signInLink}>
              {t("dont_have_an_account")}
              {"  "}
              <span onClick={handleSignupClick}>{t("sign_up_now")}</span>
            </p>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SignInModal;
