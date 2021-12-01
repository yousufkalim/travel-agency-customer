export default function About() {
  return (
    <div class="white_bg">
      <div class="container margin_60">
        <div class="main_title">
          <h2>
            Plan <span>Your Tour</span> Easly
          </h2>
          <p>
            Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur
            consequat.
          </p>
        </div>
        <div class="row feature_home_2">
          <div class="col-md-4 text-center">
            <img src="img/adventure_icon_1.svg" alt="" width="75" height="75" />
            <h3>Itineraries studied in detail</h3>
            <p>
              Suscipit invenire petentium per in. Ne magna assueverit vel. Vix
              movet perfecto facilisis in, ius ad maiorum corrumpit, his esse
              docendi in.
            </p>
          </div>
          <div class="col-md-4 text-center">
            <img src="img/adventure_icon_2.svg" alt="" width="75" height="75" />
            <h3>Room and food included</h3>
            <p>
              Cum accusam voluptatibus at, et eum fuisset sententiae. Postulant
              tractatos ius an, in vis fabulas percipitur, est audiam phaedrum
              electram ex.
            </p>
          </div>
          <div class="col-md-4 text-center">
            <img src="img/adventure_icon_3.svg" alt="" width="75" height="75" />
            <h3>Everything organized</h3>
            <p>
              Integre vivendo percipitur eam in, graece suavitate cu vel. Per
              inani persius accumsan no. An case duis option est, pro ad
              fastidii contentiones.
            </p>
          </div>
        </div>

        <div
          class="banner_2"
          style={{
            background:
              "url(http://www.ansonika.com/citytours/img/banner_bg_desktop.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div
            class="wrapper d-flex align-items-center opacity-mask"
            data-opacity-mask="rgba(0, 0, 0, 0.3)"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <div>
              <h3>
                Your Perfect
                <br />
                Tour Experience
              </h3>
              <p>Activities and accommodations</p>
              <a href="all_tours_list.html" class="btn_1">
                Read more
              </a>
            </div>
          </div>
          {/* <!-- /wrapper --> */}
        </div>
        {/* <!-- /banner_2 --> */}
      </div>
      {/* <!-- End container --> */}
    </div>
  );
}
