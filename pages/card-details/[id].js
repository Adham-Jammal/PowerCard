import ItemDetailsHeader from "../../components/item-details";
import Container from "../../components/layout/container";
import ProductCardsCarousel from "../../components/products-carousel";
import styles from "../../styles/modules/cart-details.module.scss";
import PaymentMethods from "../../components/payment-methods";
import TermsAndConditions from "../../components/terms-and-conditions";
import itemServices from "../../services/item";
import Head from "next/head";
import { useRouter } from "next/router";

const CardDetails = ({ data, relatedData }) => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>
          {locale === "ar"
            ? "باور كارد | تفاصيل البطاقة "
            : "Power Card | Card Details"}
        </title>
        <meta name="description" content={locale === "ar" ? "" : ""} />{" "}
      </Head>{" "}
      {data ? (
        <div>
          <div className={styles.starsBg}>
            {data && <ItemDetailsHeader data={data} />}
            <div className={`${styles.relatedCards} section-padding--large`}>
              <div className="leftBox">
                <div className="leftInlineBox" />
              </div>
              <div className="rightBox">
                <div className="rightInnerBox" />
              </div>
              {relatedData && relatedData.length > 0 && (
                <Container>
                  <ProductCardsCarousel
                    itemsData={relatedData}
                    titleAbbrev="related_cards"
                  />
                </Container>
              )}
            </div>
          </div>
          <div className={`${styles.terms} section-padding--xlarge`}>
            <div className={styles.rightBg} />
            <TermsAndConditions />
          </div>
          <PaymentMethods />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CardDetails;

export async function getServerSideProps({ locale, query }) {
  const { id } = query;
  let data = await itemServices.getProductDetails(id, locale);
  let relatedDataResult = await itemServices.getItemsByCategory(
    data.category?.id,
    locale
  );
  let relatedData = relatedDataResult.filter((i) => +i.id !== +id);

  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
      data: data,
      relatedData: relatedData,
    },
  };
}
