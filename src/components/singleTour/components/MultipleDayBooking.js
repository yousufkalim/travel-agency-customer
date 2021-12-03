import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Button, ListGroup } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

// Form handling
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { v4 as uuidv4 } from "uuid";
import API from "../../../services/api";
import { toast } from "react-toastify";

// form validation rules
const validationSchema = Yup.object().shape({
  numberOfAdults: Yup.string().required("Number of tickets is required"),
  adults: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("FirstName is required"),
      lastName: Yup.string().required("LastName is required"),
      passportDNI: Yup.string().required("Passport or DNI is required"),
      nationality: Yup.string().required("Nationality is required"),
      dob: Yup.string().required("Birthday is required"),
      gender: Yup.string().required("Gender is required"),
    })
  ),
});

//// Multiday booking component
const MultipleDayBooking = ({ trip }) => {
  // state
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
    bookingDate: new Date(),
    newsletter: false,
    adult: [],
    children: [],
    totalCost: 0,
  });
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), bedrooms: "", adults: "", childs: "" },
  ]);
  const [totalAdults, setTotalAdults] = useState(1); ///default 1 adult
  const [totalChilds, setTotalChilds] = useState(1); ///default 1 child
  const [adultData, setAdultData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [currentPage, setCurrentPage] = useState("first");
  const [cabin, setCabin] = useState({
    name: "",
    adult: 0,
    children: 0,
    adultPrice: 0,
    childPrice: 0,
  }); /////cabin for curuse booking
  const [departureDate, setDepartureDate] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [stripeUrl, setStripeUrl] = useState("");

  useEffect(() => {
    let temp = [];
    trip?.departure?.map((item) => {
      temp.push(new Date(item));
    });
    setDepartureDate(temp);
  }, [trip]);

  // model close
  const handleClose = () => {
    setShow(false);
    setCurrentPage("first");
  };

  // model show
  const handleShow = (e) => {
    var tempTotalAdults = 0;
    var tempTotalChilds = 0;
    // checking for trip category
    if (trip.category !== "Cruises") {
      inputFields.map((item) => {
        item.adults &&
          (tempTotalAdults = tempTotalAdults + parseInt(item.adults));
        item.childs &&
          (tempTotalChilds = tempTotalChilds + parseInt(item.childs));
      });

      setData(tempTotalAdults, tempTotalChilds);
      setTotalAdults(tempTotalAdults);
      setTotalChilds(tempTotalChilds);
    } else {
      ////setting default child and adult data to 1 1
      setData(1, 1);
    }

    setShow(true);
  };

  // empty array of objects according to number or childs and adults
  const setData = (adults, childs) => {
    if (adults > 0) {
      let tempAdultData = [...Array(parseInt(adults))].map((e, i) => {
        return {
          firstname: "",
          lastName: "",
          passportDNI: "",
          nationality: "",
          dob: "",
          gender: "male",
        };
      });
      setAdultData(tempAdultData);
    }

    if (childs > 0) {
      let temoChildData = [...Array(parseInt(childs))].map((e, i) => {
        return {
          firstname: "",
          lastName: "",
          passportDNI: "",
          nationality: "",
          dob: "",
          gender: "male",
        };
      });
      setChildData(temoChildData);
    }
  };

  const { register, reset, errors } = useForm({
    validationSchema: validationSchema,
  });

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), bedrooms: "", adults: "", childs: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  // second page of model
  const onNext = (e) => {
    e.preventDefault();
    setCurrentPage("Second");
  };

  // previous page of model
  const onPrev = () => {
    setCurrentPage("first");
  };

  // submit func
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // setting value according to category
      let data = values;
      if (trip?.category === "Single Day") {
        data.adult = adultData;
        data.children = childData;
        data.totalCost =
          totalChilds * trip.childPrice * totalAdults * trip.adultPrice;
      } else if (trip?.category === "Multiple Day") {
        data.adult = adultData;
        data.children = childData;
        data.totalCost =
          inputFields?.length === 2
            ? trip?.bedroom &&
              trip?.bedroom[inputFields[0]?.bedrooms] *
                trip?.bedroom[inputFields[1]?.bedrooms]
            : trip?.bedroom && trip?.bedroom[inputFields[0]?.bedrooms];
      } else {
        data.adult = adultData;
        data.children = childData;
        data.totalCost =
          totalChilds * cabin.childPrice * totalAdults * cabin.adultPrice;
      }

      const result = await API.addBooking(data, trip._id);
      toast.success("Trip Booked!", { position: "bottom-right" });
      handleClose();
      setValues({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        comment: "",
        bookingDate: new Date(),
        newsletter: false,
        adult: [],
        children: [],
        totalCost: 0,
      });
      if (result.data.agency.subscription.type !== "Beginner") {
        ///handle checkout here
        let body = {
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: trip.name,
                },
                unit_amount: parseInt(data.totalCost) * 100,
              },
              quantity: 1,
            },
          ],
          metaData: {
            booking: result.data.data._id,
            type: "booking",
          },
          stripeId: result.data.agency.bank.stripId,
          amount: parseInt(data.totalCost) * 100,
        };
        const checkoutResult = await API.checkout(body);
        setStripeUrl(checkoutResult.data.url);
        setStatusModal(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error, { position: "bottom-right" });
      toast.error(error?.response?.data?.raw?.message, {
        position: "bottom-right",
      });
    }
  };

  // return jsx
  return (
    <div className="box_style_1 expose">
      <h3 className="inner">- Booking -</h3>
      <div className="row">
        <div className="col-sm-12">
          {/* date picker */}
          <div className="form-group">
            <label>
              <i className="icon-calendar-7"></i> Select a date
            </label>
            <ReactDatePicker
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              includeDates={departureDate}
              className="date-pick form-control form-control"
              selected={values.bookingDate}
              onChange={(date) =>
                setValues({ ...values, ["bookingDate"]: date })
              }
            />
          </div>
          {/* diffrent fields for different trip categories */}
          {trip.category !== "Cruises" ? (
            <>
              {/* input fields to select room and add adults and children */}
              {inputFields.map((inputField) => (
                <div key={inputField.id}>
                  <label>Room Type</label>
                  {/* close button */}
                  <button
                    className="float-right btn btn-sm btn-secondary"
                    onClick={() => handleRemoveFields(inputField.id)}
                    disabled={inputFields.length === 1}
                  >
                    x
                  </button>
                  {/* select room */}
                  <select
                    name="bedrooms"
                    class="form-control mt-2"
                    value={inputField.bedrooms}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  >
                    <option value="" selected disabled>
                      Select Room
                    </option>
                    <option value="double">
                      Double | ${trip?.bedroom?.double}
                    </option>
                    <option value="single">
                      Single | ${trip?.bedroom?.single}
                    </option>
                    <option value="twin">Twin | ${trip?.bedroom?.twin}</option>
                  </select>
                  {/* if room exist select number of adults and childs */}
                  {inputField.bedrooms && (
                    <div className="form-row mt-3">
                      <div className="form-group col-md-6">
                        <label>Number of Adults</label>
                        <select
                          name="adults"
                          class="form-control"
                          value={inputField.adults}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        >
                          <option value="" selected disabled>
                            Adults
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label>Number of Childs</label>
                        <select
                          name="childs"
                          class="form-control"
                          value={inputField.childs}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        >
                          <option value="" selected disabled>
                            Childs
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* add new room button */}
              <button
                className="btn btn-sm btn-info mt-2"
                onClick={handleAddFields}
                disabled={inputFields.length === 2}
              >
                Add Room
              </button>
            </>
          ) : (
            // select cabin type
            <select
              class="form-select"
              aria-label="Default select example"
              value={cabin.name}
              onChange={(e) => {
                setCabin({
                  ...cabin,
                  ["name"]: e.target.value,
                  ["adultPrice"]: trip[e.target.value]?.adultPrice,
                  ["childPrice"]: trip[e.target.value]?.childPrice,
                });
              }}
            >
              <option value="" selected disabled>
                Open this select menu
              </option>
              <option value="interior">
                Interior | ${trip.interior?.adultPrice} | $
                {trip.interior?.childPrice}
              </option>
              <option value="exterior">
                Exterior | ${trip.exterior?.adultPrice} | $
                {trip.exterior?.childPrice}
              </option>
              <option value="balcony">
                Balcony | ${trip.balcony?.adultPrice} | $
                {trip.balcony?.childPrice}
              </option>
              <option value="suite">
                Suite | ${trip.suite?.adultPrice} | ${trip.suite?.childPrice}
              </option>
            </select>
          )}
        </div>
      </div>

      {/* Continue button to open model */}
      <br />
      <button
        className="btn_full"
        onClick={handleShow}
        disabled={
          (!inputFields[0].adults || !inputFields[0].childs) && !cabin.name
        }
      >
        Continue
      </button>

      {/* Booking Modal Window */}
      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{trip.category} Trip Booking Form</Modal.Title>
          {/*model heading with trip category name*/}
        </Modal.Header>
        <Modal.Body>
          {/* checking for page to display */}
          {currentPage === "first" ? (
            // adult and child information form
            <form onSubmit={onNext}>
              <div className="container">
                <div className="row">
                  {/* Number of adults */}
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <label>Number of Adults</label>
                        <select
                          onChange={(e) => {
                            setTotalAdults(e.target.value);
                            setData(e.target.value, 0);
                          }}
                          name="numberOfAdults"
                          defaultValue={totalAdults}
                          ref={register}
                          className={`form-control ${
                            errors.numberOfAdults ? "is-invalid" : ""
                          }`}
                        >
                          {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.numberOfAdults?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div class="col-md-12">
                        {[...Array(parseInt(totalAdults))].map((e, i) => (
                          <div key={i}>
                            <h5>Adults {i + 1}</h5>
                            <div class="form-group row">
                              <div class="myFormColumnLeft col-md-6">
                                <label>FirstName</label>
                                <input
                                  name={`adults[${i}]firstName`}
                                  ref={register}
                                  value={adultData[i]?.firstname}
                                  onChange={(e) =>
                                    setAdultData((prev) => {
                                      prev[i].firstname = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  type="text"
                                  className={`form-control ${
                                    errors.adults?.[i]?.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.firstName?.message}
                                </div>
                              </div>

                              <div class="myFormColumnRight col-md-6">
                                <label>LastName</label>
                                <input
                                  name={`adults[${i}]lastName`}
                                  ref={register}
                                  type="text"
                                  value={adultData[i]?.lastName}
                                  onChange={(e) =>
                                    setAdultData((prev) => {
                                      prev[i].lastName = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.lastName?.message}
                                </div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="myFormColumnLeft col-md-6">
                                <label>passportDNI</label>
                                <input
                                  name={`adults[${i}]passportDNI`}
                                  ref={register}
                                  type="number"
                                  value={adultData[i]?.passportDNI}
                                  onChange={(e) =>
                                    setAdultData((prev) => {
                                      prev[i].passportDNI = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.passportDNI
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.passportDNI?.message}
                                </div>
                              </div>

                              <div class="myFormColumnRight col-md-6">
                                <label>nationality</label>
                                <input
                                  name={`adults[${i}]nationality`}
                                  ref={register}
                                  type="text"
                                  value={adultData[i]?.nationality}
                                  required={true}
                                  onChange={(e) =>
                                    setAdultData((prev) => {
                                      prev[i].nationality = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  className={`form-control ${
                                    errors.adults?.[i]?.nationality
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.nationality?.message}
                                </div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="myFormColumnRight col-md-6">
                                <label>dob</label>
                                <input
                                  name={`adults[${i}]dob`}
                                  ref={register}
                                  type="date"
                                  value={adultData[i]?.dob}
                                  onChange={(e) =>
                                    setAdultData((prev) => {
                                      prev[i].dob = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.dob ? "is-invalid" : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.dob?.message}
                                </div>
                              </div>

                              <div class="myFormColumnRight col-md-6">
                                <label>Gender</label>
                                <select
                                  name={`adults[${i}]gender`}
                                  value={adultData[i]?.gender}
                                  onChange={(e) =>
                                    setAdultData((prev) => {
                                      prev[i].gender = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  ref={register}
                                  className={`form-control ${
                                    errors.adults?.[i]?.gender
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="others">Others</option>
                                </select>
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.gender?.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Number of children */}
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <label>Number of Childrens</label>
                        <select
                          onChange={(e) => {
                            setTotalChilds(e.target.value);
                            setData(0, e.target.value);
                          }}
                          name="numberOfAdults"
                          defaultValue={totalChilds}
                          ref={register}
                          className={`form-control ${
                            errors.numberOfAdults ? "is-invalid" : ""
                          }`}
                        >
                          {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {errors.numberOfAdults?.message}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div class="col-md-12">
                        {[...Array(parseInt(totalChilds))].map((e, i) => (
                          <div key={i}>
                            <h5>Children {i + 1}</h5>
                            <div class="form-group row">
                              <div class="myFormColumnLeft col-md-6">
                                <label>FirstName</label>
                                <input
                                  name={`adults[${i}]firstName`}
                                  ref={register}
                                  type="text"
                                  value={childData[i]?.firstname}
                                  onChange={(e) =>
                                    setChildData((prev) => {
                                      prev[i].firstname = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.firstName?.message}
                                </div>
                              </div>

                              <div class="myFormColumnRight col-md-6">
                                <label>LastName</label>
                                <input
                                  name={`adults[${i}]lastName`}
                                  ref={register}
                                  type="text"
                                  value={childData[i]?.lastName}
                                  onChange={(e) =>
                                    setChildData((prev) => {
                                      prev[i].lastName = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.lastName?.message}
                                </div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="myFormColumnLeft col-md-6">
                                <label>passportDNI</label>
                                <input
                                  name={`adults[${i}]passportDNI`}
                                  ref={register}
                                  type="number"
                                  value={childData[i]?.passportDNI}
                                  onChange={(e) =>
                                    setChildData((prev) => {
                                      prev[i].passportDNI = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.passportDNI
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.passportDNI?.message}
                                </div>
                              </div>

                              <div class="myFormColumnRight col-md-6">
                                <label>nationality</label>
                                <input
                                  name={`adults[${i}]nationality`}
                                  ref={register}
                                  type="text"
                                  value={childData[i]?.nationality}
                                  onChange={(e) =>
                                    setChildData((prev) => {
                                      prev[i].nationality = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.nationality
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.nationality?.message}
                                </div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="myFormColumnRight col-md-6">
                                <label>dob</label>
                                <input
                                  name={`adults[${i}]dob`}
                                  ref={register}
                                  type="Date"
                                  value={childData[i]?.dob}
                                  onChange={(e) =>
                                    setChildData((prev) => {
                                      prev[i].dob = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  required={true}
                                  className={`form-control ${
                                    errors.adults?.[i]?.dob ? "is-invalid" : ""
                                  }`}
                                />
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.dob?.message}
                                </div>
                              </div>

                              <div class="myFormColumnRight col-md-6">
                                <label>Gender</label>
                                <select
                                  name={`adults[${i}]gender`}
                                  value={childData[i]?.gender}
                                  onChange={(e) =>
                                    setChildData((prev) => {
                                      prev[i].gender = e.target.value;
                                      return [...prev];
                                    })
                                  }
                                  ref={register}
                                  className={`form-control ${
                                    errors.adults?.[i]?.gender
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="others">Others</option>
                                </select>
                                <div className="invalid-feedback">
                                  {errors.adults?.[i]?.gender?.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Invoice */}
                  <div className="col-md-4">
                    {" "}
                    <table className="table table_summary">
                      <tbody>
                        {/* invoiuce according to category */}
                        {trip?.category === "Single Day" ? (
                          <>
                            <tr>
                              <td>Adults</td>
                              <td className="text-right">
                                {totalAdults} x {trip.adultPrice}={" "}
                                {totalAdults * trip.adultPrice}
                              </td>
                            </tr>
                            <tr>
                              <td>Children</td>
                              <td className="text-right">
                                {totalChilds} x {trip.childPrice}={" "}
                                {totalChilds * trip.childPrice}
                              </td>
                            </tr>
                            <tr className="total">
                              <td>Total cost</td>
                              <td className="text-right">
                                ${" "}
                                {totalChilds *
                                  trip.childPrice *
                                  totalAdults *
                                  trip.adultPrice}
                              </td>
                            </tr>
                          </>
                        ) : trip?.category === "Multiple Day" ? (
                          <>
                            <tr>
                              <td>{inputFields[0]?.bedrooms}</td>
                              <td className="text-right">
                                {trip?.bedroom &&
                                  trip?.bedroom[inputFields[0]?.bedrooms]}
                              </td>
                            </tr>
                            <tr>
                              <td>{inputFields[1]?.bedrooms}</td>
                              <td className="text-right">
                                {trip?.bedroom &&
                                  trip?.bedroom[inputFields[1]?.bedrooms]}
                              </td>
                            </tr>
                            <tr className="total">
                              <td>Total cost</td>
                              <td className="text-right">
                                ${" "}
                                {inputFields?.length === 2
                                  ? trip?.bedroom &&
                                    trip?.bedroom[inputFields[0]?.bedrooms] *
                                      trip?.bedroom[inputFields[1]?.bedrooms]
                                  : trip?.bedroom &&
                                    trip?.bedroom[inputFields[0]?.bedrooms]}
                              </td>
                            </tr>
                          </>
                        ) : (
                          <>
                            <tr>
                              <td>Adults</td>
                              <td className="text-right">
                                {totalAdults} x {cabin.adultPrice} ={" "}
                                {totalAdults * cabin.adultPrice}
                              </td>
                            </tr>
                            <tr>
                              <td>Childs</td>
                              <td className="text-right">
                                {totalChilds} x {cabin.childPrice} ={" "}
                                {totalChilds * cabin.childPrice}
                              </td>
                            </tr>
                            <tr className="total">
                              <td>Total cost</td>
                              <td className="text-right">
                                ${" "}
                                {totalChilds *
                                  cabin.childPrice *
                                  totalAdults *
                                  cabin.adultPrice}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* action button */}
              <div className="card-footer text-center border-top-0">
                <button type="submit" className="btn btn-primary mr-1">
                  Next
                </button>
                {/* <button className="btn btn-secondary mr-1" type="reset">
                  Reset
                </button> */}
              </div>
            </form>
          ) : (
            // user information form
            <form onSubmit={onSubmit}>
              <div className="container">
                <div class="form-group row">
                  <div class="myFormColumnLeft col-md-6">
                    <label>Name</label>
                    <input
                      name={`fullname`}
                      value={values.fullName}
                      onChange={(e) =>
                        setValues((prev) => {
                          prev.fullName = e.target.value;
                          return { ...prev };
                        })
                      }
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div class="myFormColumnLeft col-md-6">
                    <label>Email</label>
                    <input
                      name="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues((prev) => {
                          prev.email = e.target.value;
                          return { ...prev };
                        })
                      }
                      type="email"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="myFormColumnLeft col-md-6">
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={(e) =>
                        setValues((prev) => {
                          prev.phone = e.target.value;
                          return { ...prev };
                        })
                      }
                      type="number"
                      required
                      className="form-control"
                    />
                  </div>
                  <div class="myFormColumnLeft col-md-6">
                    <label>Address</label>
                    <input
                      name="address"
                      value={values.address}
                      onChange={(e) =>
                        setValues((prev) => {
                          prev.address = e.target.value;
                          return { ...prev };
                        })
                      }
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <label>Comment</label>
                <textarea
                  name="comment"
                  value={values.comment}
                  onChange={(e) =>
                    setValues((prev) => {
                      prev.comment = e.target.value;
                      return { ...prev };
                    })
                  }
                  required
                  type="text"
                  className="form-control"
                />
                <br />
                <input
                  type="checkbox"
                  value={values.newsletter}
                  onChange={(e) =>
                    setValues((prev) => {
                      prev.newsletter = e.target.checked;
                      return { ...prev };
                    })
                  }
                />{" "}
                <label>Newsletter</label>
              </div>
              <br />

              {/* action button */}
              <div className="card-footer text-center border-top-0">
                <button
                  type="button"
                  onClick={onPrev}
                  className="btn btn-primary mr-1"
                >
                  Previous
                </button>
                {/* <button className="btn btn-secondary mr-1" type="reset">
                  Reset
                </button> */}
                <button type="submit" className="btn btn-primary mr-1">
                  Submit
                </button>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleBookingForm}>
						Save Changes
					</Button> */}
        </Modal.Footer>
      </Modal>

      <Modal
        show={statusModal}
        size="lg"
        backdrop="static"
        keyboard={false}
        onHide={() => setStatusModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Your Booking Has Been Created!</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setStatusModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => (window.location = stripeUrl)}
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MultipleDayBooking;
