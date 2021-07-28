import Cookies from 'js-cookie';
import request from './request';

const login = (payload) => request.post('/auth/login/customer', payload);
const register = (payload) => request.post('/auth/register/customer', payload);

const forgotPassword = (payload) => {
	return request.post('/auth/forgotpassword', payload, {
		headers: { Authorization: `Bearer ${Cookies.get('AUTH-TOKEN')}` },
	});
};
const resetPassword = (token, payload) => {
	return request.put('/auth/resetpassword/' + token, payload);
};
const addTrip = (payload) => {
	return request.post('/trips/addnew', payload, {
		headers: { Authorization: `Bearer ${Cookies.get('AUTH-TOKEN')}` },
	});
};
const updateProfile = (payload) => {
	return request.put('/auth/updatedetails', payload, {
		headers: { Authorization: `Bearer ${Cookies.get('AUTH-TOKEN')}` },
	});
};
const profile = () => {
	return request.get('/auth/profile', {
		headers: { Authorization: `Bearer ${Cookies.get('AUTH-TOKEN')}` },
	});
};

const updatePassword = (payload) => {
	return request.put('/auth/updatepassword', payload, {
		headers: { Authorization: `Bearer ${Cookies.get('AUTH-TOKEN')}` },
	});
};
const updateAvatar = (payload) => {
	return request.put('/auth/updateimage', payload, {
		headers: { Authorization: `Bearer ${Cookies.get('AUTH-TOKEN')}` },
	});
};

const newBooking = (payload, tripId) => {
	return request.post('/bookings/addnew/' + tripId, payload);
};
const getAllTrip = () => {
	return request.get('/trips/getAll');
};
const getTripById = (id) => {
	return request.get('/trips/get/' + id);
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
};
