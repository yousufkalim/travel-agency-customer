import React, { useState } from 'react';
import { Row, Col, Modal, Button, ListGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

// Form handling
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// form validation rules
const validationSchema = Yup.object().shape({
	numberOfAdults: Yup.string().required('Number of tickets is required'),
	adults: Yup.array().of(
		Yup.object().shape({
			firstName: Yup.string().required('FirstName is required'),
			lastName: Yup.string().required('LastName is required'),
			passportDNI: Yup.string().required('Passport or DNI is required'),
			nationality: Yup.string().required('Nationality is required'),
			dob: Yup.string().required('Birthday is required'),
			gender: Yup.string().required('Gender is required'),
		})
	),
});

const BookingForm = ({ trip }) => {
	const [adult, setAdult] = useState(0);
	const [children, setChildren] = useState(0);
	const [bookingDate, setBookingDate] = useState(new Date());

	const [newsletter, setNewsletter] = useState(false);

	const [show, setShow] = useState(false);
	const [cabin, setCabin] = useState({ name: '', adult: 0, children: 0, adultPrice: 0, childPrice: 0 });
	const handleClose = () => setShow(false);
	const handleShow = (e) => setShow(true);

	const [bookingInfo, setBookingInfo] = useState({
		adult: [{ name: '', email: '' }],
		children: [{ name: '', email: '' }],
	});
	const [values, setValues] = useState({
		fullName: '',
		address: '',
		email: '',
		phone: '',
		comment: '',
		bookingDate: new Date(),
		newsletter: false,
		adult: 0,
		children: 0,
	});

	const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

	const handleBookingForm = (e) => {
		e.preventDefault();
		let totalCost = values.adult * trip?.adultPrice + values.children * trip?.childPrice;
		var data = { ...values, totalCost: totalCost, trip: trip._id, agency: trip.agency._id };
		if (!values.fullName || !values.address || !values.email || !values.phone) {
			alert('All filed are required');
		} else {
			// API.newBooking(data, trip._id)
			// 	.then((res) => {
			// 		handleClose();
			// 		setNotify(true);
			// 		console.log(res);
			// 	})
			// 	.catch((err) => console.log(err));
		}
	};

	const [notify, setNotify] = useState(null);
	console.log(trip);

	const { register, handleSubmit, reset, watch, errors } = useForm({ validationSchema: validationSchema });

	// watch to enable re-render when ticket number is changed
	const watchNumberOfAdults = watch('numberOfAdults');

	// return array of ticket indexes for rendering dynamic forms in the template
	const ticketNumbers = () => [...Array(parseInt(watchNumberOfAdults || 0)).keys()];

	function onSubmit(data) {
		// display form data on success
		alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
	}
	console.log(watchNumberOfAdults);
	return (
		<div className='box_style_1 expose'>
			<h3 className='inner'>- Booking -</h3>
			<div className='row'>
				<div className='col-sm-12'>
					<div className='form-group'>
						<label>
							<i className='icon-calendar-7'></i> Select a date
						</label>
						<ReactDatePicker
							minDate={new Date()}
							dateFormat='dd/MM/yyyy'
							className='date-pick form-control form-control'
							selected={values.bookingDate}
							onChange={(date) => setValues({ ...values, ['bookingDate']: date })}
						/>
						{/* <input className='date-pick form-control' data-date-format='M d, D' type='date' /> */}
					</div>
					<select
						class='form-select'
						aria-label='Default select example'
						value={cabin.name}
						onChange={(e) => {
							setCabin({
								...cabin,
								['name']: e.target.value,
								['adultPrice']: trip[e.target.value]?.adultPrice,
								['childPrice']: trip[e.target.value]?.childPrice,
							});
						}}
					>
						<option value='' selected disabled>
							Open this select menu
						</option>
						<option value='interior'>
							Interior | ${trip.interior?.adultPrice} | ${trip.interior?.childPrice}
						</option>
						<option value='exterior'>
							Exterior | ${trip.exterior?.adultPrice} | ${trip.exterior?.childPrice}
						</option>
						<option value='balcony'>
							Balcony | ${trip.balcony?.adultPrice} | ${trip.balcony?.childPrice}
						</option>
						<option value='suite'>
							Suite | ${trip.suite?.adultPrice} | ${trip.suite?.childPrice}
						</option>
					</select>

					{cabin.name && (
						<div className='row d-none'>
							<div className='col-6'>
								<div className='form-group'>
									<label>Adults</label>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<button
												className='btn btn-secondary'
												onClick={(e) =>
													setCabin({ ...cabin, ['adult']: cabin.adult === 0 ? 0 : cabin.adult - 1 })
												}
											>
												-
											</button>
										</div>
										<input type='text' className='form-control text-center' value={cabin.adult} disabled />
										<div className='input-group-append'>
											<button
												className='btn btn-secondary'
												onClick={(e) =>
													setCabin({ ...cabin, ['adult']: cabin.adult === 10 ? 10 : cabin.adult + 1 })
												}
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className='col-6'>
								<div className='form-group'>
									<label>Children</label>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<button
												className='btn btn-secondary'
												onClick={(e) =>
													setCabin({
														...cabin,
														['children']: cabin.children === 0 ? 0 : cabin.children - 1,
													})
												}
											>
												-
											</button>
										</div>
										<input type='text' className='form-control text-center' value={cabin.children} disabled />
										<div className='input-group-append'>
											<button
												className='btn btn-secondary'
												onClick={(e) =>
													setCabin({
														...cabin,
														['children']: cabin.children === 10 ? 10 : cabin.children + 1,
													})
												}
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				{/* <div className='col-sm-6'>
                <div className='form-group'>
                    <label>
                        <i className=' icon-clock'></i> Time
                    </label>
                    <input className='time-pick form-control' value='12:00 AM' type='text' />
                </div>
            </div> */}
			</div>
			<div className='row d-none'>
				<div className='col-6'>
					<div className='form-group'>
						<label>Adults</label>
						<div className='input-group mb-3'>
							<div className='input-group-prepend'>
								<button
									className='btn btn-secondary'
									name='adult'
									onClick={(e) =>
										setValues({
											...values,
											[e.target.name]: values.adult === 0 ? 0 : values.adult - 1,
										})
									}
								>
									-
								</button>
							</div>
							<input type='text' className='form-control text-center' value={values.adult} disabled />
							<div className='input-group-append'>
								<button
									className='btn btn-secondary'
									name='adult'
									onClick={(e) =>
										setValues({
											...values,
											[e.target.name]: values.adult === 50 ? 50 : values.adult + 1,
										})
									}
								>
									+
								</button>
							</div>
						</div>
						{/* <div className='numbers-row'>
                        <input
                            type='text'
                            value='1'
                            id='adults'
                            className='qty2 form-control'
                            name='quantity'
                        />
                    </div> */}
					</div>
				</div>
				<div className='col-6'>
					<div className='form-group'>
						<label>Children</label>
						<div className='input-group mb-3'>
							<div className='input-group-prepend'>
								<button
									className='btn btn-secondary'
									name='children'
									onClick={(e) =>
										setValues({
											...values,
											[e.target.name]: values.children === 0 ? 0 : values.children - 1,
										})
									}
								>
									-
								</button>
							</div>
							<input type='text' className='form-control text-center' value={values.children} disabled />
							<div className='input-group-append'>
								<button
									className='btn btn-secondary'
									name='children'
									onClick={(e) =>
										setValues({
											...values,
											[e.target.name]: values.children === 50 ? 50 : values.children + 1,
										})
									}
								>
									+
								</button>
							</div>
						</div>
						{/* <div className='numbers-row'>
                        <input
                            type='text'
                            value='0'
                            id='children'
                            className='qty2 form-control'
                            name='quantity'
                        />
                    </div> */}
					</div>
				</div>
			</div>
			<br />
			<table className='table table_summary d-none'>
				<tbody>
					<tr>
						<td>Adults</td>
						<td className='text-right'>
							{cabin.adult} x ${cabin.adultPrice} = {cabin.adult * cabin.adultPrice}
						</td>
					</tr>
					<tr>
						<td>Children</td>
						<td className='text-right'>
							{cabin.children} x ${cabin.childPrice} = {cabin.children * cabin.childPrice}
						</td>
					</tr>
					{/* <tr>
                    <td>Total amount</td>
                    <td className='text-right'>3x $52</td>
                </tr> */}
					<tr className='total'>
						<td>Total cost</td>
						<td className='text-right'>${cabin.adult * cabin.adultPrice + cabin.children * cabin.childPrice}</td>
					</tr>
				</tbody>
			</table>
			<button className='btn_full' onClick={cabin.name && handleShow} disabled={cabin.name ? false : true}>
				Continue
			</button>

			{/* Booking Modal Window */}
			<Modal show={show} size='xl' onHide={handleClose} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Booking Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
						<div className='container'>
							<div className='row'>
								<div className='col-md-4'>
									<div className='row'>
										<div className='col-md-12'>
											<label>Number of Tickets</label>
											<select
												onChange={(e) => setCabin({ ...cabin, ['adult']: e.target.value })}
												name='numberOfAdults'
												ref={register}
												className={`form-control ${errors.numberOfAdults ? 'is-invalid' : ''}`}
											>
												{['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
													<option key={i} value={i}>
														{i}
													</option>
												))}
											</select>
											<div className='invalid-feedback'>{errors.numberOfAdults?.message}</div>
										</div>
									</div>

									<div className='row'>
										<div class='col-md-12'>
											{ticketNumbers().map((i) => (
												<div key={i}>
													<h5>Ticket {i + 1}</h5>
													<div class='form-group row'>
														<div class='myFormColumnLeft col-md-6'>
															<label>FirstName</label>
															<input
																name={`adults[${i}]firstName`}
																ref={register}
																type='text'
																className={`form-control ${
																	errors.adults?.[i]?.firstName ? 'is-invalid' : ''
																}`}
															/>
															<div className='invalid-feedback'>
																{errors.adults?.[i]?.firstName?.message}
															</div>
														</div>

														<div class='myFormColumnRight col-md-6'>
															<label>LastName</label>
															<input
																name={`adults[${i}]lastName`}
																ref={register}
																type='text'
																className={`form-control ${
																	errors.adults?.[i]?.lastName ? 'is-invalid' : ''
																}`}
															/>
															<div className='invalid-feedback'>
																{errors.adults?.[i]?.lastName?.message}
															</div>
														</div>
													</div>
													<div class='form-group row'>
														<div class='myFormColumnLeft col-md-6'>
															<label>passportDNI</label>
															<input
																name={`adults[${i}]passportDNI`}
																ref={register}
																type='text'
																className={`form-control ${
																	errors.adults?.[i]?.passportDNI ? 'is-invalid' : ''
																}`}
															/>
															<div className='invalid-feedback'>
																{errors.adults?.[i]?.passportDNI?.message}
															</div>
														</div>

														<div class='myFormColumnRight col-md-6'>
															<label>nationality</label>
															<input
																name={`adults[${i}]nationality`}
																ref={register}
																type='text'
																className={`form-control ${
																	errors.adults?.[i]?.nationality ? 'is-invalid' : ''
																}`}
															/>
															<div className='invalid-feedback'>
																{errors.adults?.[i]?.nationality?.message}
															</div>
														</div>
													</div>
													<div class='form-group row'>
														<div class='myFormColumnRight col-md-6'>
															<label>dob</label>
															<input
																name={`adults[${i}]dob`}
																ref={register}
																type='text'
																className={`form-control ${
																	errors.adults?.[i]?.dob ? 'is-invalid' : ''
																}`}
															/>
															<div className='invalid-feedback'>{errors.adults?.[i]?.dob?.message}</div>
														</div>

														<div class='myFormColumnRight col-md-6'>
															<label>Gender</label>
															<input
																name={`adults[${i}]gender`}
																ref={register}
																type='text'
																className={`form-control ${
																	errors.adults?.[i]?.gender ? 'is-invalid' : ''
																}`}
															/>
															<div className='invalid-feedback'>
																{errors.adults?.[i]?.gender?.message}
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className='col-md-4'></div>
								<div className='col-md-4'>
									{' '}
									<table className='table table_summary'>
										<tbody>
											<tr>
												<td>Adults</td>
												<td className='text-right'>
													{cabin.adult} x ${cabin.adultPrice} = {cabin.adult * cabin.adultPrice}
												</td>
											</tr>
											<tr>
												<td>Children</td>
												<td className='text-right'>
													{cabin.children} x ${cabin.childPrice} = {cabin.children * cabin.childPrice}
												</td>
											</tr>
											{/* <tr>
                    <td>Total amount</td>
                    <td className='text-right'>3x $52</td>
                </tr> */}
											<tr className='total'>
												<td>Total cost</td>
												<td className='text-right'>
													${cabin.adult * cabin.adultPrice + cabin.children * cabin.childPrice}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div className='card-footer text-center border-top-0'>
							<button type='submit' className='btn btn-primary mr-1'>
								Buy Tickets
							</button>
							<button className='btn btn-secondary mr-1' type='reset'>
								Reset
							</button>
						</div>
					</form>
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
		</div>
	);
};

export default BookingForm;
