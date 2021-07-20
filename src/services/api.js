import Cookies from 'js-cookie';
import request from './request';

const login = (payload) => request.post('/auth/login', payload);

const addTrip = (payload) => {
	return request.post('/trips/addnew', payload, {
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

export default { login, addTrip, getAllTrip, getTripById, newBooking };
