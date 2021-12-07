import { useEffect } from "react";
import { useState } from "react";
import API from "../../services/api";
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import { updateProfile } from "../../services/api";

function Dashboard({ user, setUser }) {
  ///states
  const [input, setInput] = useState();
  const [notify, setNotify] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ type: "", message: "" });

  // setting user for input fields
  useEffect(() => {
    setInput(user);
  }, [user]);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    ImageViewer(file);
  };

  const ImageViewer = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateAvatar(reader.result);
    };
  };

  const updateAvatar = (base64EncodedImage) => {
    console.log(base64EncodedImage);
    API.updateAvatar({ avatar: base64EncodedImage })
      .then(({ data }) => {
        setInput(data.user);
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        address: {
          ...prev.address,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  ////submit to update profile data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      birthday: input.birthday,
      gender: input.gender,
      address: {
        city: input.address.city,
        address: input.address.address,
        zipcode: input.address.zipcode,
        country: input.address.country,
      },
    };
    const res = await updateProfile(user._id, data);
    setUser(res.data.data);
  };

  // submit for update password form
  const updatePasswordForm = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword || !currentPassword) {
      setError({ type: "danger", message: "All field are required!" });
    } else if (newPassword !== confirmPassword) {
      setError({ type: "danger", message: "Confirm password do not match!" });
    } else {
      API.updatePassword({ currentPassword, newPassword })
        .then((res) => {
          setError({
            type: "success",
            message: "Password updated successfully!",
          });
        })
        .catch(({ response }) => {
          console.log(response.data);
          setError({ type: "danger", message: response.data.error });
        });
    }
  };
  return (
    <main>
      {notify && (
        <SweetAlert
          style
          success
          confirmBtnText="okay"
          confirmBtnBsStyle="success"
          title="Profile updated"
          onConfirm={() => {
            setNotify(false);
            window.location.reload();
          }}
        >
          Your Profile as been updated success
        </SweetAlert>
      )}

      <div id="position">
        <div className="container">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Category</a>
            </li>
            <li>Page active</li>
          </ul>
        </div>
      </div>

      <div
        className="margin_60 container"
        id="tabs"
        className="tabs"
        style={{ marginTop: "50px" }}
      >
        <nav>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                id="home-tab"
                data-toggle="tab"
                href="#booking"
                role="tab"
                className="nav-link active icon-booking"
              >
                <span> Bookings</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="icon-wishlist nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#wishlist"
                role="tab"
              >
                <span> Wishlist</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                id="contact-tab"
                data-toggle="tab"
                href="#setting"
                role="tab"
                className="icon-settings nav-link"
              >
                <span> Settings</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#section-4"
                className="icon-profile nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                <span> Profile</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="booking"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="content">
              <section id="section-1">
                <div id="tools">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 col-6">
                      <div className="styled-select-filters">
                        <select name="sort_type" id="sort_type">
                          <option value="" selected>
                            Sort by type
                          </option>
                          <option value="tours">Tours</option>
                          <option value="hotels">Hotels</option>
                          <option value="transfers">Transfers</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-6">
                      <div className="styled-select-filters">
                        <select name="sort_date" id="sort_date">
                          <option value="" selected>
                            Sort by date
                          </option>
                          <option value="oldest">Oldest</option>
                          <option value="recent">Recent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="strip_booking">
                  <div className="row">
                    <div className="col-lg-2 col-md-2">
                      <div className="date">
                        <span className="month">Dec</span>
                        <span className="day">
                          <strong>23</strong>Sat
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-5">
                      <h3 className="hotel_booking">
                        Hotel Mariott Paris<span>2 Adults / 2 Nights</span>
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-3">
                      <ul className="info_booking">
                        <li>
                          <strong>Booking id</strong> 23442
                        </li>
                        <li>
                          <strong>Booked on</strong> Sat. 23 Dec. 2015
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="booking_buttons">
                        <a href="#0" className="btn_2">
                          Edit
                        </a>
                        <a href="#0" className="btn_3">
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div
            className="tab-pane fade content"
            id="wishlist"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <section id="section-2">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="hotel_container">
                    <div className="img_container">
                      <a href="single_hotel.html">
                        <img
                          src="img/hotel_1.jpg"
                          width="800"
                          height="533"
                          className="img-fluid"
                          alt="Image"
                        />
                        <div className="ribbon top_rated"></div>
                        <div className="score">
                          <span>7.5</span>Good
                        </div>
                        <div className="short_info hotel">
                          From/Per night
                          <span className="price">
                            <sup>$</sup>59
                          </span>
                        </div>
                      </a>
                    </div>
                    <div className="hotel_title">
                      <h3>
                        <strong>Park Hyatt</strong> Hotel
                      </h3>
                      <div className="rating">
                        <i className="icon-star voted"></i>
                        <i className="icon-star voted"></i>
                        <i className="icon-star voted"></i>
                        <i className="icon-star voted"></i>
                        <i className="icon-star-empty"></i>
                      </div>

                      <div className="wishlist_close_admin">-</div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn_1 green">
                Update wishlist
              </button>
            </section>
          </div>
          <div
            className="tab-pane fade content"
            id="setting"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <section id="section-3">
              <form noValidate onSubmit={updatePasswordForm}>
                <div className="row">
                  <div className="col-md-12">
                    <h4>Change your password</h4>
                  </div>
                  <div className="col-md-4 ">
                    <div className="form-group">
                      <label>Old password</label>
                      <input
                        className="form-control"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>New password</label>
                      <input
                        className="form-control"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Confirm new password</label>
                      <input
                        className="form-control"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 add_bottom_30 d-none">
                    <h4>Change your email</h4>
                    <div className="form-group">
                      <label>Old email</label>
                      <input
                        className="form-control"
                        name="old_password"
                        id="old_password"
                        type="password"
                      />
                    </div>
                    <div className="form-group">
                      <label>New email</label>
                      <input
                        className="form-control"
                        name="new_password"
                        id="new_password"
                        type="password"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm new email</label>
                      <input
                        className="form-control"
                        name="confirm_new_password"
                        id="confirm_new_password"
                        type="password"
                      />
                    </div>
                    <button type="submit" className="btn_1 green">
                      Update Email
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {error.message && (
                      <div className={`alert alert-${error.type}`}>
                        {error.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <button type="submit" className="btn_1 green float-right">
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
              <div className="row d-none">
                <div className="col-lg-6">
                  <h4>Notification settings</h4>
                  <table className="table table-striped options_cart">
                    <tbody>
                      <tr>
                        <td style={{ width: "10%" }}>
                          <i className="icon_set_1_icon-33"></i>
                        </td>
                        <td style={{ width: "60%" }}>New Citytours Tours</td>
                        <td style={{ width: "35%" }}>
                          <label className="switch-light switch-ios pull-right">
                            <input
                              type="checkbox"
                              name="option_1"
                              id="option_1"
                              checked
                              value=""
                            />
                            <span>
                              <span>No</span>
                              <span>Yes</span>
                            </span>
                            <a></a>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="icon_set_1_icon-6"></i>
                        </td>
                        <td>New Citytours Hotels</td>
                        <td>
                          <label className="switch-light switch-ios pull-right">
                            <input
                              type="checkbox"
                              name="option_2"
                              id="option_2"
                              value=""
                            />
                            <span>
                              <span>No</span>
                              <span>Yes</span>
                            </span>
                            <a></a>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="icon_set_1_icon-26"></i>
                        </td>
                        <td>New Citytours Transfers</td>
                        <td>
                          <label className="switch-light switch-ios pull-right">
                            <input
                              type="checkbox"
                              name="option_3"
                              id="option_3"
                              value=""
                              checked
                            />
                            <span>
                              <span>No</span>
                              <span>Yes</span>
                            </span>
                            <a></a>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="icon_set_1_icon-81"></i>
                        </td>
                        <td>New Citytours special offers</td>
                        <td>
                          <label className="switch-light switch-ios pull-right">
                            <input
                              type="checkbox"
                              name="option_4"
                              id="option_4"
                              value=""
                            />
                            <span>
                              <span>No</span>
                              <span>Yes</span>
                            </span>
                            <a></a>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" className="btn_1 green">
                    Update notifications settings
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div
            className="tab-pane fade content"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <section id="section-4">
              <div className="row">
                <div className="col-md-6">
                  <h4>Your profile</h4>
                  <ul id="profile_summary">
                    <li>
                      Full Name <span>{user?.fullName}</span>
                    </li>
                    <li>
                      Email <span>{user?.email}</span>
                    </li>
                    <li>
                      Phone number <span>{user?.phone}</span>
                    </li>
                    <li>
                      Date of birth
                      <span>
                        {user?.birthday ? (
                          moment(user?.birthday).format("DD-MMMM-yyyy")
                        ) : (
                          <div style={{ color: "red" }}>Not Provided</div>
                        )}
                      </span>
                    </li>
                    <li>
                      Gender{" "}
                      <span>
                        {user?.gender ? (
                          user.gender
                        ) : (
                          <div style={{ color: "red" }}>Not Provided</div>
                        )}
                      </span>
                    </li>
                    <li>
                      Address{" "}
                      <span>
                        {user?.address?.address ? (
                          user?.address?.address
                        ) : (
                          <div style={{ color: "red" }}>Not Provided</div>
                        )}
                      </span>
                    </li>
                    <li>
                      Town/City{" "}
                      <span>
                        {user?.address?.city ? (
                          user?.address?.city
                        ) : (
                          <div style={{ color: "red" }}>Not Provided</div>
                        )}
                      </span>
                    </li>
                    <li>
                      Zip code{" "}
                      <span>
                        {user?.address?.zipcode ? (
                          user?.address?.zipcode
                        ) : (
                          <div style={{ color: "red" }}>Not Provided</div>
                        )}
                      </span>
                    </li>
                    <li>
                      Country{" "}
                      <span>
                        {user?.address?.country ? (
                          user?.address?.country
                        ) : (
                          <div style={{ color: "red" }}>Not Provided</div>
                        )}
                      </span>
                    </li>
                    <li>
                      Verified <span>{user?.isVerified ? "Yes" : "No"}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <img
                        src={`${user?.avatar?.url || "img/avatar.png"}`}
                        alt="Profile picture"
                        className="img-fluid styled profile_pic"
                        width="250"
                        height="250"
                      />
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-6 offset-md-6">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleProfilePicChange}
                      />
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="divider"></div>
              <form noValidate onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <h4>Edit profile</h4>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        className="form-control"
                        name="fullName"
                        type="text"
                        onChange={handleChange}
                        value={input?.fullName}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        value={input?.email}
                        type="email"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Phone number</label>
                      <input
                        className="form-control"
                        name="phone"
                        type="text"
                        onChange={handleChange}
                        value={input?.phone}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        Date of birth <small>(mm/dd/yyyy)</small>
                      </label>
                      <input
                        className="form-control"
                        name="birthday"
                        type="date"
                        onChange={handleChange}
                        value={input?.birthday}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Gender</label>

                      <select
                        className="form-control"
                        name="gender"
                        onChange={handleChange}
                        value={input?.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        className="form-control"
                        name="country"
                        type="text"
                        onChange={handleAddressChange}
                        value={input?.address?.country}
                      />
                      {/* <select id='country' className='form-control' name='country'>
											<option value=''>Select...</option>
										</select> */}
                    </div>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <h4>Edit address</h4>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        className="form-control"
                        name="address"
                        type="text"
                        onChange={handleAddressChange}
                        value={input?.address?.address}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>City/Town</label>
                      <input
                        className="form-control"
                        name="city"
                        type="text"
                        onChange={handleAddressChange}
                        value={input?.address?.city}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Zipcode</label>
                      <input
                        className="form-control"
                        name="zipcode"
                        type="text"
                        onChange={handleAddressChange}
                        value={input?.address?.zipcode}
                      />
                    </div>
                  </div>
                </div>

                {/* <hr />
								<div className='row'>
									<div className='col-md-12'>
										<h4>Upload photo</h4>
										<div className='form-inline upload_1'>
											<div className='form-group'>
												<input type='file' name='files[]' id='js-upload-files' multiple />
											</div>
											<button type='submit' className='btn_1 green' id='js-upload-submit'>
												Upload file
											</button>
										</div>
									</div>
								</div> */}
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-info float-right"
                      disabled={
                        !input?.fullName || !input?.email || !input?.phone
                      }
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
