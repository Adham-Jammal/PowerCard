import { Card, Form, Input, Button, message, Modal, Result } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import PowerBtn from "../button";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addFinalCost, clearCart } from "../../features/cart-slice";
import walletService from "../../services/wallet";
import ConfirmationModal from "../confirm-modal";
import orderServices from "../../services/order";

const OrderSummary = ({ cart, coupons }) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const [couponId, setCouponId] = useState(undefined);
  const [wallet, setWallet] = useState(0);
  const userName = useSelector((state) => state.auth.value.name);
  const userId = useSelector((state) => state.auth.value.id);
  const [costWithCoupon, setCostWithCoupon] = useState(-1);
  const hasWallet = useSelector((state) => state.auth.value.membership.wallet);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const cart1 = useSelector((state) => state.cart);
  const [couponId2, setCouponId2] = useState(undefined);

  useEffect(() => {
    let walletResult = {};
    async function getData() {
      if (userName) walletResult = await walletService.getWallet();
    }
    getData().then(() => {
      if (userName) setWallet(walletResult?.data?.total | 0);
    });
  }, [userName]);

  useEffect(() => {
    if (couponId && coupons && coupons.length > 0) {
      let found = false;
      let temp = 0;
      let value =
        Math.round(
          cart.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0) *
            100
        ) / 100;
      coupons.map((item) => {
        if (item.code === couponId2) {
          found = true;
          setCouponId(item.id);
          if (item.Company !== undefined) {
            temp = 0;
            item.Company.map((i) => {
              cart.map((c) => {
                if (i.name === c.companyName) {
                  temp += +c.price * +c.quantity;
                }
              });
            });
            value -=
              item.discount_type === "percent"
                ? (temp * +item.discount_amount) / 100
                : +item.discount_amount > temp
                ? temp
                : +item.discount_amount;
          } else if (item.Sub_Category !== undefined) {
            temp = 0;
            item.Sub_Category.map((i) => {
              cart.map((c) => {
                if (i.id === c.subCategoryId) {
                  temp += +c.price * +c.quantity;
                }
              });
            });
            value -=
              item.discount_type === "percent"
                ? (temp * +item.discount_amount) / 100
                : +item.discount_amount > temp
                ? temp
                : +item.discount_amount;
          } else if (item.Product !== undefined) {
            if (item.Product == "all") {
              let cartVal =
                Math.round(
                  cart.reduce(
                    (partialSum, a) => partialSum + a.price * a.quantity,
                    0
                  ) * 100
                ) / 100;
              value -=
                item.discount_type === "percent"
                  ? (+cartVal * +item.discount_amount) / 100
                  : +item.discount_amount >= +cartVal
                  ? +cartVal
                  : +item.discount_amount;
            } else {
              temp = 0;
              item.Product.map((i) => {
                cart.map((c) => {
                  if (i.id === c.id) {
                    temp += +c.price * +c.quantity;
                  }
                });
              });
              value -=
                item.discount_type === "percent"
                  ? (temp * +item.discount_amount) / 100
                  : +item.discount_amount > temp
                  ? temp
                  : +item.discount_amount;
            }
          }
          setCostWithCoupon(value);
        }
      });
      if (couponId2.trim() === "") {
        setCouponId(undefined);
        setCostWithCoupon(-1);
      }
      if (found === false) {
        setCouponId(undefined);
        setCostWithCoupon(-1);
        message.error(t("PleaseEnterAValidCode"));
      }
    }
  }, [cart]);

  const onFinish = (values) => {
    if (coupons && coupons.length > 0) {
      let found = false;
      let temp = 0;
      let value =
        Math.round(
          cart.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0) *
            100
        ) / 100;
      coupons.map((item) => {
        if (item.code === values.coupon) {
          found = true;
          setCouponId(item.id);
          if (item.Company !== undefined) {
            temp = 0;
            item.Company.map((i) => {
              cart.map((c) => {
                if (i.name === c.companyName) {
                  temp += +c.price * +c.quantity;
                }
              });
            });
            value -=
              item.discount_type === "percent"
                ? (temp * +item.discount_amount) / 100
                : +item.discount_amount > temp
                ? temp
                : +item.discount_amount;
          } else if (item.Sub_Category !== undefined) {
            temp = 0;
            item.Sub_Category.map((i) => {
              cart.map((c) => {
                if (i.id === c.subCategoryId) {
                  temp += +c.price * +c.quantity;
                }
              });
            });
            value -=
              item.discount_type === "percent"
                ? (temp * +item.discount_amount) / 100
                : +item.discount_amount > temp
                ? temp
                : +item.discount_amount;
          } else if (item.Product !== undefined) {
            if (item.Product == "all") {
              let cartVal =
                Math.round(
                  cart.reduce(
                    (partialSum, a) => partialSum + a.price * a.quantity,
                    0
                  ) * 100
                ) / 100;
              value -=
                item.discount_type === "percent"
                  ? (+cartVal * +item.discount_amount) / 100
                  : +item.discount_amount >= +cartVal
                  ? +cartVal
                  : +item.discount_amount;
            } else {
              temp = 0;
              item.Product.map((i) => {
                cart.map((c) => {
                  if (i.id === c.id) {
                    temp += +c.price * +c.quantity;
                  }
                });
              });
              value -=
                item.discount_type === "percent"
                  ? (temp * +item.discount_amount) / 100
                  : +item.discount_amount > temp
                  ? temp
                  : +item.discount_amount;
            }
          }
          console.log(value);
          setCostWithCoupon(value);
        }
      });
      if (values.coupon.trim() === "") {
        setCouponId(undefined);
        setCostWithCoupon(-1);
      }
      if (found === false) {
        setCouponId(undefined);
        setCostWithCoupon(-1);
        message.error(t("PleaseEnterAValidCode"));
      }
    }
  };
  return (
    <div>
      <Card
        className={`${styles.orderSummaryCard} orderSummaryCard`}
        title={t("orderSummary")}
        bordered={false}
      >
        {userName && (
          <Form
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className={`${styles.couponForm} ${
              locale === "ar" ? styles.rtl : styles.ltr
            }`}
          >
            <>
              <Input.Group compact>
                <Form.Item
                  name="coupon"
                  rules={[
                    {
                      required: true,
                      message: t("please_fill_this_field"),
                    },
                  ]}
                  noStyle
                >
                  <Input
                    onChange={(val) => {
                      setCouponId2(val.target.value);
                    }}
                    placeholder={t("couponCodeOrGiftCard")}
                    style={{ width: "calc(100% - 117px)" }}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("apply")}
                </Button>
              </Input.Group>
            </>
          </Form>
        )}

        <div className={styles.orderSummary}>
          <ul>
            <li>
              <span className={styles.label}>
                {t("subtotal")}
                {` (${cart.reduce(
                  (partialSum, a) => partialSum + a.quantity,
                  0
                )} ${t("items")})`}
              </span>
              <h4 className={styles.priceWrap}>
                <span className={styles.priceCurrencyWrap}>
                  <span className={styles.price}>
                    {Math.round(
                      cart.reduce(
                        (partialSum, a) => partialSum + a.price * a.quantity,
                        0
                      ) * 100
                    ) / 100}
                  </span>
                  <span className={styles.currency}>{t("sar")}</span>
                </span>
              </h4>
            </li>
            <li>
              <span className={styles.label}>{t("totalInclusiveOfVat")}</span>
              <h4 className={styles.priceWrap}>
                <span className={styles.priceCurrencyWrap}>
                  <span className={styles.price}>
                    {Math.round(
                      cart.reduce(
                        (partialSum, a) => partialSum + a.price * a.quantity,
                        0
                      ) * 100
                    ) / 100}
                  </span>
                  <span className={styles.currency}>{t("sar")}</span>
                </span>
              </h4>
            </li>
            {costWithCoupon !== -1 && (
              <li>
                <span className={styles.label}>{t("totalAfterDiscount")}</span>
                <h4 className={styles.priceWrap}>
                  <span className={styles.priceCurrencyWrap}>
                    <span className={styles.price}>
                      {costWithCoupon > -1 ? costWithCoupon : 0}
                    </span>
                    <span className={styles.currency}>{t("sar")}</span>
                  </span>
                </h4>
              </li>
            )}
          </ul>
          <div className={styles.checkoutBtnWrap}>
            <PowerBtn
              type="primary"
              block
              onClick={() => {
                dispatch(
                  addFinalCost({
                    came_from_cart: true,
                    coupon: couponId,
                    userId: userId,
                    wallet: false,
                    repay: false,
                    total_price:
                      costWithCoupon !== -1 ? costWithCoupon : undefined,
                  })
                );
                window.location.href = "/checkout";
              }}
            >
              {t("checkout")}
            </PowerBtn>
          </div>
          {userName && (
            <>
              {" "}
              <span
                style={{
                  display: "inline-block",
                  width: "100%",
                  margin: "10px 0",
                  textAlign: "center",
                  color: "var(--inverse-color)",
                }}
              >
                {t("Or")}
              </span>
              <div className={styles.checkoutBtnWrap}>
                <PowerBtn
                  type="primary"
                  block
                  onClick={() => {
                    if (costWithCoupon !== -1 && wallet < costWithCoupon) {
                      message.error(t("BalanceError"));
                    } else if (
                      costWithCoupon === -1 &&
                      Math.round(
                        cart.reduce(
                          (partialSum, a) => partialSum + a.price * a.quantity,
                          0
                        ) * 100
                      ) /
                        100 >
                        wallet
                    ) {
                      message.error(t("BalanceError"));
                    } else {
                      dispatch(
                        addFinalCost({
                          came_from_cart: true,
                          userId: userId,
                          coupon: couponId,
                          wallet: true,
                          repay: false,
                          total_price:
                            costWithCoupon !== -1 ? costWithCoupon : undefined,
                        })
                      );
                      setConfirmationModal(true);
                    }
                  }}
                >
                  {t("buyByPoints")}
                </PowerBtn>
              </div>
            </>
          )}
        </div>
      </Card>
      <ConfirmationModal
        handleClose={() => setConfirmationModal(false)}
        visible={confirmationModal}
        msg={t("TakeFromWalletMsg")}
        onOK={async () => {
          let items = [];
          let data = {};
          cart1.value
            .filter((i) => i.userId == userId)
            .map((item) => {
              items.push({
                item_id: item.id,
                item_type: item.type,
                item_qty: item.quantity,
                item_price: item.price,
                item_points: item.points,
              });
            });
          data.items = items;
          data.items_qty = cart1.items_qty;
          data.total_price_before_disc = cart1.total_price_before_disc;
          data.coupon_id = cart1.coupon;
          data.total_price = cart1.total_price;
          data.total_point = cart1.total_point;
          data.wallet = true;
          data.url = "https://powercard-sa.com/checkout";
          let result = await orderServices.addInvoice(data);
          setConfirmationModal(false);
          if (result == "Success") {
            dispatch(clearCart());
            Modal.success({
              title: t("SuccessMessageTitle"),
              okText: t("OK"),
              className: "error-modal " + locale,
              centered: true,
              icon: false,
              content: (
                <Result
                  status="success"
                  className="error-response"
                  title=""
                  subTitle={t("WalletSuccessMessageDesc")}
                />
              ),
            });
            // setTimeout(() => {
            //   window.location.href = "/my-orders";
            // }, 400);
          } else {
            Modal.success({
              title: t("SuccessMessageTitle2"),
              okText: t("OK"),
              className: "error-modal " + locale,
              centered: true,
              icon: false,
              content: (
                <Result
                  status="error"
                  className="error-response"
                  title=""
                  subTitle={t("WalletErrorMessageDesc")}
                />
              ),
            });
          }
        }}
      />
    </div>
  );
};

export default OrderSummary;
