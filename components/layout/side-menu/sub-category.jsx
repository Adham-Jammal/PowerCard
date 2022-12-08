import { useTranslations } from "next-intl";
import {
  LeftArrow,
  LeftLargeArrow,
  RightArrow,
} from "../../../constants/icons";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

const SubCategory = ({ data, opened, toggleSubMenu, handelClose }) => {
  const { locale } = useRouter();

  const t = useTranslations("Messages");
  return (
    <div className={`${styles.subcategory} ${opened ? styles.opened : ""}`}>
      <div className={styles.subcategoryInner}>
        <div className={styles.subcategoryHead}>
          <button
            type="button"
            onClick={() => toggleSubMenu(false)}
            className={styles.arrowBtn}
          >
            <LeftLargeArrow />
          </button>
          <span>{t("main_menu")}</span>
        </div>
        {data && data.name !== undefined && (
          <div className={styles.subcategoriesWrap}>
            <Link
              passHref
              href={{
                pathname: "/category/[id]",
                query: { id: data.id },
              }}
            >
              <h3
                onClick={() => {
                  handelClose();
                }}
                className={styles.title}
              >
                {locale === "ar" ? data.name : data.name_en}
              </h3>
            </Link>
            {data && data.sub_category && data.sub_category.length > 0 ? (
              <ul>
                {data?.sub_category?.map((subCategory, index) => (
                  <li key={index}>
                    <Link
                      passHref
                      href={{
                        pathname: "/category/[id]",
                        query: { id: data.id, sub: subCategory.id },
                      }}
                    >
                      <span
                        onClick={() => {
                          handelClose();
                        }}
                      >
                        {locale === "ar"
                          ? subCategory.name
                          : subCategory.name_en}
                      </span>
                    </Link>
                    <span>
                      {locale === "ar" ? <LeftArrow /> : <RightArrow />}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategory;
