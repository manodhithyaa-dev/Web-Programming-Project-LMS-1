import { useEffect } from "react";
import AOS from "aos";

const Faq = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div style={{ margin: "0 5rem" }}>
      <h2 className="mb-4" data-aos="fade-up">Frequently Asked Questions</h2>

      <div className="accordion" id="faqAccordion">

        {/* ITEM 1 */}
        <div className="accordion-item" data-aos="fade-up" data-aos-delay="100">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqOne"
              aria-expanded="true"
            >
              What is this LMS platform about?
            </button>
          </h2>
          <div
            id="faqOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Our LMS provides industry-ready courses in web development, AI, business, and more — designed to help you build real-world skills.
            </div>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="accordion-item" data-aos="fade-up" data-aos-delay="200">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqTwo"
            >
              Do I get a certificate after completion?
            </button>
          </h2>
          <div
            id="faqTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, you’ll receive a certificate upon successful completion of each course.
            </div>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="accordion-item" data-aos="fade-up" data-aos-delay="300">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqThree"
            >
              Are the courses beginner-friendly?
            </button>
          </h2>
          <div
            id="faqThree"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Absolutely. We offer courses for beginners, intermediate learners, and advanced professionals.
            </div>
          </div>
        </div>

        {/* ITEM 4 */}
        <div className="accordion-item" data-aos="fade-up" data-aos-delay="400">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqFour"
            >
              Can I access courses anytime?
            </button>
          </h2>
          <div
            id="faqFour"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, all courses are self-paced and available 24/7.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Faq;