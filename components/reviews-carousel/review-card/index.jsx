import { Card, Avatar } from "antd";
import { useTranslations } from "next-intl";
import { Quote, BackQuote, Star } from "../../../constants/icons";
import styles from "./index.module.scss";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
const ReviewCard = ({ data: { name, client_image, content, date, rate } }) => {
  const t = useTranslations("Messages");

  return (
    <Card
      hoverable
      bordered={false}
      className={`${styles.reviewCard} reviewCard`}
    >
      <div className={styles.cardContent}>
        <div className={styles.quotsWrap}>
          <Quote />
          <Quote />
        </div>
        <p className={`${styles.cardDesc} text-lines`}>{content}</p>
        <div className={styles.backQuoteWrap}>
          <BackQuote />
          <BackQuote />
        </div>
        <div className={styles.reviewWrap}>
          {client_image === "" ? (
            <Avatar size={45} icon={<UserOutlined />} />
          ) : (
            <Avatar
              src={`https://admin.powercard-sa.com${client_image}`}
              size={50}
            />
          )}
          <div className={styles.rateNameWrap}>
            <span className={styles.reviewerName}>{name}</span>
            <div className={styles.starsWrap}>
              {[...Array(5).keys()].map((item) => (
                <span
                  className={`${styles.star} ${
                    item + 1 > rate && styles.active
                  }`}
                  key={item}
                >
                  <Star />
                </span>
              ))}
            </div>
          </div>
          <span className={styles.time}>{`${moment(date)
            .startOf("hour")
            .fromNow()}`}</span>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
