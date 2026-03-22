import { useEffect } from "react";
import AOS from "aos";
import Carousel from "../../components/carousel/Carousel";
import HighlightsSection from "../../components/featureSection/FeatureSection";
import Faq from "../../components/FAQ/faq";
import Testimonials from "../../components/Testimonials/Testimonials";

const Landing = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // animate only once
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <div data-aos="fade-up">
        <Carousel />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <HighlightsSection />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <Testimonials />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <Faq />
      </div>
    </>
  );
};

export default Landing;