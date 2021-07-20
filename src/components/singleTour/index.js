import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Modal, Button, Form, ListGroup } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import SweetAlert from 'react-bootstrap-sweetalert';

import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-datepicker/dist/react-datepicker.css';

import API from '../../services/api';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

const imagess = [
	{
		original: 'https://picsum.photos/id/1018/1000/600/',
		thumbnail: 'https://picsum.photos/id/1018/1000/600/',
	},
	{
		original: 'https://picsum.photos/id/1015/1000/600/',
		thumbnail: 'https://picsum.photos/id/1015/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1019/1000/600/',
		thumbnail: 'https://picsum.photos/id/1019/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1020/1000/600/',
		thumbnail: 'https://picsum.photos/id/1020/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1021/1000/600/',
		thumbnail: 'https://picsum.photos/id/1021/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1022/1000/600/',
		thumbnail: 'https://picsum.photos/id/1022/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1023/1000/600/',
		thumbnail: 'https://picsum.photos/id/1023/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1024/1000/600/',
		thumbnail: 'https://picsum.photos/id/1024/250/150/',
	},
];

function SingleTour({ match, history }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [trip, setTrip] = useState({});
	const [adult, setAdult] = useState(0);
	const [children, setChildren] = useState(0);
	const [bookingDate, setBookingDate] = useState(new Date());

	const [newsletter, setNewsletter] = useState(false);

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

	const [images, setImages] = useState([]);

	useEffect(() => {
		API.getTripById(match.params.tripid)
			.then(({ data }) => {
				setTrip(data.data);
				console.log(data);
				setImages(
					data.data.gallery.map((img) => {
						return {
							original: 'http://localhost:5000/uploads/' + img,
							thumbnail: 'http://localhost:5000/uploads/' + img,
						};
					})
				);
			})
			.catch(({ response }) => {
				history.push('/');
			});
	}, []);
	const [notify, setNotify] = useState(null);

	const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

	const handleBookingForm = (e) => {
		e.preventDefault();
		let totalCost = values.adult * trip?.adultPrice + values.children * trip?.childPrice;
		var data = { ...values, totalCost: totalCost, trip: trip._id, agency: trip.agency._id };
		if (!values.fullName || !values.address || !values.email || !values.phone) {
			alert('All filed are required');
		} else {
			API.newBooking(data, trip._id)
				.then((res) => {
					handleClose();
					setNotify(true);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<>
			{notify && (
				<SweetAlert
					style
					success
					confirmBtnText='okay'
					confirmBtnBsStyle='success'
					title='Booking Confirmed!'
					onConfirm={() => {
						setNotify(null);
						window.location.reload();
					}}
				>
					Your booking has been confirmed. Please check your email for the details. Thank you.
				</SweetAlert>
			)}
			<section
				class='parallax-window'
				data-parallax='scroll'
				data-image-src='http://www.ansonika.com/citytours/img/single_tour_bg_1.jpg'
				data-natural-width='1400'
				data-natural-height='470'
				style={{
					background: 'url(http://www.ansonika.com/citytours/img/single_tour_bg_1.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}
			>
				<div class='parallax-content-2'>
					<div class='container'>
						<div class='row'>
							<div class='col-md-8'>
								<h1>Arc de Triomphe</h1>
								<span>Champ de Mars, 5 Avenue Anatole, 75007 Paris.</span>
								<span class='rating'>
									<i class='icon-smile voted'></i>
									<i class='icon-smile voted'></i>
									<i class='icon-smile voted'></i>
									<i class='icon-smile voted'></i>
									<i class='icon-smile'></i>
									<small>(75)</small>
								</span>
							</div>
							<div class='col-md-4'>
								<div id='price_single_main'>
									from/per person
									<span>
										<sup>$</sup>
										{trip?.adultPrice}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<main>
				<div id='position'>
					<div class='container'>
						<ul>
							<li>
								<a href='#'>Home</a>
							</li>
							<li>
								<a href='#'>Category</a>
							</li>
							<li>Page active</li>
						</ul>
					</div>
				</div>

				<div class='collapse' id='collapseMap'>
					<div id='map' class='map'></div>
				</div>

				<div class='container margin_60'>
					<div class='row'>
						<div class='col-lg-8' id='single_tour_desc'>
							<div id='single_tour_feat'>
								<ul>
									<li>
										<i class='icon_set_1_icon-4'></i>Museum
									</li>
									<li>
										<i class='icon_set_1_icon-83'></i>3 Hours
									</li>
									<li>
										<i class='icon_set_1_icon-13'></i>Accessibiliy
									</li>
									<li>
										<i class='icon_set_1_icon-82'></i>144 Likes
									</li>
									<li>
										<i class='icon_set_1_icon-22'></i>Pet allowed
									</li>
									<li>
										<i class='icon_set_1_icon-97'></i>Audio guide
									</li>
									<li>
										<i class='icon_set_1_icon-29'></i>Tour guide
									</li>
								</ul>
							</div>

							<p class='d-none d-md-block d-block d-lg-none'>
								<a
									class='btn_map'
									data-toggle='collapse'
									href='#collapseMap'
									aria-expanded='false'
									aria-controls='collapseMap'
									data-text-swap='Hide map'
									data-text-original='View on map'
								>
									View on map
								</a>
							</p>

							<div id='Img_carousel' class='slider-pro'>
								<ImageGallery autoPlay={true} items={images} />
							</div>
							<hr />
							<div class='row'>
								<div class='col-lg-3'>
									<h3>Presentation</h3>
								</div>
								<div class='col-lg-9'>
									<h4>{trip?.city?.toUpperCase()} in love</h4>
									<p>{trip?.presentation}</p>
								</div>
							</div>
							<hr />
							<div class='row'>
								<div class='col-lg-3'>
									<h3>Description</h3>
								</div>
								<div class='col-lg-9'>
									<p>{trip?.description}</p>
									<div className='row'>
										<div class='col-md-6'>
											<h4>What's include</h4>
											<div class='ml-2'>
												<ul class='list_ok'>
													{trip?.includes?.map((item) => (
														<li>{item}</li>
													))}
												</ul>
											</div>
										</div>
										<div class='col-md-6'>
											<h4>What's exclude</h4>
											<div class='ml-2'>
												<ul class='list_ok_no'>
													{trip?.excludes?.map((item) => (
														<li>{item}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							<hr />

							<div class='row'>
								<div class='col-lg-3'>
									<h3>Schedule</h3>
								</div>
								<div class='col-lg-9'>
									<div class='table-responsive'>
										<table class='table table-striped'>
											<thead>
												<tr>
													<th colspan='2'>1st March to 31st October</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Monday</td>
													<td>10.00 - 17.30</td>
												</tr>
												<tr>
													<td>Tuesday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Wednesday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Thursday</td>
													<td>
														<span class='label label-danger'>Closed</span>
													</td>
												</tr>
												<tr>
													<td>Friday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Saturday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Sunday</td>
													<td>10.00 - 17.30</td>
												</tr>
												<tr>
													<td>
														<strong>
															<em>Last Admission</em>
														</strong>
													</td>
													<td>
														<strong>17.00</strong>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class='table-responsive'>
										<table class='table table-striped'>
											<thead>
												<tr>
													<th colspan='2'>1st November to 28th February</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Monday</td>
													<td>10.00 - 17.30</td>
												</tr>
												<tr>
													<td>Tuesday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Wednesday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Thursday</td>
													<td>
														<span class='label label-danger'>Closed</span>
													</td>
												</tr>
												<tr>
													<td>Friday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Saturday</td>
													<td>09.00 - 17.30</td>
												</tr>
												<tr>
													<td>Sunday</td>
													<td>10.00 - 17.30</td>
												</tr>
												<tr>
													<td>
														<strong>
															<em>Last Admission</em>
														</strong>
													</td>
													<td>
														<strong>17.00</strong>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>

							<hr />

							<div class='row'>
								<div class='col-lg-3'>
									<h3>Reviews </h3>
									<a href='#' class='btn_1 add_bottom_30' data-toggle='modal' data-target='#myReview'>
										Leave a review
									</a>
								</div>
								<div class='col-lg-9'>
									<div id='general_rating'>
										11 Reviews
										<div class='rating'>
											<i class='icon-smile voted'></i>
											<i class='icon-smile voted'></i>
											<i class='icon-smile voted'></i>
											<i class='icon-smile'></i>
											<i class='icon-smile'></i>
										</div>
									</div>

									<div class='row' id='rating_summary'>
										<div class='col-md-6'>
											<ul>
												<li>
													Position
													<div class='rating'>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile'></i>
														<i class='icon-smile'></i>
													</div>
												</li>
												<li>
													Tourist guide
													<div class='rating'>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile'></i>
													</div>
												</li>
											</ul>
										</div>
										<div class='col-md-6'>
											<ul>
												<li>
													Price
													<div class='rating'>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile'></i>
														<i class='icon-smile'></i>
													</div>
												</li>
												<li>
													Quality
													<div class='rating'>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
														<i class='icon-smile voted'></i>
													</div>
												</li>
											</ul>
										</div>
									</div>

									<hr />

									<div class='review_strip_single last'>
										<img
											src={`${window.location.origin}/img/avatar2.jpg`}
											alt='Image'
											class='rounded-circle'
										/>
										<small> - 10 March 2015 -</small>
										<h4>Jhon Doe</h4>
										<p>
											"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a lorem quis neque
											interdum consequat ut sed sem. Duis quis tempor nunc. Interdum et malesuada fames ac
											ante ipsum primis in faucibus."
										</p>
										<div class='rating'>
											<i class='icon-smile voted'></i>
											<i class='icon-smile voted'></i>
											<i class='icon-smile voted'></i>
											<i class='icon-smile'></i>
											<i class='icon-smile'></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<aside class='col-lg-4'>
							{/* <p class='d-none d-xl-block d-lg-block d-xl-none'>
								<a
									class='btn_map'
									data-toggle='collapse'
									href='#collapseMap'
									aria-expanded='false'
									aria-controls='collapseMap'
									data-text-swap='Hide map'
									data-text-original='View on map'
								>
									View on map
								</a>
							</p> */}
							<div class='box_style_1 expose'>
								<h3 class='inner'>- Booking -</h3>
								<div class='row'>
									<div class='col-sm-12'>
										<div class='form-group'>
											<label>
												<i class='icon-calendar-7'></i> Select a date
											</label>
											<ReactDatePicker
												minDate={new Date()}
												dateFormat='dd/MM/yyyy'
												className='date-pick form-control form-control'
												selected={values.bookingDate}
												onChange={(date) => setValues({ ...values, ['bookingDate']: date })}
											/>
											{/* <input class='date-pick form-control' data-date-format='M d, D' type='date' /> */}
										</div>
									</div>
									{/* <div class='col-sm-6'>
										<div class='form-group'>
											<label>
												<i class=' icon-clock'></i> Time
											</label>
											<input class='time-pick form-control' value='12:00 AM' type='text' />
										</div>
									</div> */}
								</div>
								<div class='row'>
									<div class='col-6'>
										<div class='form-group'>
											<label>Adults</label>
											<div class='input-group mb-3'>
												<div class='input-group-prepend'>
													<button
														class='btn btn-secondary'
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
												<input type='text' class='form-control text-center' value={values.adult} disabled />
												<div class='input-group-append'>
													<button
														class='btn btn-secondary'
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
											{/* <div class='numbers-row'>
												<input
													type='text'
													value='1'
													id='adults'
													class='qty2 form-control'
													name='quantity'
												/>
											</div> */}
										</div>
									</div>
									<div class='col-6'>
										<div class='form-group'>
											<label>Children</label>
											<div class='input-group mb-3'>
												<div class='input-group-prepend'>
													<button
														class='btn btn-secondary'
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
												<input
													type='text'
													class='form-control text-center'
													value={values.children}
													disabled
												/>
												<div class='input-group-append'>
													<button
														class='btn btn-secondary'
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
											{/* <div class='numbers-row'>
												<input
													type='text'
													value='0'
													id='children'
													class='qty2 form-control'
													name='quantity'
												/>
											</div> */}
										</div>
									</div>
								</div>
								<br />
								<table class='table table_summary'>
									<tbody>
										<tr>
											<td>Adults</td>
											<td class='text-right'>
												{values.adult} x ${trip?.adultPrice} = {values.adult * trip?.adultPrice}
											</td>
										</tr>
										<tr>
											<td>Children</td>
											<td class='text-right'>
												{values.children} x ${trip?.childPrice} = {values.children * trip?.childPrice}
											</td>
										</tr>
										{/* <tr>
											<td>Total amount</td>
											<td class='text-right'>3x $52</td>
										</tr> */}
										<tr class='total'>
											<td>Total cost</td>
											<td class='text-right'>
												{values.adult * trip?.adultPrice + values.children * trip?.childPrice}
											</td>
										</tr>
									</tbody>
								</table>
								<button
									class='btn_full'
									onClick={values.adult && handleShow}
									disabled={values.adult ? false : true}
								>
									Book now
								</button>
								<a class='btn_full_outline' href='#'>
									<i class=' icon-heart'></i> Add to whislist
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
												<strong>
													${values.adult * trip?.adultPrice + values.children * trip?.childPrice}
												</strong>
											</ListGroup.Item>
										</ListGroup>
										<Form>
											<Form.Group className='mb-3'>
												<Form.Label>Full Name</Form.Label>
												<Form.Control
													type='text'
													onChange={handleChange}
													name='fullName'
													value={values.fullName}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Address</Form.Label>
												<Form.Control
													type='text'
													onChange={handleChange}
													name='address'
													value={values.address}
												/>
											</Form.Group>
											<Row>
												<Col xs={12} md={6}>
													<Form.Group className='mb-3'>
														<Form.Label>Email</Form.Label>
														<Form.Control
															type='email'
															onChange={handleChange}
															name='email'
															value={values.email}
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className='mb-3'>
														<Form.Label>Phone</Form.Label>
														<Form.Control
															type='text'
															onChange={handleChange}
															name='phone'
															value={values.phone}
														/>
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

							<div class='box_style_4'>
								<i class='icon_set_1_icon-90'></i>
								<h4>
									<span>Book</span> by phone
								</h4>
								<a href='tel://004542344599' class='phone'>
									{trip?.agency?.phone}
								</a>
								<small>Monday to Friday 9.00am - 7.30pm</small>
							</div>
						</aside>
					</div>
				</div>

				<div id='overlay'></div>
			</main>
		</>
	);
}

export default withRouter(SingleTour);
