import styles from "./highlightsSection.module.css";
import {
  BriefcaseBusiness,
  GraduationCap,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { featureCards, partners } from "../../utils/data"
import { useEffect } from "react";
import AOS from "aos";

const HighlightsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.featureGrid}>
        {featureCards.map((card, index) => (
          <div key={index} className={styles.featureCard} data-aos="fade-up" data-aos-delay={index * 100}>
            <h3 className={styles.featureTitle}>{card.title}</h3>

            <div className={styles.iconBg}></div>
            <div className={styles.featureIcon}>{card.icon}</div>
          </div>
        ))}
      </div>

      <h2 className={styles.heading} data-aos="fade-up" data-aos-delay="400">
        Learn from 350+ leading universities and companies
      </h2>

      <div className={styles.partnerWrapper} data-aos="fade-up" data-aos-delay="500">
        <div className={styles.partnerRow}>
          {partners.map((partner, index) => (
            <button key={index} className={styles.partnerChip}>
              <span className={styles.partnerLogo}>
                {partner.charAt(0)}
              </span>
              <span className={styles.partnerText}>{partner}</span>
            </button>
          ))}

          <button className={styles.arrowChip} aria-label="View more partners">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;