import OfferCard from "../card/offerCard";
import styles from "./carousel.module.css";
import { carouselData } from "../../utils/data"

const Carousel = () => {
  return (
    <div
      id="offerCarousel"
      className={`carousel slide ${styles.carousel}`}
      data-bs-ride="carousel"
    >
      {/* DOT INDICATORS */}
      <div className={`carousel-indicators ${styles.indicators}`}>
        {carouselData.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#offerCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>

      {/* SLIDES */}
      <div className="carousel-inner">
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className={styles.slide}>
              {slide.map((card, i) => (
                <OfferCard key={i} {...card} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <button
        className={`carousel-control-prev ${styles.control}`}
        type="button"
        data-bs-target="#offerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className={`carousel-control-next ${styles.control}`}
        type="button"
        data-bs-target="#offerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Carousel;