import Slider from "react-slick";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const Banks = () => {
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState("tab-1");

  const t = useTranslations("Messages");

  return (
    <div className={`${styles.banks}`}>
      <div className="special-menu">
        <div className="special-tab">
          <ul id="tabs" className={styles.navTabs}>
            <li
              className={
                activeTab === "tab-1"
                  ? `${styles.tabLink} ${styles.current}`
                  : `${styles.tabLink}
              `
              }
              onClick={() => setActiveTab("tab-1")}
            >
              <span className={activeTab === "tab-1" ? "active" : ""}>
                Saudi
              </span>
            </li>

            <li
              className={
                activeTab === "tab-2"
                  ? `${styles.tabLink} ${styles.current}`
                  : `${styles.tabLink}
              `
              }
              onClick={() => setActiveTab("tab-2")}
            >
              <span className={activeTab === "tab-2" ? "active" : ""}>
                {" "}
                Oman
              </span>
            </li>
            <li
              className={
                activeTab === "tab-3"
                  ? `${styles.tabLink} ${styles.current}`
                  : `${styles.tabLink}
              `
              }
              onClick={() => setActiveTab("tab-3")}
            >
              <span className={activeTab === "tab-3" ? "active" : ""}>
                {" "}
                Kuwait
              </span>
            </li>

            <li
              className={
                activeTab === "tab-4"
                  ? `${styles.tabLink} ${styles.current}`
                  : `${styles.tabLink}
                `
              }
              onClick={() => setActiveTab("tab-4")}
            >
              <span className={activeTab === "tab-4" ? "active" : ""}>
                {" "}
                United Arab Emirates
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.tabContent}>
          <div
            className={
              activeTab === "tab-1"
                ? `${styles.tabPane} ${styles.current}`
                : `${styles.tabPane}
            `
            }
          >
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
          </div>
          <div
            className={
              activeTab === "tab-2"
                ? `${styles.tabPane} ${styles.current}`
                : `${styles.tabPane}
            `
            }
          >
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
          </div>
          <div
            className={
              activeTab === "tab-3"
                ? `${styles.tabPane} ${styles.current}`
                : `${styles.tabPane}
            `
            }
          >
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
          </div>
          <div
            className={
              activeTab === "tab-4"
                ? `${styles.tabPane} ${styles.current}`
                : `${styles.tabPane}
            `
            }
          >
            {" "}
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.menuImage}>
                <Image
                  src="/images/menu-1.png"
                  alt="menu"
                  layout="fill"
                  className={styles.img}
                />
              </div>
              <span className={styles.title}>Bank Albilad</span>
              <p className={styles.desc}>
                <span>Account Number : </span>
                <span>21121005030006</span>
                <span>IBAN :</span>
                <span>A32150004211210050370006</span>
                <span>Account Name:</span>
                <span>شركة أبعاد الجيل لتقنية المعلومات</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banks;
