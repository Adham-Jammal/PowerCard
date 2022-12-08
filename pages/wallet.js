import { Row, Col, Form, Input, Select, Pagination } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/orders.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Transactions from "../components/transactions";
import { useEffect, useState } from "react";
import walletServices from "../services/wallet";
import { getCookie } from "cookies-next";
import PowerBtn from "../components/button";
import TransactionsSummary from "../components/transaction-summary";
import { useSelector } from "react-redux";

const MyWallet = () => {
  const { locale } = useRouter();
  const t = useTranslations("Messages");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const hasWallet = useSelector((state) => state.auth.value.membership.wallet);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);

  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  useEffect(() => {
    async function getData() {
      return await walletServices.getWallet(current);
    }
    getData().then((result) => {
      setTotal(result.data?.transactions?.total | 0);
      setData(result.data?.transactions?.data.filter((t) => t.type !== "pay"));
      setFilteredData(
        result.data?.transactions?.data.filter((t) => t.type !== "pay")
      );
      setBalance(result.data?.total | 0);
      setPoints(result.data?.point | 0);
    });
  }, [current]);
  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | المحفظة " : "Power Card | Wallet"}
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
                    {t("MyOrders1")} <span>{t("Wallet")}</span>
                  </h2>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                <Form layout="horizontal">
                  <Row className={`${styles.row} row`} xs={24}>
                    <Col xs={24} md={11}>
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
                            let status = s === 2 ? "put" : "take";
                            let temp = [];
                            if (s === 1) {
                              setFilteredData(data);
                            } else {
                              data.map((item) => {
                                if (item.type?.toString() === status) {
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
                            {t("PutTransaction")}
                          </Select.Option>
                          <Select.Option key={3} value={3}>
                            {t("TakeTransaction")}
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
                <Transactions data={filteredData} />
                {filteredData?.length > 0 && (
                  <Pagination
                    className="custom-pagination"
                    current={current}
                    onChange={(page) => {
                      setCurrent(page);
                    }}
                    total={total}
                  />
                )}
              </Col>

              <Col xs={24} sm={24} md={24} lg={9}>
                <TransactionsSummary
                  currentBalance={balance}
                  currentPoints={points}
                  hasWallet={hasWallet}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyWallet;
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
