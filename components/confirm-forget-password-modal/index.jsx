import { Modal, Form, Input, Checkbox, Progress } from "antd";
import { useTranslations } from "next-intl";
import styles from "../signin-modal/index.module.scss";
import newStyles from "./index.module.scss";
import authServices from "../../services/auth";
import { useEffect, useState } from "react";
import { Check } from "../../constants/icons";
// import { setCurrentUser } from "../../features/auth-slice";
// import { useDispatch } from "react-redux";

const ConfirmForgetPasswordModal = ({
  visible,
  handleClose,
  handleOpenLogin,
}) => {
  const t = useTranslations("Messages");
  // const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [validCharacters, setValidCharacters] = useState(false);
  const [validNumSymbol, setValidNumSymbol] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await authServices.confirmForgetPassword(values);
    handleSignupClick();
  };

  const handleSignupClick = () => {
    handleClose();
    // handleOpenLogin();
  };

  const confirmPasswordValidation = () => {
    const password = form.getFieldValue("password");
    return {
      validator(_, value) {
        if (value !== password && value !== "" && value !== undefined) {
          return Promise.reject(
            t("your_password_and_confirmation_password_do_not_match")
          );
        }
        return Promise.resolve();
      },
    };
  };
  const changeProgress = () => {
    const validCharPercent = validCharacters ? 50 : 0;
    const validNumSymbolPercent = validNumSymbol ? 50 : 0;
    setProgress(validCharPercent + validNumSymbolPercent);
  };

  useEffect(() => {
    changeProgress();
  }, [validNumSymbol, validCharacters]);

  const handlePasswordChange = (e) => {
    const { target } = e;
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    target.value.length >= 8
      ? setValidCharacters(true)
      : setValidCharacters(false);
    pattern.test(target.value)
      ? setValidNumSymbol(true)
      : setValidNumSymbol(false);
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
      <h2 className={styles.modalTitle}>{t("ConfirmNewPassword")}</h2>
      <div className={styles.modalContent}>
        <Form
          initialValues={{ email: "" }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
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
            label={t("Code")}
            name="code"
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
            ]}
          >
            <Input autoComplete="off" placeholder={t("enter_a_code")} />
          </Form.Item>
          <Form.Item
            label={t("password")}
            name="password"
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
              {
                min: 8,
                message: t("the_password_must_contain_at_least_8_characters"),
              },
              {
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                message: t(
                  "the_password_must_contain_at_least_number_and_symbol"
                ),
              },
            ]}
          >
            <Input.Password
              onChange={handlePasswordChange}
              autoComplete="new-password"
              placeholder={t("password")}
            />
          </Form.Item>
          <Form.Item
            label={t("confirm_password")}
            name="confirmPassword"
            rules={[confirmPasswordValidation]}
          >
            <Input.Password
              autoComplete="off"
              placeholder={t("confirm_password")}
            />
          </Form.Item>
          <div className={newStyles.progressWrap}>
            <Progress
              strokeColor="#137A08"
              size="small"
              percent={progress}
              showInfo={false}
              className={newStyles.progressBar}
            />
            <p
              className={`${newStyles.passwordHint} ${
                validCharacters ? newStyles.valid : ""
              }`}
            >
              <Check />
              <span>{t("more_than_8_characters")}</span>
            </p>
            <p
              className={`${newStyles.passwordHint} ${
                validNumSymbol ? newStyles.valid : ""
              }`}
            >
              <Check />
              <span>{t("contain_at_least_a_number_and_a_symbol")}</span>
            </p>
          </div>
          <div className={styles.submitBtnWrap}>
            <button
              className={styles.submitBtn}
              type="primary"
              htmltype="submit"
            >
              {t("ConfirmNewPassword")}
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

export default ConfirmForgetPasswordModal;
