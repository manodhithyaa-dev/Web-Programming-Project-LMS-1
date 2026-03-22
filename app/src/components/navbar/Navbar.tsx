import React, { useState, useRef, useEffect } from "react";
import styles from "./navbar.module.css";
import { Search } from "lucide-react";
import { categories } from "../../utils/data";
import Signup from "../../pages/signup/Signup";
import Login from "../../pages/login/Login";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // CLOSE dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CLOSE modal with ESC key (🔥 pro UX)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSignup(false);
      if (e.key === "Escape") setShowLogin(false)
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        {/* LEFT */}
        <div className={styles.left}>
          <h1 className={styles.logo}>coursera</h1>

          <div className={styles.exploreWrapper} ref={dropdownRef}>
            <button
              className={styles.explore}
              onClick={() => setOpen(!open)}
            >
              Explore <span className={styles.arrow}>▾</span>
            </button>

            {open && (
              <div className={styles.dropdown}>
                {categories.map((cat, index) => (
                  <div key={index} className={styles.dropdownItem}>
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CENTER */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="What do you want to learn?"
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <Search size={18} />
          </button>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* <a href="#" className={styles.link}>
            Log In
          </a> */}

          <button
            className={styles.joinBtn}
            onClick={() => setShowLogin(true)}
          >
            Log In
          </button>

          <button
            className={styles.joinBtn}
            onClick={() => setShowSignup(true)}
          >
            Join for Free
          </button>
        </div>
      </nav>

      {/* 🔥 SIGNUP MODAL */}
      {showSignup && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowSignup(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setShowSignup(false)}
            >
              ✕
            </button>

            <Signup />
          </div>
        </div>
      )}

      {showLogin && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowLogin(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>

            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;