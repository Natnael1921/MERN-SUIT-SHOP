import React from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <section className="section-one" data-aos="fade-up">
        <h1>Discover the perfect suit with timeless style</h1>
        <p>
          Premium single-shop suit store offering expertly tailored suits for
          weddings, business, and formal occasions.
        </p>
        <button data-aos="fade-left" onClick={() => navigate("/cloths")}>
          Shop Now!
        </button>
        <div className="landing-footer">
          <p>Working Hours - 9:00 Am - 6:00 Pm</p>
          <p>Location Addis Ababa , Piassa</p>
        </div>
        <img
          data-aos="fade-up"
          src="/landing-suit-removebg-preview.png"
          className="landing-page-image"
        />
      </section>
      <section className="section-two" data-aos="fade-up">
        <h2>Our Collections</h2>
        <div className="our-collections">
          <div data-aos="fade-up" onClick={() => navigate("/cloths")}>
            <img src="/wedding-suit.jpg" />
            <h4>Wedding suits</h4>
          </div>
          <div data-aos="fade-up" onClick={() => navigate("/cloths")}>
            <img src="/business-suit.webp" />
            <h4>Business suits</h4>
          </div>
          <div data-aos="fade-up" onClick={() => navigate("/cloths")}>
            <img src="/old-style.webp" />
            <h4>Old Styles</h4>
          </div>
        </div>
        <div className="comments" data-aos="fade-up">
          <h2> Customer Comments</h2>
          <div className="customer-comments">
            <div data-aos="fade-up" className="comment-box">
              <p>
                "I’ve never received so many compliments!The tailoring was
                spot-on and the price was fair.Highly recommend this shop to
                anyone in the city."
              </p>
            </div>
            <div data-aos="fade-up" className="comment-box">
              <p>
                “Exceptional service from start to finish. They helped me choose
                the right style for my event.I’ll definitely return for my next
                suit."
              </p>
            </div>
            <div data-aos="fade-up" className="comment-box">
              <p>
                "The suit fit perfectly right off the rack.Quality fabric and
                expert stitching. I felt confident and stylish all day!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
