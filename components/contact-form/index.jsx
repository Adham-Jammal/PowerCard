import { useTranslations } from "next-intl";
import { Form, Input, Modal, Result, Select } from "antd";
import HeadBox from "../head-box";
import styles from "./index.module.scss";
import Button from "../button";
import contactService from "../../services/contact";
import { countriesCodes } from "../../constants/countries";
import { useRouter } from "next/router";

const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const { locale } = useRouter();

  const t = useTranslations("Messages");

  const onFinish = async (values) => {
    await contactService.sendMessage(values);
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
          subTitle={t("SuccessMessageDesc")}
        />
      ),
    });
  };

  return (
    <div className={`${styles.ContactForm} section-padding--xlarge`}>
      <div className={styles.ContactInnerForm}>
        <HeadBox className={styles.HeadBox} text={t("ContactUsHead")} />
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
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
            <Input placeholder={t("enterAtext")} />
          </Form.Item>
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
            <Input type="email" placeholder={t("enterAnEmail")} />
          </Form.Item>
          <div className={styles.mobileNumber}>
            <Form.Item
              label={t("phoneNumber")}
              name="phone"
              rules={[
                {
                  required: true,
                  message: t("please_fill_this_field"),
                },
                {
                  pattern: "^[0-9]+$",
                  message: t("please_input_numeric_characters_only"),
                },
              ]}
            >
              <Input placeholder={t("enterANumber")} />
            </Form.Item>
            <Form.Item
              className={`${styles.countryNumber} countryNumber`}
              name="code"
              initialValue={"+966"}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children[1].props.children.indexOf(
                    input.toLowerCase()
                  ) >= 0
                }
                filterSort={(optionA, optionB) => {
                  return optionA.children[1].props.children.localeCompare(
                    optionB.children[1].props.children
                  );
                }}
              >
                {countriesCodes.map((country) => {
                  return (
                    <Select.Option value={country.dial_code} key={country.code}>
                      <span
                        className={`flag-icon flag-icon-${country.code.toLowerCase()}`}
                      ></span>
                      <span>{country.dial_code}</span>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
            ]}
            name="message"
            label={t("message")}
          >
            <TextArea rows={7} placeholder={t("enterAMessage")} />
          </Form.Item>
          <Form.Item className={styles.submitButtonWrap} name="submit">
            <Button type="primary" htmlType="submit">
              {t("send")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
