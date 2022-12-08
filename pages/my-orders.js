import { Row, Col, Form, Input, Select, Pagination } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/orders.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import OrderSummary2 from "../components/order-summary2";
import Orders from "../components/orders";
import { useEffect, useRef, useState } from "react";
import orderServices from "../services/order";
import { getCookie } from "cookies-next";

const MyOrders = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [canceledOrder, setCanceledOrder] = useState(false);
  const [meta, setMeta] = useState(null);
  const [current, setCurrent] = useState(1);
  const formRef = useRef(null);
  useEffect(() => {
    async function getData() {
      return await orderServices.getOrders(current);
    }
    getData().then((result) => {
      setData(result.data?.filter((i) => i.pay_info !== null));
      setFilteredData(result.data?.filter((i) => i.pay_info !== null));
      setMeta(result.meta);
    });
  }, [current]);
  useEffect(() => {
    if (canceledOrder) {
      async function getData() {
        return await orderServices.getOrders(current);
      }
      getData().then((result) => {
        setCanceledOrder(false);
        setSelectedOrder(undefined);
        setMeta(result.meta);

        setData(result.data?.filter((i) => i.pay_info !== null));
        let filter = formRef.current.getFieldValue("filterBy");
        if (filter == 3)
          setFilteredData(
            result.data?.filter(
              (i) =>
                i.pay_info !== null &&
                i.pay_info?.status?.toString() == "pending"
            )
          );
        else setFilteredData(result.data?.filter((i) => i.pay_info !== null));
      });
    }
  }, [canceledOrder]);
  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | طلباتي " : "Power Card | My Orders"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.orders}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={50}>
              <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                <div>
                  <h2 className={styles.profileHeadding}>
                    {t("MyOrders1")} <span>{t("MyOrders2")}</span>
                  </h2>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                <Form layout="horizontal" ref={formRef}>
                  <Row className={`${styles.row} row`} xs={24}>
                    <Col
                      xs={{
                        span: 24,
                        offset: 0,
                      }}
                      md={{
                        span: 11,
                        offset: 0,
                      }}
                    >
                      <Form.Item label={t("Search")} name="keywordTerm">
                        <Input
                          placeholder={t("EnterOrderNumber")}
                          onChange={(e) => {
                            let keyword = e.target.value;
                            let temp = [];
                            data.map((item) => {
                              if (item.id.toString().indexOf(keyword) > -1) {
                                temp.push(item);
                              }
                            });
                            setFilteredData(temp);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{
                        span: 24,
                        offset: 0,
                      }}
                      md={{
                        span: 11,
                        offset: 1,
                      }}
                    >
                      {" "}
                      <Form.Item
                        className={`${styles.select} select`}
                        label={t("FilterBy")}
                        name="filterBy"
                        initialValue={1}
                      >
                        <Select
                          onChange={(s) => {
                            let status = s === 2 ? "paid" : "pending";
                            let temp = [];
                            setSelectedOrder(undefined);
                            if (s === 1) {
                              setFilteredData(data);
                            } else {
                              data.map((item) => {
                                if (
                                  item.pay_info?.status?.toString() === status
                                ) {
                                  temp.push(item);
                                }
                              });
                              setFilteredData(temp);
                            }
                          }}
                        >
                          <Select.Option key={1} value={1}>
                            {t("NoFilter")}
                          </Select.Option>
                          <Select.Option key={2} value={2}>
                            {t("PaidOrders")}
                          </Select.Option>
                          <Select.Option key={3} value={3}>
                            {t("PendingOrders")}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: 20 }}>
              <Col xs={24} sm={24} md={24} lg={15}>
                <Orders
                  data={filteredData}
                  setSelectedOrder={setSelectedOrder}
                />
                {filteredData.length > 0 && (
                  <Pagination
                    current={current}
                    className="custom-pagination"
                    onChange={(page) => {
                      setCurrent(page);
                    }}
                    total={meta?.total}
                  />
                )}
              </Col>
              <Col xs={24} sm={24} md={24} lg={9}>
                <OrderSummary2
                  setCanceledOrder={setCanceledOrder}
                  selectedOrder={selectedOrder}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyOrders;
export async function getServerSideProps({ req, locale, res }) {
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
