import { useTranslations } from "next-intl";
import { Form, Input, Row, Col, Progress, Select } from "antd";
import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { countriesCodes } from "../../constants/countries";
import { Check } from "../../constants/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import newStyles from "../signup-modal/index.module.scss";
import EditableImage from "../editable-image";
import profileService from "../../services/profile";
import authService from "../../services/auth";
import { setCurrentUser } from "../../features/auth-slice";
const EditProfileForm = ({
  form,
  setEditMode,
  progress,
  setProgress,
  validCharacters,
  setValidCharacters,
  validNumSymbol,
  setValidNumSymbol,
}) => {
  const t = useTranslations("Messages");
  const user = useSelector((state) => state.auth.value);
  const { locale } = useRouter();
  const [image, setImage] = useState(undefined);
  const dispatch = useDispatch();

  const confirmPasswordValidation = () => {
    const password = form.getFieldValue("new_password");
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
    setEditMode(true);
  };

  const onFinish = async () => {
    form.validateFields().then(async (values) => {
      if (image) values.image = image;
      else delete values.image;
      values.name_en = values.name;

      if (values.password && values.new_password && values.confirm_password)
        await profileService.updatePassword({
          password: values.password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        });
      await profileService.updateProfile(values);
      if (values.password && values.new_password && values.confirm_password) {
        let result = await authService.signIn({
          email: values.email,
          password: values.new_password,
        });
        dispatch(setCurrentUser(result));
      } else {
        let result = await authService.signIn({
          email: values.email,
          password: values.password,
        });
        dispatch(setCurrentUser(result));
      }

      window.location.reload();
    });
  };
  return (
    <div className={`${styles.joinForm}`}>
      <div className={styles.joinInnerForm}>
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            name: locale === "ar" ? user.name : user.name_en,
            email: user.email,
            phone: user.phone,
            lang: user.lang,
          }}
        >
          <Row gutter={50}>
            <Col xs={24} style={{ marginBottom: 20 }}>
              <h2 className={styles.customHeading}>
                <span>{t("PersonalInformation")}</span>
              </h2>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="image" label={t("Image")}>
                <EditableImage
                  onRemove={() => {
                    setImage(undefined);
                    setEditMode(true);
                  }}
                  onSuccess={(file) => {
                    setImage(file);
                    setEditMode(true);
                  }}
                  defaultFileList={
                    user && user.image_url !== null
                      ? [
                          {
                            uid: "1",
                            status: "done",
                            url: user.image_url,
                          },
                        ]
                      : []
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
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
                label={t("full_name")}
              >
                <Input
                  placeholder={t("enterAtext")}
                  onChange={() => setEditMode(true)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
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
                label={t("Email")}
              >
                <Input
                  type="email"
                  onChange={() => setEditMode(true)}
                  placeholder={t("enterAnEmail")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
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
                    onChange={() => setEditMode(true)}
                    placeholder={t("enter_your_phone_number")}
                  />
                </Form.Item>
                <Form.Item
                  name="country_code"
                  className={locale + " countryCode"}
                  initialValue={user?.country_code ? user.country_code : "+966"}
                >
                  <Select onChange={() => setEditMode(true)}>
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
            </Col>
          </Row>
          <Row gutter={50} style={{ marginTop: 50 }} className="joinForm">
            <Col xs={24} style={{ marginBottom: 20 }}>
              <h2 className={styles.customHeading}>
                <span>{t("CountryAndLanguage")}</span>
              </h2>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item label={t("Language")} name="lang">
                <Select
                  placeholder={t("selectLang")}
                  onChange={() => setEditMode(true)}
                >
                  <Select.Option key={"english"} value={"english"}>
                    {t("English")}
                  </Select.Option>
                  <Select.Option key={"arabic"} value={"arabic"}>
                    {t("Arabic")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                name="country_code"
                label={t("Country")}
                initialValue={user?.country_code ? user.country_code : "+966"}
              >
                <Select onChange={() => setEditMode(true)}>
                  {countriesCodes.map((country) => {
                    return (
                      <Select.Option
                        value={country.dial_code}
                        key={country.code}
                      >
                        <div className="opt">
                          <span>{country.name} &nbsp;</span>
                          <span
                            className={`flag-icon flag-icon-${country.code.toLowerCase()}`}
                          ></span>
                        </div>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50} style={{ marginTop: 50 }}>
            <Col xs={24} style={{ marginBottom: 20 }}>
              <h2 className={styles.customHeading}>
                <span>{t("Security")}</span>
              </h2>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                label={t("OldPassword")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("please_fill_this_field"),
                  },
                  {
                    min: 8,
                    message: t(
                      "the_password_must_contain_at_least_8_characters"
                    ),
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
                  onChange={() => setEditMode(true)}
                  autoComplete="new-password"
                  placeholder={t("password")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                label={t("NewPassword")}
                name="new_password"
                rules={[
                  {
                    min: 8,
                    message: t(
                      "the_password_must_contain_at_least_8_characters"
                    ),
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
                  autoComplete="new-password2"
                  placeholder={t("password")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                label={t("confirm_password")}
                name="confirm_password"
                rules={[confirmPasswordValidation]}
              >
                <Input.Password
                  autoComplete="off"
                  onChange={() => setEditMode(true)}
                  placeholder={t("confirm_password")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileForm;
