import styles from "./highlightsSection.module.css";
import {
  BriefcaseBusiness,
  GraduationCap,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { featureCards, partners } from "../../utils/data"

const HighlightsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.featureGrid}>
        {featureCards.map((card, index) => (
          <div key={index} className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{card.title}</h3>

            <div className={styles.iconBg}></div>
            <div className={styles.featureIcon}>{card.icon}</div>
          </div>
        ))}
      </div>

      <h2 className={styles.heading}>
        Learn from 350+ leading universities and companies
      </h2>

      <div className={styles.partnerWrapper}>
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