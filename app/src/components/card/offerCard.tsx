import React from "react";
import styles from "../carousel/carousel.module.css";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

const OfferCard: React.FC<Props> = ({
  title,
  subtitle,
  description,
  image,
  buttonText,
}) => {
  return (
    <div className={styles.offerCard}>
      <div className={styles.text}>
        <h5 className={styles.badge}>{subtitle}</h5>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className={styles.btn}>{buttonText}</button>
      </div>

      <div className={styles.imageContainer}>
        <img src={image} alt="offer" />
      </div>
    </div>
  );
};

export default OfferCard;