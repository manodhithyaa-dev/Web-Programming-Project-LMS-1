import { useState } from "react";
import styles from "./signup.module.css";

const Signup = () => {
  const [form, setForm] = useState({
    role: "student",
    name: "",
    email: "",
    password: "",
    expertise: "",
    experience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setForm({
      ...form,
      role,
      expertise: role === "teacher" ? form.expertise : "",
      experience: role === "teacher" ? form.experience : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {form.role === "student" ? "Join as Student" : "Become an Instructor"}
      </h2>

      {/* ROLE TOGGLE */}
      <div className={styles.toggle}>
        <button
          type="button"
          className={`${styles.toggleBtn} ${
            form.role === "student" ? styles.active : ""
          }`}
          onClick={() => handleRoleChange("student")}
        >
          Student
        </button>

        <button
          type="button"
          className={`${styles.toggleBtn} ${
            form.role === "teacher" ? styles.active : ""
          }`}
          onClick={() => handleRoleChange("teacher")}
        >
          Teacher
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          required
        />

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

        {form.role === "teacher" && (
          <>
            <input
              type="text"
              name="expertise"
              placeholder="Your expertise (e.g. Web Dev)"
              className={styles.input}
              value={form.expertise}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="experience"
              placeholder="Years of experience"
              className={styles.input}
              value={form.experience}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" className={styles.submitBtn}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;