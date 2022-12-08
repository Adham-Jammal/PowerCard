import { Row, Col, Form } from "antd";
import Container from "../components/layout/container";
import styles from "../styles/modules/profile.module.scss";
import EditProfileForm from "../components/edit-profile-form";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import PowerBtn from "../components/button";
import { useState } from "react";
import { getCookie } from "cookies-next";

const Profile = () => {
  const { locale } = useRouter();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validCharacters, setValidCharacters] = useState(false);
  const [validNumSymbol, setValidNumSymbol] = useState(false);
  const t = useTranslations("Messages");

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | الملف الشخصي "
            : "Power Card | Profile"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      <div className={`${styles.profile}`}>
        <div className="leftBg" />
        <Container>
          <div className="section-padding--xlarge">
            <Row gutter={50}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div>
                  <h2 className={styles.profileHeadding}>
                    {t("MyProfile1")} <span>{t("MyProfile2")}</span>
                  </h2>
                </div>
              </Col>
              <Col xs={24} sm={24} md={15} lg={12} xl={12}>
                {editMode && (
                  <div className={styles.buttonsWrapper}>
                    <PowerBtn
                      type="button"
                      onClick={() => {
                        form.resetFields();
                        setEditMode(false);
                        setProgress(0);
                        setValidCharacters(false);
                        setValidNumSymbol(false);
                      }}
                      className={styles.cancelBtn}
                    >
                      {t("Cancel")}
                    </PowerBtn>
                    <PowerBtn
                      type="primary"
                      onClick={async () => {
                        await form.submit();
                        // setEditMode(false);
                        // setProgress(0);
                        // setValidCharacters(false);
                        // setValidNumSymbol(false);
                      }}
                      className={styles.submitBtn}
                    >
                      {t("Save")}
                    </PowerBtn>
                  </div>
                )}
              </Col>
            </Row>
          </div>
          <EditProfileForm
            form={form}
            validNumSymbol={validNumSymbol}
            setValidNumSymbol={setValidNumSymbol}
            validCharacters={validCharacters}
            setValidCharacters={setValidCharacters}
            progress={progress}
            setProgress={setProgress}
            setEditMode={setEditMode}
          />
        </Container>
      </div>
    </>
  );
};

export default Profile;
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
