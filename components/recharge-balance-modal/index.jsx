import { Modal, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAmount } from "../../features/wallet-slice";

const RechargeBalanceModal = ({ visible, handleClose }) => {
  const t = useTranslations("Messages");
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(setAmount({ amount: values.total_price }));
    router.push("/wallet-checkout");
    handleClose();
  };
  const handleCloseFunc = () => {
    handleClose();
    form.resetFields();
  };
  return (
    <Modal
      wrapClassName={styles.signModal}
      centered
      destroyOnClose={true}
      visible={visible}
      onOk={handleCloseFunc}
      maskClosable={false}
      onCancel={handleCloseFunc}
      footer={false}
    >
      <h2 className={styles.modalTitle}>{t("RechargeTheBalance")}</h2>
      <div className={styles.modalContent}>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{ total_price: 1 }}
          form={form}
        >
          <Form.Item
            label={t("DesiredAmount")}
            name="total_price"
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
            ]}
          >
            <Input placeholder={t("enter_an_amount")} type="number" min={1} />
          </Form.Item>

          <div className={styles.submitBtnWrap}>
            <button
              className={styles.submitBtn}
              type="primary"
              htmltype="submit"
            >
              {t("Recharge")}
            </button>
          </div>
          <div className={styles.cancelWrap}>
            <button
              onClick={handleCloseFunc}
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

export default RechargeBalanceModal;
