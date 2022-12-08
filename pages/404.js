import { Result } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const { locale } = useRouter();
  const t = useTranslations("Messages");

  return (
    <>
      {" "}
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | الصفحة غير موجودة"
            : "Power Card | Page Not Found"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>
      <main className="page-wrap">
        <Result status="404" title="404" subTitle={t("NotFound")} />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
