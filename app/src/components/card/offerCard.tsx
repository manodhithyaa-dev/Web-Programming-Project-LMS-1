import React, { useEffect } from "react";
import styles from "../carousel/carousel.module.css";
import AOS from "aos";

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
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className={styles.offerCard} data-aos="zoom-in" data-aos-delay="100">
      <div className={styles.text} data-aos="fade-right" data-aos-delay="200">
        <h5 className={styles.badge}>{subtitle}</h5>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className={styles.btn}>{buttonText}</button>
      </div>

      <div className={styles.imageContainer} data-aos="fade-left" data-aos-delay="300">
        <img src={image} alt="offer" />
      </div>
    </div>
  );
};

export default OfferCard;