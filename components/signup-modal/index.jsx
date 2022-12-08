import { useState, useEffect } from "react";
import { Modal, Form, Input, Progress, Select, message, Alert } from "antd";
import { useTranslations } from "next-intl";
import styles from "../signin-modal/index.module.scss";
import newStyles from "./index.module.scss";
import { Check } from "../../constants/icons";
import { countriesCodes } from "../../constants/countries";
import { useRouter } from "next/router";
import authService from "../../services/auth";
import { setCurrentUser } from "../../features/auth-slice";
import { useDispatch } from "react-redux";

const SignUpModal = ({ visible, handleClose, handleOpenLogin }) => {
  const t = useTranslations("Messages");
  const { locale, pathname } = useRouter();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [progress, setProgress] = useState(0);
  const [validCharacters, setValidCharacters] = useState(false);
  const [validNumSymbol, setValidNumSymbol] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const onFinish = async (values) => {
    values.login_url = window.location.href + "?verified=true";
    values.lang = locale;
    await authService.signUp(values);
    // let result = await authService.signIn({
    //   email: values.email,
    //   password: values.password,
    // });
    // dispatch(setCurrentUser(result));
    handleClose();
    handleOpenLogin();
    setAlertVisible(true);
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

  const handleLoginClick = () => {
    handleClose();
    handleOpenLogin();
  };
  return (
    <>
      {alertVisible && (
        <Alert
          message={t("VerificationMessage")}
          type="info"
          className="c-alert"
          closable
          showIcon
          onClose={() => setAlertVisible(false)}
        />
      )}

      <Modal
        wrapClassName={styles.signModal}
        centered
        visible={visible}
        onOk={handleClose}
        onCancel={handleClose}
        footer={false}
        maskClosable={false}
      >
        <h2 className={styles.modalTitle}>{t("sign_up")}</h2>
        <div className={styles.modalContent}>
          <Form
            form={form}
            initialValues={{ remember: true, password: "", email: "" }}
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
              label={t("full_name")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("please_fill_this_field"),
                },
                {
                  pattern:
                    "^[a-zA-Z\u0621-\u064A]{2,}(?: [a-zA-Z\u0621-\u064A]+){0,2}$",
                  message: t("please_enter_valid_full_name"),
                },
              ]}
            >
              <Input
                autoComplete="off"
                type="string"
                placeholder={t("enter_your_full_name")}
              />
            </Form.Item>
            <div className="input-wrapper">
              <Form.Item
                label={t("PhoneNumber")}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: t("please_fill_this_field"),
                  },
                  {
                    pattern: "^[0-9]+$",
                    message: t("please_enter_valid_phone"),
                  },
                ]}
              >
                <Input
                  autoComplete="off"
                  type="string"
                  placeholder={t("enter_your_phone_number")}
                />
              </Form.Item>
              <Form.Item
                name="country_code"
                className={locale + " countryCode"}
                initialValue={"+966"}
              >
                <Select>
                  {countriesCodes.map((country) => {
                    return (
                      <Select.Option
                        value={country.dial_code}
                        key={country.code}
                      >
                        <span
                          className={`flag-icon flag-icon-${country.code.toLowerCase()}`}
                        ></span>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
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
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
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
                {t("sign_up")}
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
                {t("already_have_an_account")}
                {"  "}
                <span onClick={handleLoginClick}>{t("sign_in_now")}</span>
              </p>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SignUpModal;
