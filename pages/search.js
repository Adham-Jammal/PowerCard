import { Row, Col, Collapse, Form, Input, Spin } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/membership.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { DownArrow, Search } from "../constants/icons";
import ResultCards from "../components/result-cards";
import { appleCards } from "../data/data";
import { useEffect, useState } from "react";
import itemServices from "../services/item";

const SearchPage = () => {
  const { locale, query } = useRouter();
  const t = useTranslations("Messages");
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const theme = useSelector((state) => state.theme.value);
  const onFinish = async (values) => {
    setLoading(true);
    let result = await itemServices.search(
      values.searchInput.toLowerCase(),
      locale
    );
    setResult(result.data);
    setLoading(false);
  };
  useEffect(() => {
    if (query && query.keyword) {
      onFinish({ searchInput: query.keyword });
    }
  }, [query]);
  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar" ? "باور كارد | البحث " : "Power Card | Search"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.membership}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={50}>
              <Col xs={24}>
                {" "}
                <div>
                  <div className={styles.searchWrap}>
                    <Form onFinish={onFinish}>
                      <Form.Item
                        name="searchInput"
                        initialValue={query ? query.keyword : undefined}
                      >
                        <Input
                          className={styles.searchInput}
                          placeholder={t("search")}
                          value={query ? query.keyword : undefined}
                        />
                      </Form.Item>
                      <button className={styles.searchButton} type="submit">
                        <Search />
                      </button>
                    </Form>
                  </div>
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: 70 }}>
                {loading ? (
                  <Spin size="25" />
                ) : (
                  <ResultCards itemsData={result} />
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SearchPage;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
