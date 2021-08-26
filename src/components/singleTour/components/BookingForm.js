import React, { useState } from 'react';
import { Row, Col, Modal, Button, Form, ListGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

const BookingForm = ({ trip }) => {
	const [adult, setAdult] = useState(0);
	const [children, setChildren] = useState(0);
	const [bookingDate, setBookingDate] = useState(new Date());

	const [newsletter, setNewsletter] = useState(false);

	const [show, setShow] = useState(false);
	const [cabin, setCabin] = useState('');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
					<Form.Group>
						<Form.Control as='select' value={cabin} onChange={(e) => setCabin(e.target.value)}>
							<option value='' selected disabled>
								Select Cabin
							</option>
							<option value='interior'>Interior</option>
							<option value='exterior'>Exterior</option>
							<option value='balcony'>Balcony</option>
							<option value='suite'>Suite</option>
						</Form.Control>
					</Form.Group>
					{cabin && (
						<div className='row'>
							<div className='col-6'>
								<div className='form-group'>
									<label>Adults</label>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<button className='btn btn-secondary' name='adult'>
												-
											</button>
										</div>
										<input type='text' className='form-control text-center' value={values.adult} disabled />
										<div className='input-group-append'>
											<button className='btn btn-secondary' name='adult'>
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
											<button className='btn btn-secondary' name='children'>
												-
											</button>
										</div>
										<input
											type='text'
											className='form-control text-center'
											value={values.children}
											disabled
										/>
										<div className='input-group-append'>
											<button className='btn btn-secondary' name='children'>
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
			<div className='row'>
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
			<table className='table table_summary'>
				<tbody>
					<tr>
						<td>Adults</td>
						<td className='text-right'>
							{values.adult} x ${trip?.adultPrice} = {values.adult * trip?.adultPrice}
						</td>
					</tr>
					<tr>
						<td>Children</td>
						<td className='text-right'>
							{values.children} x ${trip?.childPrice} = {values.children * trip?.childPrice}
						</td>
					</tr>
					{/* <tr>
                    <td>Total amount</td>
                    <td className='text-right'>3x $52</td>
                </tr> */}
					<tr className='total'>
						<td>Total cost</td>
						<td className='text-right'>{values.adult * trip?.adultPrice + values.children * trip?.childPrice}</td>
					</tr>
				</tbody>
			</table>
			<button className='btn_full' onClick={() => values.adult && handleShow} disabled={values.adult ? false : true}>
				Book now
			</button>
			<a className='btn_full_outline' href='#'>
				<i className=' icon-heart'></i> Add to whislist
			</a>

			<Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Booking Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup horizontal className='mb-4'>
						<ListGroup.Item variant='primary'>
							Date: <strong>{moment(values.bookingDate).format('DD-MM-yyyy')}</strong>
						</ListGroup.Item>
						<ListGroup.Item variant='success'>
							Adult: <strong>{values.adult}</strong>
						</ListGroup.Item>
						<ListGroup.Item variant='info'>
							Children: <strong>{values.children}</strong>
						</ListGroup.Item>
						<ListGroup.Item variant='warning'>
							Total:
							<strong>$0</strong>
						</ListGroup.Item>
					</ListGroup>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Full Name</Form.Label>
							<Form.Control type='text' onChange={handleChange} name='fullName' value={values.fullName} />
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Address</Form.Label>
							<Form.Control type='text' onChange={handleChange} name='address' value={values.address} />
						</Form.Group>
						<Row>
							<Col xs={12} md={6}>
								<Form.Group className='mb-3'>
									<Form.Label>Email</Form.Label>
									<Form.Control type='email' onChange={handleChange} name='email' value={values.email} />
								</Form.Group>
							</Col>
							<Col xs={12} md={6}>
								<Form.Group className='mb-3'>
									<Form.Label>Phone</Form.Label>
									<Form.Control type='text' onChange={handleChange} name='phone' value={values.phone} />
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className='mb-3'>
							<Form.Label>Comment</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								onChange={handleChange}
								name='comment'
								value={values.comment}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='newsletter'>
							<Form.Check
								type='checkbox'
								label='Agree to receive promotional and updates'
								id='newsletter'
								name='newsletter'
								onChange={(e) => setValues({ ...values, [e.target.name]: e.target.checked })}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleBookingForm}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default BookingForm;
