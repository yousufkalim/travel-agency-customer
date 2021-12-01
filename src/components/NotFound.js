import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      id="hero"
      style={{
        background:
          "#4d536d url(http://www.ansonika.com/citytours/img/header_bg.jpg)",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div class="intro_title error">
        <h1 class="animated fadeInDown">404</h1>
        <p class="animated fadeInDown">Oops!! Page not found</p>
        <Link to="/" class="animated fadeInUp button_intro">
          Back to home
        </Link>{" "}
        <a href="#" class="animated fadeInUp button_intro outline">
          View all tours
        </a>
      </div>
    </section>
  );
};

export default NotFound;
