import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import ImageGallery from 'react-image-gallery';
import SweetAlert from 'react-bootstrap-sweetalert';

import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-datepicker/dist/react-datepicker.css';

import API from '../../services/api';

import BookingForm from './components/BookingForm';

function SingleTour({ match, history }) {
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

	const [gallery, setGallery] = useState([
		{
			original: 'https://via.placeholder.com/1000x600?text=No+Image+1',
			thumbnail: 'https://via.placeholder.com/250x150?text=No+Gallery+Image',
		},
	]);

	useEffect(() => {
		API.getTripById(match.params.tripid)
			.then(({ data }) => {
				setTrip(data.trip);
				console.log(data);
				// setImages(
				// 	data.data.gallery.map((img) => {
				// 		return {
				// 			original: 'http://api.crmviagens.com/uploads/' + img,
				// 			thumbnail: 'http://api.crmviagens.com/uploads/' + img,
				// 		};
				// 	})
				// );
			})
			.catch(({ response }) => {
				console.log(response);
				history.push('/');
			});
	}, []);
	const [notify, setNotify] = useState(null);

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
				className='parallax-window'
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
				<div className='parallax-content-2'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-8'>
								<h1>Arc de Triomphe</h1>
								<span>Champ de Mars, 5 Avenue Anatole, 75007 Paris.</span>
								<span className='rating'>
									<i className='icon-smile voted'></i>
									<i className='icon-smile voted'></i>
									<i className='icon-smile voted'></i>
									<i className='icon-smile voted'></i>
									<i className='icon-smile'></i>
									<small>(75)</small>
								</span>
							</div>
							<div className='col-md-4'>
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
					<div className='container'>
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

				<div className='collapse' id='collapseMap'>
					<div id='map' className='map'></div>
				</div>

				<div className='container margin_60'>
					<div className='row'>
						<div className='col-lg-8' id='single_tour_desc'>
							<div id='single_tour_feat'>
								<ul>
									<li>
										<i className='icon_set_1_icon-4'></i>Museum
									</li>
									<li>
										<i className='icon_set_1_icon-83'></i>3 Hours
									</li>
									<li>
										<i className='icon_set_1_icon-13'></i>Accessibiliy
									</li>
									<li>
										<i className='icon_set_1_icon-82'></i>144 Likes
									</li>
									<li>
										<i className='icon_set_1_icon-22'></i>Pet allowed
									</li>
									<li>
										<i className='icon_set_1_icon-97'></i>Audio guide
									</li>
									<li>
										<i className='icon_set_1_icon-29'></i>Tour guide
									</li>
								</ul>
							</div>

							<p className='d-none d-md-block d-block d-lg-none'>
								<a
									className='btn_map'
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

							<div id='Img_carousel' className='slider-pro'>
								<ImageGallery autoPlay={true} items={gallery} />
							</div>
							<hr />
							<div className='row'>
								<div className='col-lg-3'>
									<h3>Presentation</h3>
								</div>
								<div className='col-lg-9'>
									<h4>{trip?.city?.toUpperCase()} in love</h4>
									<p>{trip?.presentation}</p>
								</div>
							</div>
							<hr />
							<div className='row'>
								<div className='col-lg-3'>
									<h3>Description</h3>
								</div>
								<div className='col-lg-9'>
									<p>{trip?.description}</p>
									<div className='row'>
										<div className='col-md-6'>
											<h4>What's include</h4>
											<div className='ml-2'>
												<ul className='list_ok'>
													{trip?.includes?.map((item, i) => (
														<li key={i}>{item}</li>
													))}
												</ul>
											</div>
										</div>
										<div className='col-md-6'>
											<h4>What's exclude</h4>
											<div className='ml-2'>
												<ul className='list_ok_no'>
													{trip?.excludes?.map((item, i) => (
														<li key={i}>{item}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							<hr />

							<div className='row'>
								<div className='col-lg-3'>
									<h3>Schedule</h3>
								</div>
								<div className='col-lg-9'>
									<div className='table-responsive'>
										<table className='table table-striped'>
											<thead>
												<tr>
													<th colSpan='2'>1st March to 31st October</th>
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
														<span className='label label-danger'>Closed</span>
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
									<div className='table-responsive'>
										<table className='table table-striped'>
											<thead>
												<tr>
													<th colSpan='2'>1st November to 28th February</th>
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
														<span className='label label-danger'>Closed</span>
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

							<div className='row'>
								<div className='col-lg-3'>
									<h3>Reviews </h3>
									<a href='#' className='btn_1 add_bottom_30' data-toggle='modal' data-target='#myReview'>
										Leave a review
									</a>
								</div>
								<div className='col-lg-9'>
									<div id='general_rating'>
										11 Reviews
										<div className='rating'>
											<i className='icon-smile voted'></i>
											<i className='icon-smile voted'></i>
											<i className='icon-smile voted'></i>
											<i className='icon-smile'></i>
											<i className='icon-smile'></i>
										</div>
									</div>

									<div className='row' id='rating_summary'>
										<div className='col-md-6'>
											<ul>
												<li>
													Position
													<div className='rating'>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile'></i>
														<i className='icon-smile'></i>
													</div>
												</li>
												<li>
													Tourist guide
													<div className='rating'>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile'></i>
													</div>
												</li>
											</ul>
										</div>
										<div className='col-md-6'>
											<ul>
												<li>
													Price
													<div className='rating'>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile'></i>
														<i className='icon-smile'></i>
													</div>
												</li>
												<li>
													Quality
													<div className='rating'>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
														<i className='icon-smile voted'></i>
													</div>
												</li>
											</ul>
										</div>
									</div>

									<hr />

									<div className='review_strip_single last'>
										<img
											src={`${window.location.origin}/img/avatar2.jpg`}
											alt='Image'
											className='rounded-circle'
										/>
										<small> - 10 March 2015 -</small>
										<h4>Jhon Doe</h4>
										<p>
											"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a lorem quis neque
											interdum consequat ut sed sem. Duis quis tempor nunc. Interdum et malesuada fames ac
											ante ipsum primis in faucibus."
										</p>
										<div className='rating'>
											<i className='icon-smile voted'></i>
											<i className='icon-smile voted'></i>
											<i className='icon-smile voted'></i>
											<i className='icon-smile'></i>
											<i className='icon-smile'></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<aside className='col-lg-4'>
							{/* <p className='d-none d-xl-block d-lg-block d-xl-none'>
								<a
									className='btn_map'
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
							<BookingForm trip={trip} />
							<div className='box_style_4'>
								<i className='icon_set_1_icon-90'></i>
								<h4>
									<span>Book</span> by phone
								</h4>
								<a href='tel://004542344599' className='phone'>
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
