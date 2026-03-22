import styles from "./footer.module.css";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { footerData } from "../../utils/data"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* TOP GRID */}
        <div className={styles.grid}>
          {footerData.map((section, index) => (
            <div key={index}>
              <h5 className={styles.title}>{section.title}</h5>
              <ul className={styles.list}>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className={styles.link}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className={styles.divider}></div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} LMS Platform. All rights reserved.
          </p>

          <div className={styles.socials}>
            <Facebook size={18} />
            <Twitter size={18} />
            <Linkedin size={18} />
            <Github size={18} />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;