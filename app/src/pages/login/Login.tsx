import { useState } from "react";
import styles from "./login.module.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back 👋</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className={styles.input}
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={form.password}
          onChange={handleChange}
          required
        />

        <div className={styles.options}>
          <label className={styles.remember}>
            <input type="checkbox" />
            Remember me
          </label>

          <span className={styles.forgot}>Forgot password?</span>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Log In
        </button>
      </form>

      <p className={styles.footerText}>
        Don’t have an account? <span className={styles.link}>Sign up</span>
      </p>
    </div>
  );
};

export default Login;