import Cookies from "js-cookie";
import request from "./request";

const login = (payload) => request.post("/auth/login/customer", payload);
const register = (payload) => request.post("/auth/register/customer", payload);

const forgotPassword = (payload) => {
  return request.post("/auth/forgotpassword", payload, {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};
const resetPassword = (token, payload) => {
  return request.put("/auth/resetpassword/" + token, payload);
};
const addTrip = (payload) => {
  return request.post("/trips/addnew", payload, {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};
const updateProfile = (payload) => {
  return request.put("/auth/updatedetails", payload, {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};
const profile = () => {
  return request.get("/auth/profile", {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};

const updatePassword = (payload) => {
  return request.put("/auth/updatepassword", payload, {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};
const updateAvatar = (payload) => {
  return request.put("/auth/updateimage", payload, {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};

const newBooking = (payload, tripId) => {
  return request.post("/bookings/addnew/" + tripId, payload);
};
const getAllTrip = () => {
  return request.get("/trips/getAll");
};
const getTripById = (id) => {
  return request.get("/trips/get/" + id);
};

// add new booking api
const addBooking = (payload, id) => {
  return request.post(`/bookings/addnew/${id}`, payload, {
    headers: { Authorization: `Bearer ${Cookies.get("AUTH-TOKEN")}` },
  });
};

// checkout action
export const checkout = async (payload) => {
  return request.post("/bookings/checkout", payload, {
    withCredentials: true,
  });
};

// checkout action
export const allAgencies = async () => {
  return request.get("/agency/getAll", {
    withCredentials: true,
  });
};

// get trip by id of agency
export const getTripByAgencyId = (id) => {
  return request.get(`/trips/getTripByAgencyId/${id}`, {
    withCredentials: true,
  });
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  addTrip,
  getAllTrip,
  getTripById,
  newBooking,
  profile,
  updateProfile,
  updatePassword,
  updateAvatar,
  addBooking,
  checkout,
};
