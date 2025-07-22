import React from "react";

export function HomePage() {
  return (
    <div className="home-page">
      <section className="section-one">
        <h1>Discover the perfect suit with timeless style</h1>
        <p>
          Premium single-shop suit store offering expertly tailored suits for
          weddings, business, and formal occasions.
        </p>
        <button>Shop Now!</button>
        <div className="landing-footer">
          <p>Working Hours - 9:00 Am - 6:00 Pm</p>{" "}
          <p>Location Addis Ababa , Piassa</p>
        </div>
        <img
          src="public/landing-suit-removebg-preview.png"
          className="landing-page-image"
        />
      </section>
      <section className="section-two">
        <h2>Our Collections</h2>
        <div className="our-collections">
          <div>
            <img src="public/wedding-suit.jpg" />
            <h4>Wedding suits</h4>
          </div>
          <div>
            <img src="public/business-suit.webp" />
            <h4>Business suits</h4>
          </div>
          <div>
            <img src="public/old-style.webp" />
            <h4>Old Styles</h4>
          </div>
        </div>
        <div className="comments">
        <h2> Customer Comments</h2>
            <div className="customer-comments">
          <div className="comment-box">
            <p>
              "I’ve never received so many compliments!The tailoring was spot-on
              and the price was fair.Highly recommend this shop to anyone in the
              city."
            </p>
          </div>
          <div className="comment-box">
            <p>
              “Exceptional service from start to finish. They helped me choose
              the right style for my event.I’ll definitely return for my next
              suit."
            </p>
          </div>
          <div className="comment-box">
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
