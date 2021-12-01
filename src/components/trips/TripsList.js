// init
import React, { useState, useEffect } from "react";
import API from "../../services/api";

// triplist component
const TripsList = () => {
  // states
  const [trip, setTrip] = useState([]);

  // useEffect to fetch trips
  useEffect(() => {
    fetchTrips();
  }, []);

  // function to fetch all trips
  const fetchTrips = async () => {
    const res = await API.getAllTrip();
    const { data } = res.data;
    setTrip(data);
  };

  // returing jsx
  return (
    <>
      <section
        id="hero"
        style={{
          background:
            "#4d536d url(http://www.ansonika.com/citytours/img/header_bg.jpg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          height: 110,
        }}
      >
        <div class="intro_title error"></div>
      </section>
      <div class="container margin_60">
        <div class="main_title">
          <h2>Select a Trip</h2>
        </div>

        <div class="row add_bottom_30">
          {trip.map((trip) => (
            <div class="item col-md-4">
              <div class="tour_container">
                <div class="ribbon_3 popular">
                  <span>Book Now</span>
                </div>
                <div class="img_container">
                  <a href={`/tour/${trip.city}/${trip._id}`}>
                    <img
                      src={trip.banner?.url}
                      class="img-fluid"
                      alt="Trip Banner"
                    />
                    <div class="badge_save">
                      Lets<strong>Go</strong>
                    </div>
                    <div class="short_info">
                      <i class="icon_set_1_icon-44"></i>Historic Buildings
                      <span class="price">
                        <sup>$</sup>
                        {/* display price according to category */}
                        {trip.category === "Single Day"
                          ? trip.adultPrice
                          : trip.category === "Multiple Day"
                          ? trip.bedroom.double
                          : trip.interior.adultPrice}
                      </span>
                    </div>
                  </a>
                </div>
                <div class="tour_title">
                  <h3>
                    <strong>{trip.name}</strong> tour
                  </h3>
                  {/* <Rating value={4} count={50} />
                <AddToWish /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripsList;
