import { Modal, Form, Input, message } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import orderServices from "../../services/order";
import { Star } from "../../constants/icons";
import { useState } from "react";

const RateModal = ({ visible, handleClose }) => {
  const t = useTranslations("Messages");
  const [form] = Form.useForm();
  const [rate, setRate] = useState(0);
  const onFinish = async (values) => {
    values.content_en = values.content;
    values.rate = rate;
    await orderServices.addRate(values);
    message.success(t("RateAddedSuccessfully"));
    handleCloseFunc();
  };
  const handleCloseFunc = () => {
    handleClose();
    setRate(0);
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
      <h2 className={styles.modalTitle}>{t("RateOrder")}</h2>
      <div className={styles.modalContent}>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{ rate: 0, content: "" }}
          form={form}
        >
          <Form.Item
            label={t("Description")}
            name="content"
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              autoComplete="off"
              placeholder={t("enter_an_description")}
            />
          </Form.Item>
          <Form.Item
            label={t("Rate")}
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
            ]}
            name="rate"
          >
            <div className={styles.starsWrap}>
              {[...Array(5).keys()].map((item) => (
                <span
                  className={`${styles.star} ${
                    item + 1 > rate && styles.active
                  }`}
                  key={item}
                  onClick={() => setRate(item + 1)}
                >
                  <Star />
                </span>
              ))}
            </div>
          </Form.Item>

          <div className={styles.submitBtnWrap}>
            <button
              className={styles.submitBtn}
              type="primary"
              htmltype="submit"
            >
              {t("Send")}
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

export default RateModal;
