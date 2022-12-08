import { Card, Modal, Result } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import PowerBtn from "../button";
import { useRouter } from "next/router";
import Image from "next/image";
import RateModal from "../rate-modal";
import { useState } from "react";
import { useEffect } from "react";
import itemsServices from "../../services/item";
const fallBackImage =
  "data:image/png;base64,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";
import invoiceStyles from "./invoice.module.scss";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { addFinalCost, fillCart } from "../../features/cart-slice";
import CancelModal from "../cancel-modal";
import orderServices from "../../services/order";

const InvoiceModal = ({
  data,
  visible,
  handleClose,
  products,
  setCanceledOrder,
}) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();
  const theme = useSelector((state) => state.theme.value);
  const membership = useSelector((state) => state.auth.value.membership.name);
  const userId = useSelector((state) => state.auth.value.id);

  const printInvoice = () => {
    let childWindow = window.open(
      "",
      "childWindow",
      "location=yes, menubar=yes, toolbar=yes"
    );
    childWindow.document.open();
    childWindow.document.write(
      `<html><head><style>body{direction:${
        locale === "ar" ? "rtl" : "ltr"
      }}.wrapper{padding: 22px 0;width: 98vw;}  .container-wrapper { display: flex;width: 97vw;margin:auto; align-items: flex-start; justify-content: space-between;} .container {margin: 0;padding: 0 20px;}.invoice {max-width: 640px;margin: 0 auto;font-size: 14px;font-weight: 500}.logo {display: block;position: relative;top: -25px;}.table {width: calc(100vw - 70px);margin: auto; text-align: center; } strong {display: inline-block; color: #dd830b;margin: 0 2px 4px;}p {color: #000;}table,tr, td,th { border: 1px solid #000;text-align: center;}th {padding: 8px 16px;}td {padding: 12px 16px;font-weight: 500;color: #000;}th {background: #0e1017;box-shadow: inset 0 0 0 1000px #0e1017;color:#fff;font-weight: bold;}.foot {padding: 30px 20px 0;position: relative; width: calc(100vw - 70px); display: flex; justify-content: flex-start;flex-direction: column;align-items: flex-end;}.foot p {text-align: left;width: 200px; display: flex;align-items: center; justify-content: space-between;}</style></head><body>`
    );
    childWindow.document.write(
      document.getElementById("invoice").innerHTML.replace("-dark", "-light")
    );
    childWindow.document.write("</body></html>");
    childWindow.print();
    childWindow.document.close();
    childWindow.close();
  };
  return (
    <Modal
      wrapClassName={invoiceStyles.signModal}
      centered
      width={"95%"}
      visible={visible}
      onOk={handleClose}
      maskClosable={false}
      onCancel={handleClose}
      footer={false}
    >
      <h2 className={invoiceStyles.modalTitle}>{t("ExportToInvoice")}</h2>
      <div className={invoiceStyles.modalContent}>
        <div id="invoice">
          <div className="invoice">
            <div className="wrapper">
              <div className="container-wrapper">
                <div className="container">
                  <div>
                    <img
                      src={`/images/${
                        theme !== "light"
                          ? "logo-dark-new.png"
                          : "logo-light-new.png"
                      }`}
                      width="220"
                      alt=""
                      className="logo"
                    />
                  </div>
                </div>
                <div className="container">
                  <p>
                    <strong>{t("orderNumber")}:</strong>
                    <span>#{data.id}</span>
                  </p>
                  <p>
                    <strong>{t("PaidDate")}:</strong>
                    <span>
                      {moment(data.pay_info?.paid_at).format("DD/MM/YYYY")}
                    </span>
                  </p>
                </div>
              </div>
              <br />

              <table
                cellPadding="0"
                cellSpacing="0"
                border="0"
                align="center"
                className="table"
              >
                <thead>
                  <tr>
                    <th>{t("CardName")}</th>
                    <th>
                      {t("UnitPrice")} ({t("sar")})
                    </th>
                    <th>{t("Quantity")}</th>
                    <th>
                      {t("TotalPrice")} ({t("sar")})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    let price =
                      membership === "merchant"
                        ? p.biller_price
                        : membership === "Platini"
                        ? p.platinum
                        : p.classic_price;
                    return (
                      <tr key={i}>
                        <td>{locale === "ar" ? p.name : p.name_en}</td>
                        <td>{price}</td>
                        <td>{p.quantity}</td>
                        <td>{p.quantity * price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="foot">
                <p>
                  <strong>{t("OrderCost")}:</strong>
                  <span>
                    {data.total_price_before_disc} {t("sar")}
                  </span>
                </p>
                <p>
                  <strong>{t("Discount")}:</strong>
                  <span>
                    {data.coupon
                      ? `${data.coupon?.discount_amount} ${
                          data.coupon?.discount_type === "percent"
                            ? "%"
                            : t("sar")
                        }`
                      : "-"}{" "}
                  </span>
                </p>
                <p>
                  <strong>{t("OrderTotal")}:</strong>
                  <span>
                    {data.total_price} {t("sar")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={invoiceStyles.submitBtnWrap}>
          <button
            className={invoiceStyles.submitBtn}
            type="primary"
            onClick={printInvoice}
          >
            {t("Print")}
          </button>
        </div>
        <div className={invoiceStyles.cancelWrap}>
          <button
            onClick={handleClose}
            type="button"
            className={invoiceStyles.cancelBtn}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const OrderSummary2 = ({ selectedOrder, setCanceledOrder }) => {
  const t = useTranslations("Messages");
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const membership = useSelector((state) => state.auth.value.membership.name);
  const userId = useSelector((state) => state.auth.value.id);

  const router = useRouter();

  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);

  async function getProducts(selectedOrder) {
    let temp = [];
    setProducts([]);
    // if (item.item_type === "ours") {
    for (let item of selectedOrder?.items) {
      let data = await itemsServices.getProductDetails(item.item_id, locale);
      data.quantity = item.item_qty;
      temp.push(data);
    } // } else {
    //   let data = await itemsServices.getItemsByExternalItem(
    //     item.item_id,
    //     locale
    //   );
    //   data.quantity = item.item_qty;
    //   temp.push(data);
    // }
    return temp;
  }
  useEffect(() => {
    if (selectedOrder?.items) {
      getProducts(selectedOrder).then((temp) => {
        setProducts(temp);
      });
    }
  }, [selectedOrder]);

  if (!selectedOrder) return <></>;
  if (selectedOrder && products && products.length > 0)
    return (
      <div>
        <Card
          className={`${styles.orderSummaryCard} orderSummaryCard`}
          title={<span>{`${t("orderNumber")}: ${selectedOrder.id}`}</span>}
          bordered={false}
        >
          {products.map((p) => (
            <div key={p.id} className={styles.orderItem}>
              <Image
                src={`${
                  p.image
                    ? "https://admin.powercard-sa.com" + p.image
                    : p.productImageWhiteLabel
                    ? p.productImageWhiteLabel
                    : fallBackImage
                }`}
                width={100}
                height={70}
                alt="item"
              />
              <div className={styles.desc}>
                <span className={styles.title}>
                  {locale === "ar"
                    ? p.name
                      ? p.name
                      : p.productName
                    : p.name_en
                    ? p.name_en
                    : p.productName}
                </span>
                <span className={styles.category}>
                  {locale === "ar" ? p.category?.name : p.category?.name_en}
                </span>
                <div className={styles.foot}>
                  <div className={styles.company}>
                    {/* <Avatar
                      className={styles.avatar}
                      size={24}
                      src={`/images/cards/icons/1.png`}
                    />
                    <span>Game</span> */}
                  </div>
                  <div className={styles.price}>
                    <span>{`(x${p.quantity})`}</span>
                    {`${
                      membership === "merchant"
                        ? p.biller_price
                        : membership === "Platini"
                        ? p.platinum
                        : p.classic_price
                    } ${t("sar")}`}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.orderSummary}>
            <h5>{t("OrderTotal")}</h5>
            <ul>
              <li>
                <span className={styles.label}>{t("OrderCost")}</span>
                <span className={styles.price}>
                  {selectedOrder.total_price_before_disc} {t("sar")}
                </span>
              </li>

              <li>
                <span className={styles.label}>{t("Discount")}</span>
                <span className={styles.price}>
                  {selectedOrder.coupon
                    ? `${selectedOrder.coupon?.discount_amount} ${
                        selectedOrder.coupon?.discount_type === "percent"
                          ? "%"
                          : t("sar")
                      }`
                    : "-"}
                </span>
              </li>
              <li>
                <span className={styles.label}>{t("Total")}</span>
                <h4 className={styles.priceWrap}>
                  <span className={styles.priceCurrencyWrap}>
                    <span className={styles.price}>
                      {selectedOrder.total_price}
                    </span>
                    <span className={styles.currency}>{t("sar")}</span>
                  </span>
                </h4>
              </li>
            </ul>
            {selectedOrder.pay_info?.status?.toString() === "paid" && (
              <span
                className={styles.export}
                onClick={() => {
                  setShowInvoiceModal(true);
                }}
              >
                {t("ExportToInvoice")}
              </span>
            )}
            {selectedOrder.pay_info?.status?.toString() === "paid" ? (
              <>
                <div className={styles.checkoutBtnWrap}>
                  <PowerBtn
                    className={styles.rate}
                    onClick={() => setRateModalVisible(true)}
                  >
                    {t("RateOrder")}
                  </PowerBtn>
                  <PowerBtn
                    type="primary"
                    className={styles.repeat}
                    onClick={() => {
                      let temp = [];
                      products.map((p) => {
                        temp.push({
                          quantity: p.quantity,
                          id: p.id || p.productId,
                          name: p.name || p.productName,
                          name_en: p.name_en || p.productName,
                          image: p.image
                            ? "https://admin.powercard-sa.com" + p.image
                            : p.productImageWhiteLabel
                            ? p.productImageWhiteLabel
                            : fallBackImage,
                          price: p.classic_price || p.productPrice,
                          companyName: p.company?.name,
                          companyLogo: p.company?.logo
                            ? `https://admin.powercard-sa.com${p.company?.logo}`
                            : fallBackImage,
                          type: p.source,
                          categoryId: p.productName ? 0 : p.category?.id,
                          subCategoryId: p.sub_category?.id || undefined,
                          companyName_en: p.company?.name_en,
                        });
                      });
                      dispatch(fillCart({ products: temp, userId: userId }));
                      router.push("/cart");
                    }}
                  >
                    {t("RepeatTheOrder")}
                  </PowerBtn>
                </div>
              </>
            ) : (
              <>
                <div className={styles.checkoutBtnWrap}>
                  <PowerBtn
                    className={styles.rate}
                    onClick={() => setCancelModalVisible(true)}
                  >
                    {t("CancelOrder")}
                  </PowerBtn>
                  <PowerBtn
                    type="primary"
                    className={styles.repeat}
                    onClick={() => {
                      dispatch(
                        addFinalCost({
                          repay: true,
                          order_id: selectedOrder.id,
                          userId: userId,
                        })
                      );
                      window.location.href = "/checkout";
                    }}
                  >
                    {t("CompleteTheOrder")}
                  </PowerBtn>
                </div>
              </>
            )}
          </div>
          <RateModal
            handleClose={() => setRateModalVisible(false)}
            visible={rateModalVisible}
          />
          <CancelModal
            onOk={async () => {
              await orderServices.cancelOrder(selectedOrder.id);
              setCanceledOrder(true);
              setCancelModalVisible(false);
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
                    subTitle={t("OrderCancelledSuccessfully")}
                  />
                ),
              });
            }}
            handleClose={() => setCancelModalVisible(false)}
            visible={cancelModalVisible}
          />
        </Card>
        <InvoiceModal
          data={selectedOrder}
          products={products}
          visible={showInvoiceModal}
          handleClose={() => {
            setShowInvoiceModal(false);
          }}
        />
      </div>
    );

  return <></>;
};

export default OrderSummary2;
