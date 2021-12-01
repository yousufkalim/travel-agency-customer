import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Hero() {
  return (
    <Carousel autoPlay={true}>
      <section
        id="hero"
        style={{
          background:
            "url(http://www.ansonika.com/citytours/img/slides/slide_home_3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div class="intro_title">
          <h3 class="animated fadeInDown">Affordable Paris tours</h3>
          <p class="animated fadeInDown">
            City Tours / Tour Tickets / Tour Guides
          </p>
          <a href="/triplist" class="animated fadeInUp button_intro mr-2">
            View Tours
          </a>
          <a href="#" class="animated fadeInUp button_intro outline">
            View Tickets
          </a>
        </div>
      </section>
      <section
        id="hero"
        style={{
          background:
            "url(http://www.ansonika.com/citytours/img/header_bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div class="intro_title">
          <h3 class="animated fadeInDown">Affordable Madrid tours</h3>
          <p class="animated fadeInDown">
            City Tours / Tour Tickets / Tour Guides
          </p>
          <a href="/triplist" class="animated fadeInUp button_intro mr-2">
            View Tours
          </a>
          <a href="#" class="animated fadeInUp button_intro outline">
            View Tickets
          </a>
        </div>
      </section>
    </Carousel>
  );
}
