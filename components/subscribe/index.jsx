import { Form, Input, Button, Row, Col, Modal, Result } from "antd";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import Container from "../layout/container";
import { useEffect } from "react";
import { useState } from "react";
import homeServices from "../../services/home";
import { useRouter } from "next/router";
const Subscribe = () => {
  const t = useTranslations("Messages");
  const [data, setData] = useState([]);
  const { locale } = useRouter();
  useEffect(() => {
    let dataResult = [];
    async function getData() {
      dataResult = await homeServices.getBanner("en");
    }
    getData().then(() => {
      setData(dataResult);
    });
  }, []);

  const finish = (values) => {
    fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify({ email: values.email, data: data }),
    }).then((response) => {
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
    });
  };
  return (
    <div className={`${styles.subscribeWrapper} section-padding--large`}>
      <Container className={styles.container}>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={22} xl={22}>
            <div className={styles.subscribeInner}>
              <h2>{t("subscribe_title")}</h2>
              <p className="parag">{t("subscribe_Content")}</p>
              <Row align="center">
                <Col xs={24} sm={22} md={18} lg={16} xl={12}>
                  <Form
                    className={`${styles.subscribeForm} subscribeForm`}
                    onFinish={finish}
                  >
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
                    >
                      <Input placeholder={t("enter_your_email")} bordered />
                    </Form.Item>
                    <Form.Item>
                      <Button className={styles.submit} htmlType="submit">
                        {t("get_started")}
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Subscribe;
