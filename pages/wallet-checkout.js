import {
  Row,
  Col,
  Steps,
  Result,
  Form,
  Radio,
  Input,
  Select,
  Progress,
} from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/checkout.module.scss";
import Router, { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useStepsForm } from "sunflower-antd";
import HeadBox from "../components/head-box";
import PaymentMethods from "../components/payment-methods";
import PowerBtn from "../components/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { countriesCodes } from "../constants/countries";
import { Check } from "../constants/icons";
import { useSelector, useDispatch } from "react-redux";
import walletServices from "../services/wallet";
import authServices from "../services/auth";
import { setCurrentUser } from "../features/auth-slice";
import { getCookie } from "cookies-next";
import { clearAmount } from "../features/wallet-slice";

const WalletCheckout = () => {
  const { locale, query } = useRouter();
  const router = useRouter();

  const { Step } = Steps;
  const [value, setValue] = useState(1);
  const [progress, setProgress] = useState(0);
  const [orderStatus, setOrderStatus] = useState(undefined);
  const [url, setUrl] = useState(undefined);

  const [validCharacters, setValidCharacters] = useState(false);
  const [validNumSymbol, setValidNumSymbol] = useState(false);
  const userName = useSelector((state) => state.auth.value.name);
  const wallet = useSelector((state) => state.wallet.value);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const t = useTranslations("Messages");

  const {
    form,
    current = userName ? 1 : 0,
    gotoStep,
    stepsProps,
    formProps,
    submit,
    formLoading,
  } = useStepsForm({
    async submit(values) {
      return "ok";
    },
    total: 3,
  });

  const confirmPasswordValidation = () => {
    const password = form.getFieldValue("signup_password");
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

  async function addInvoice() {
    let data = {};
    data.total_price = wallet.amount;
    data.url = "https://powercard-sa.com/wallet-checkout";
    let result = await walletServices.addInvoice(data);
    setUrl(result.url);
    // transactionNo,url,gatewayOrderRequest.orderNumber,gatewayOrderRequest.callBackUrl
  }
  async function getInvoice(order_id, transaction_no) {
    let result = await walletServices.getInvoice(order_id, transaction_no);
    return result;
  }
  useEffect(() => {
    // orderNumber=31&transactionNo=1661083929134
    if (query && query.orderNumber && query.transactionNo) {
      gotoStep(3);
      //clear cart
      getInvoice(query.orderNumber, query.transactionNo).then(async (data) => {
        let { orderStatus, transactionNo, gatewayOrderRequest } = data;
        setOrderStatus(orderStatus);
        if (orderStatus === "Paid") {
          await walletServices.checkWallet({
            order_id: gatewayOrderRequest.orderNumber,
            transaction_no: transactionNo,
            amount: wallet.amount,
            order_status: orderStatus,
          });
        }
        dispatch(clearAmount());
      });
    } else {
      if (userName && wallet.amount > 0) {
        gotoStep(1);
        addInvoice();
      }
    }
  }, []);
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

  const formList = [
    <>
      {" "}
      <div className={styles.boxInner}>
        <HeadBox className={styles.Box} text={t("SigninOrSignup")} />
        <Form.Item>
          <Radio.Group
            name="type"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            <Radio value={1}>Sign in</Radio>
            <Radio value={2}>Sign up</Radio>
          </Radio.Group>
        </Form.Item>
        {value === 1 && (
          <>
            <Form.Item
              label={t("Email")}
              name="login_email"
              rules={[
                {
                  required: userName ? false : true,
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
              name="login_password"
              rules={[
                {
                  required: userName ? false : true,
                  message: t("please_fill_this_field"),
                },
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                placeholder={t("EnterAPassword")}
              />
            </Form.Item>
          </>
        )}
        {value === 2 && (
          <>
            <Form.Item
              label={t("Email")}
              name="signup_email"
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
                  pattern: "^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$",
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
                className="countryCode"
                initialValue={"+966"}
              >
                <Select defaultValue={"+966"}>
                  {countriesCodes.map((country) => {
                    return (
                      <Select.Option
                        value={country.dial_code}
                        key={country.dial_code}
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
              name="signup_password"
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
            <div className={styles.progressWrap}>
              <Progress
                strokeColor="#137A08"
                size="small"
                percent={progress}
                showInfo={false}
                className={styles.progressBar}
              />
              <p
                className={`${styles.passwordHint} ${
                  validCharacters ? styles.valid : ""
                }`}
              >
                <Check />
                <span>{t("more_than_8_characters")}</span>
              </p>
              <p
                className={`${styles.passwordHint} ${
                  validNumSymbol ? styles.valid : ""
                }`}
              >
                <Check />
                <span>{t("contain_at_least_a_number_and_a_symbol")}</span>
              </p>
            </div>
          </>
        )}

        <div className="step-actions">
          <PowerBtn
            className={styles.nextBtn}
            type="primary"
            onClick={async () => {
              let form1 = formRef.current;

              if (value === 1) {
                //sign in
                let email = form1.getFieldValue("login_email");
                let password = form1.getFieldValue("login_password");
                let result = await authServices.signIn({
                  email: email,
                  password: password,
                });
                dispatch(setCurrentUser(result));
              } else if (value === 2) {
                // sign up
                let email = form1.getFieldValue("signup_email");
                let password = form1.getFieldValue("signup_password");
                let name = form1.getFieldValue("name");
                let phone = form1.getFieldValue("phone");
                let code = form1.getFieldValue("country_code");

                await authServices.signUp({
                  email: email,
                  password: password,
                  name: name,
                  phone: phone,
                  country_code: code,
                });
                let result = await authServices.signIn({
                  email: email,
                  password: password,
                });
                authServices;
                dispatch(setCurrentUser(result));
              }
              addInvoice();
              gotoStep(current + 1);
            }}
          >
            <span>{t("Next")}</span>
          </PowerBtn>
        </div>
      </div>
    </>,

    <>
      {" "}
      <div className={styles.boxInner}>
        <HeadBox className={styles.Box} text={t("Payment")} />

        {url && <iframe src={url} width={"100%"} height={"500px"} />}

        {/* <div className="step-actions">
          <PowerBtn
            className={styles.nextBtn}
            type="primary"
            onClick={() => gotoStep(current + 1)}
          >
            <span>{t("Next")}</span>
          </PowerBtn>
        </div> */}
      </div>
    </>,
    <>
      <div className={styles.boxInner}>
        <HeadBox className={styles.Box} text={t("Confirmation")} />
        {orderStatus ? (
          orderStatus === "Paid" ? (
            <Result
              status="success"
              className="step-actions"
              extra={
                <>
                  <p className={styles.info}>{t("Paid")}</p>
                  <PowerBtn
                    className={styles.nextBtn}
                    type="primary"
                    onClick={() => (window.location.href = "/wallet")}
                  >
                    <span>{t("GoWallet")}</span>
                  </PowerBtn>
                </>
              }
              icon={
                <Image
                  src="/images/success.svg"
                  width={157}
                  height={179}
                  alt="success"
                />
              }
            />
          ) : orderStatus === "Pending" ? (
            <Result
              status="success"
              className="step-actions"
              extra={
                <>
                  <p className={styles.info}>{t("Pending")}</p>
                  <PowerBtn
                    className={styles.nextBtn}
                    type="primary"
                    onClick={() => (window.location.href = "/wallet")}
                  >
                    <span>{t("GoWallet")}</span>
                  </PowerBtn>
                </>
              }
              icon={
                <Image
                  src="/images/success.svg"
                  width={157}
                  height={179}
                  alt="success"
                />
              }
            />
          ) : orderStatus === "Cancelled" ? (
            <Result
              status="warning"
              className="step-actions"
              extra={
                <>
                  <p className={styles.info}>{t("Cancelled")}</p>
                  <PowerBtn
                    className={styles.nextBtn}
                    type="primary"
                    onClick={() => (window.location.href = "/wallet")}
                  >
                    <span>{t("GoWallet")}</span>
                  </PowerBtn>
                </>
              }
            />
          ) : orderStatus === "Declined" ? (
            <Result
              status="error"
              className="step-actions"
              extra={
                <>
                  <p className={styles.info}>{t("Declined")}</p>
                  <PowerBtn
                    className={styles.nextBtn}
                    type="primary"
                    onClick={() => (window.location.href = "/wallet")}
                  >
                    <span>{t("GoWallet")}</span>
                  </PowerBtn>
                </>
              }
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </>,
  ];

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | الدفع " : "Power Card | Checkout"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.checkout}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={50}>
              <Col xs={24}>
                {wallet.amount > 0 || query.orderNumber ? (
                  <div className={"custom-steps"} style={{ display: "grid" }}>
                    <div className="steps-indicators">
                      <Steps
                        {...stepsProps}
                        direction="horizontal"
                        className="steps-wrapper"
                      >
                        <Step title={t("Step1Title")} disabled={true} />

                        <Step title={t("Step2Title")} disabled={true} />
                        <Step
                          disabled={true}
                          title={
                            <span>
                              {t("Step3Title1")}
                              <br />
                              {t("Step3Title2")}
                            </span>
                          }
                        />
                      </Steps>
                    </div>

                    <div className={"steps-form"}>
                      <Form ref={formRef} layout="vertical" {...formProps}>
                        {formList[current]}
                      </Form>
                    </div>
                  </div>
                ) : (
                  <Result
                    status="404"
                    title={t("WalletEmpty1")}
                    subTitle={t("WalletEmpty2")}
                  />
                )}
              </Col>
              <Col xs={24}>
                <PaymentMethods />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default WalletCheckout;
export async function getServerSideProps({ locale, req, res }) {
  if (!getCookie("AUTH", { req, res })) {
    const link = locale === "ar" ? "/ar" : "/";
    res.setHeader("location", link);
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
