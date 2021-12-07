import { useState, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { allAgencies } from "../../services/api";
import { useHistory } from "react-router";

export default function CityTour({ trip }) {
  const history = useHistory();
  const [agency, setAgency] = useState([]);

  useEffect(async () => {
    allAgencies().then((res) => {
      setAgency(res.data.data);
    });
  }, []);

  return (
    <div class="container margin_60">
      <div class="main_title">
        <h2>
          LIST <span>OF</span> AGENCIES
        </h2>
        <p>
          Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur
          consequat.
        </p>
      </div>

      <div class="row add_bottom_30">
        <ListGroup
          as="ol"
          numbered
          style={{
            width: "80%",
            height: "350px",
            overflow: "scroll",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {agency.map((item) => {
            let tripCount = 0;
            return (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/AgencyTrips/${item._id}`)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.fullName}</div>
                  {item.email}
                </div>
                {trip.map((item2) => {
                  if (item._id === item2.agency) {
                    tripCount += 1;
                  }
                })}
                {console.log("tripCount: ", tripCount)}
                <Badge variant="primary" pill>
                  Trips: {tripCount}
                </Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}
