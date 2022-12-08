import { useTranslations } from "next-intl";
import { Form, Input, Upload, message, Result, Modal, Select } from "antd";
import HeadBox from "../head-box";
import styles from "./index.module.scss";
import Button from "../button";
import { useState } from "react";
import { countriesCodes } from "../../constants/countries";
import joinService from "../../services/join";
import { useRouter } from "next/router";

const { Dragger } = Upload;

const JoinForm = () => {
  const t = useTranslations("Messages");
  const [imageFile, setImageFile] = useState(undefined);
  const [form] = Form.useForm();
  const { locale } = useRouter();

  const validateLink = () => {
    return {
      validator(_, value) {
        try {
          /* eslint-disable no-new */
          new URL(value);
          return Promise.resolve();
        } catch (_1) {
          return Promise.reject(
            new Error(value ? t("please_enter_valid_link") : "")
          );
        }
      },
    };
  };

  const onFinish = async (values) => {
    if (imageFile === undefined) {
      message.error(`please select image`);
    } else {
      values.register_image = imageFile;
      await joinService.sendJoinRequest(values);

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
    }
  };
  const draggerProps = {
    name: "file",
    multiple: false,
    action: "/api/hello",
    // beforeUpload: (file) => {
    //   const isOK =
    //     file.type === "image/png" ||
    //     file.type === "image/gif" ||
    //     file.type === "image/jpg" ||
    //     file.type === "image/jpeg";

    //   if (!isOK) {
    //     message.error(`${file.name} is not a png file`);
    //   }

    //   return isPNG || Upload.LIST_IGNORE;
    // },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        // message.success(`${info.file.name} file uploaded successfully.`);
        const isOK =
          info.file.type === "image/png" ||
          info.file.type === "image/gif" ||
          info.file.type === "image/jpg" ||
          info.file.type === "image/jpeg";

        if (!isOK) {
          message.error(`${info.file.name} is not a png file`);
        }
        setImageFile(info.file.originFileObj);
      } else {
        setImageFile(undefined);
      }
    },
    onDrop(e) {},
  };
  return (
    <div className={`${styles.joinForm} section-padding--xlarge`}>
      <div className={styles.joinInnerForm}>
        <HeadBox className={styles.HeadBox} text={t("joinMerchantsHead")} />
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
          <Form.Item
            name="company_name"
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
              {
                pattern:
                  "^[a-zA-Z\u0621-\u064A]{2,}(?: [a-zA-Z\u0621-\u064A]+){0,2}$",
                message: t("please_enter_valid_company_name"),
              },
            ]}
            label={t("companyName")}
          >
            <Input placeholder={t("enterAtext")} />
          </Form.Item>
          <Form.Item
            name="region"
            label={t("region")}
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
              {
                pattern:
                  "^[a-zA-Z\u0621-\u064A]{2,}(?: [a-zA-Z\u0621-\u064A]+){0,2}$",
                message: t("please_enter_valid_region_name"),
              },
            ]}
          >
            <Input placeholder={t("enterAtext")} />
          </Form.Item>
          <Form.Item
            name="company_website"
            label={t("companyWebsiteUrl")}
            rules={[
              {
                required: true,
                message: t("please_fill_this_field"),
              },
              validateLink,
            ]}
          >
            <Input placeholder={t("enterAlink")} />
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
                  message: "please_input_numeric_characters_only",
                },
              ]}
            >
              <Input placeholder={t("enterANumber")} type="number" min={0} />
            </Form.Item>
            <Form.Item
              className={`${styles.countryNumber} countryNumber`}
              name="country_code"
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
          <Form.Item label={t("tradeRegister")}>
            <Dragger className={styles.dragger} {...draggerProps}>
              <span>
                {t("dragAndDropTheFileHereOr")}{" "}
                <span className={styles.upload}>{t("upload")}</span>
              </span>
            </Dragger>
            <small className={styles.smallNote}>
              {t("acceptedSuffixesForFileMerchant")}
            </small>
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

export default JoinForm;
