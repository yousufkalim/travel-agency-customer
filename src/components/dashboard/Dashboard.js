function Dashboard() {
	return (
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

			<div class='margin_60 container' id='tabs' class='tabs' style={{ marginTop: '50px' }}>
				<nav>
					<ul class='nav nav-tabs' id='myTab' role='tablist'>
						<li class='nav-item'>
							<a id='home-tab' data-toggle='tab' href='#booking' role='tab' class='nav-link active icon-booking'>
								<span> Bookings</span>
							</a>
						</li>
						<li class='nav-item'>
							<a class='icon-wishlist nav-link' id='profile-tab' data-toggle='tab' href='#wishlist' role='tab'>
								<span> Wishlist</span>
							</a>
						</li>
						<li class='nav-item'>
							<a id='contact-tab' data-toggle='tab' href='#setting' role='tab' class='icon-settings nav-link'>
								<span> Settings</span>
							</a>
						</li>
						<li class='nav-item'>
							<a
								href='#section-4'
								class='icon-profile nav-link'
								id='contact-tab'
								data-toggle='tab'
								href='#profile'
								role='tab'
								aria-controls='contact'
								aria-selected='false'
							>
								<span> Profile</span>
							</a>
						</li>
					</ul>
				</nav>
				<div class='tab-content' id='myTabContent'>
					<div class='tab-pane fade show active' id='booking' role='tabpanel' aria-labelledby='home-tab'>
						<div className='content'>
							<section id='section-1'>
								<div id='tools'>
									<div class='row'>
										<div class='col-lg-2 col-md-3 col-6'>
											<div class='styled-select-filters'>
												<select name='sort_type' id='sort_type'>
													<option value='' selected>
														Sort by type
													</option>
													<option value='tours'>Tours</option>
													<option value='hotels'>Hotels</option>
													<option value='transfers'>Transfers</option>
												</select>
											</div>
										</div>
										<div class='col-lg-2 col-md-3 col-6'>
											<div class='styled-select-filters'>
												<select name='sort_date' id='sort_date'>
													<option value='' selected>
														Sort by date
													</option>
													<option value='oldest'>Oldest</option>
													<option value='recent'>Recent</option>
												</select>
											</div>
										</div>
									</div>
								</div>

								<div class='strip_booking'>
									<div class='row'>
										<div class='col-lg-2 col-md-2'>
											<div class='date'>
												<span class='month'>Dec</span>
												<span class='day'>
													<strong>23</strong>Sat
												</span>
											</div>
										</div>
										<div class='col-lg-6 col-md-5'>
											<h3 class='hotel_booking'>
												Hotel Mariott Paris<span>2 Adults / 2 Nights</span>
											</h3>
										</div>
										<div class='col-lg-2 col-md-3'>
											<ul class='info_booking'>
												<li>
													<strong>Booking id</strong> 23442
												</li>
												<li>
													<strong>Booked on</strong> Sat. 23 Dec. 2015
												</li>
											</ul>
										</div>
										<div class='col-lg-2 col-md-2'>
											<div class='booking_buttons'>
												<a href='#0' class='btn_2'>
													Edit
												</a>
												<a href='#0' class='btn_3'>
													Cancel
												</a>
											</div>
										</div>
									</div>
								</div>

								<div class='strip_booking'>
									<div class='row'>
										<div class='col-lg-2 col-md-2'>
											<div class='date'>
												<span class='month'>Dec</span>
												<span class='day'>
													<strong>27</strong>Fri
												</span>
											</div>
										</div>
										<div class='col-lg-6 col-md-5'>
											<h3 class='tours_booking'>
												Louvre Museum<span>2 Adults / 2 Childs</span>
											</h3>
										</div>
										<div class='col-lg-2 col-md-3'>
											<ul class='info_booking'>
												<li>
													<strong>Booking id</strong> 23442
												</li>
												<li>
													<strong>Booked on</strong> Sat. 20 Dec. 2015
												</li>
											</ul>
										</div>
										<div class='col-lg-2 col-md-2'>
											<div class='booking_buttons'>
												<a href='#0' class='btn_2'>
													Edit
												</a>
												<a href='#0' class='btn_3'>
													Cancel
												</a>
											</div>
										</div>
									</div>
								</div>

								<div class='strip_booking'>
									<div class='row'>
										<div class='col-lg-2 col-md-2'>
											<div class='date'>
												<span class='month'>Dec</span>
												<span class='day'>
													<strong>28</strong>Fri
												</span>
											</div>
										</div>
										<div class='col-lg-6 col-md-5'>
											<h3 class='tours_booking'>
												Tour Eiffel<span>2 Adults</span>
											</h3>
										</div>
										<div class='col-lg-2 col-md-3'>
											<ul class='info_booking'>
												<li>
													<strong>Booking id</strong> 23442
												</li>
												<li>
													<strong>Booked on</strong> Sat. 20 Dec. 2015
												</li>
											</ul>
										</div>
										<div class='col-lg-2 col-md-2'>
											<div class='booking_buttons'>
												<a href='#0' class='btn_2'>
													Edit
												</a>
												<a href='#0' class='btn_3'>
													Cancel
												</a>
											</div>
										</div>
									</div>
								</div>

								<div class='strip_booking'>
									<div class='row'>
										<div class='col-lg-2 col-md-2'>
											<div class='date'>
												<span class='month'>Dec</span>
												<span class='day'>
													<strong>30</strong>Fri
												</span>
											</div>
										</div>
										<div class='col-lg-6 col-md-5'>
											<h3 class='transfers_booking'>
												Orly Airport<span>2 Adults / 2Childs</span>
											</h3>
										</div>
										<div class='col-lg-2 col-md-3'>
											<ul class='info_booking'>
												<li>
													<strong>Booking id</strong> 23442
												</li>
												<li>
													<strong>Booked on</strong> Sat. 20 Dec. 2015
												</li>
											</ul>
										</div>
										<div class='col-lg-2 col-md-2'>
											<div class='booking_buttons'>
												<a href='#0' class='btn_2'>
													Edit
												</a>
												<a href='#0' class='btn_3'>
													Cancel
												</a>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
					<div class='tab-pane fade content' id='wishlist' role='tabpanel' aria-labelledby='profile-tab'>
						<section id='section-2'>
							<div class='row'>
								<div class='col-lg-4 col-md-6'>
									<div class='hotel_container'>
										<div class='img_container'>
											<a href='single_hotel.html'>
												<img src='img/hotel_1.jpg' width='800' height='533' class='img-fluid' alt='Image' />
												<div class='ribbon top_rated'></div>
												<div class='score'>
													<span>7.5</span>Good
												</div>
												<div class='short_info hotel'>
													From/Per night
													<span class='price'>
														<sup>$</sup>59
													</span>
												</div>
											</a>
										</div>
										<div class='hotel_title'>
											<h3>
												<strong>Park Hyatt</strong> Hotel
											</h3>
											<div class='rating'>
												<i class='icon-star voted'></i>
												<i class='icon-star voted'></i>
												<i class='icon-star voted'></i>
												<i class='icon-star voted'></i>
												<i class='icon-star-empty'></i>
											</div>

											<div class='wishlist_close_admin'>-</div>
										</div>
									</div>
								</div>

								<div class='col-lg-4 col-md-6 '>
									<div class='hotel_container'>
										<div class='img_container'>
											<a href='single_hotel.html'>
												<img src='img/hotel_2.jpg' width='800' height='533' class='img-fluid' alt='Image' />
												<div class='ribbon top_rated'></div>
												<div class='score'>
													<span>9.0</span>Superb
												</div>
												<div class='short_info hotel'>
													From/Per night
													<span class='price'>
														<sup>$</sup>45
													</span>
												</div>
											</a>
										</div>
										<div class='hotel_title'>
											<h3>
												<strong>Mariott</strong> Hotel
											</h3>
											<div class='rating'>
												<i class='icon-star voted'></i>
												<i class='icon-star voted'></i>
												<i class='icon-star voted'></i>
												<i class='icon-star voted'></i>
												<i class='icon-star-empty'></i>
											</div>

											<div class='wishlist_close_admin'>-</div>
										</div>
									</div>
								</div>

								<div class='col-lg-4 col-md-6'>
									<div class='tour_container'>
										<div class='img_container'>
											<a href='single_tour.html'>
												<img
													src='img/tour_box_1.jpg'
													width='800'
													height='533'
													class='img-fluid'
													alt='Image'
												/>
												<div class='ribbon top_rated'></div>
												<div class='short_info'>
													<i class='icon_set_1_icon-44'></i>Historic Buildings
													<span class='price'>
														<sup>$</sup>45
													</span>
												</div>
											</a>
										</div>
										<div class='tour_title'>
											<h3>
												<strong>Arc Triomphe</strong> tour
											</h3>
											<div class='rating'>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile'></i>
												<small>(75)</small>
											</div>

											<div class='wishlist_close_admin'>-</div>
										</div>
									</div>
								</div>

								<div class='col-lg-4 col-md-6'>
									<div class='tour_container'>
										<div class='img_container'>
											<a href='single_tour.html'>
												<img
													src='img/tour_box_3.jpg'
													width='800'
													height='533'
													class='img-fluid'
													alt='Image'
												/>
												<div class='ribbon popular'></div>
												<div class='short_info'>
													<i class='icon_set_1_icon-44'></i>Historic Buildings
													<span class='price'>
														<sup>$</sup>45
													</span>
												</div>
											</a>
										</div>
										<div class='tour_title'>
											<h3>
												<strong>Versailles</strong> tour
											</h3>
											<div class='rating'>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile'></i>
												<small>(75)</small>
											</div>

											<div class='wishlist_close_admin'>-</div>
										</div>
									</div>
								</div>

								<div class='col-lg-4 col-md-6'>
									<div class='tour_container'>
										<div class='img_container'>
											<a href='single_tour.html'>
												<img
													src='img/tour_box_4.jpg'
													width='800'
													height='533'
													class='img-fluid'
													alt='Image'
												/>
												<div class='ribbon popular'></div>
												<div class='short_info'>
													<i class='icon_set_1_icon-30'></i>Walking tour
													<span class='price'>
														<sup>$</sup>45
													</span>
												</div>
											</a>
										</div>
										<div class='tour_title'>
											<h3>
												<strong>Pompidue</strong> tour
											</h3>
											<div class='rating'>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile'></i>
												<small>(75)</small>
											</div>

											<div class='wishlist_close_admin'>-</div>
										</div>
									</div>
								</div>

								<div class='col-lg-4 col-md-6'>
									<div class='transfer_container'>
										<div class='img_container'>
											<a href='single_transfer.html'>
												<img
													src='img/transfer_1.jpg'
													width='800'
													height='533'
													class='img-fluid'
													alt='Image'
												/>
												<div class='ribbon top_rated'></div>
												<div class='short_info'>
													From/Per person
													<span class='price'>
														<sup>$</sup>45
													</span>
												</div>
											</a>
										</div>
										<div class='transfer_title'>
											<h3>
												<strong>Orly Airport</strong> private
											</h3>
											<div class='rating'>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile voted'></i>
												<i class='icon-smile'></i>
												<small>(75)</small>
											</div>

											<div class='wishlist_close_admin'>-</div>
										</div>
									</div>
								</div>
							</div>

							<button type='submit' class='btn_1 green'>
								Update wishlist
							</button>
						</section>
					</div>
					<div class='tab-pane fade content' id='setting' role='tabpanel' aria-labelledby='contact-tab'>
						<section id='section-3'>
							<div class='row'>
								<div class='col-md-6 add_bottom_30'>
									<h4>Change your password</h4>
									<div class='form-group'>
										<label>Old password</label>
										<input class='form-control' name='old_password' id='old_password' type='password' />
									</div>
									<div class='form-group'>
										<label>New password</label>
										<input class='form-control' name='new_password' id='new_password' type='password' />
									</div>
									<div class='form-group'>
										<label>Confirm new password</label>
										<input
											class='form-control'
											name='confirm_new_password'
											id='confirm_new_password'
											type='password'
										/>
									</div>
									<button type='submit' class='btn_1 green'>
										Update Password
									</button>
								</div>
								<div class='col-md-6 add_bottom_30'>
									<h4>Change your email</h4>
									<div class='form-group'>
										<label>Old email</label>
										<input class='form-control' name='old_password' id='old_password' type='password' />
									</div>
									<div class='form-group'>
										<label>New email</label>
										<input class='form-control' name='new_password' id='new_password' type='password' />
									</div>
									<div class='form-group'>
										<label>Confirm new email</label>
										<input
											class='form-control'
											name='confirm_new_password'
											id='confirm_new_password'
											type='password'
										/>
									</div>
									<button type='submit' class='btn_1 green'>
										Update Email
									</button>
								</div>
							</div>

							<hr />
							<br />
							<div class='row'>
								<div class='col-lg-6'>
									<h4>Notification settings</h4>
									<table class='table table-striped options_cart'>
										<tbody>
											<tr>
												<td style={{ width: '10%' }}>
													<i class='icon_set_1_icon-33'></i>
												</td>
												<td style={{ width: '60%' }}>New Citytours Tours</td>
												<td style={{ width: '35%' }}>
													<label class='switch-light switch-ios pull-right'>
														<input type='checkbox' name='option_1' id='option_1' checked value='' />
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
													<i class='icon_set_1_icon-6'></i>
												</td>
												<td>New Citytours Hotels</td>
												<td>
													<label class='switch-light switch-ios pull-right'>
														<input type='checkbox' name='option_2' id='option_2' value='' />
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
													<i class='icon_set_1_icon-26'></i>
												</td>
												<td>New Citytours Transfers</td>
												<td>
													<label class='switch-light switch-ios pull-right'>
														<input type='checkbox' name='option_3' id='option_3' value='' checked />
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
													<i class='icon_set_1_icon-81'></i>
												</td>
												<td>New Citytours special offers</td>
												<td>
													<label class='switch-light switch-ios pull-right'>
														<input type='checkbox' name='option_4' id='option_4' value='' />
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
									<button type='submit' class='btn_1 green'>
										Update notifications settings
									</button>
								</div>
							</div>
						</section>
					</div>
					<div class='tab-pane fade content' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
						<section id='section-4'>
							<div class='row'>
								<div class='col-md-6'>
									<h4>Your profile</h4>
									<ul id='profile_summary'>
										<li>
											Username <span>info@clara.com</span>
										</li>
										<li>
											First name <span>Clara</span>
										</li>
										<li>
											Last name <span>Tomson</span>
										</li>
										<li>
											Phone number <span>+00 032 42366</span>
										</li>
										<li>
											Date of birth <span>13/04/1975</span>
										</li>
										<li>
											Street address <span>24 Rue de Rivoli</span>
										</li>
										<li>
											Town/City <span>Paris</span>
										</li>
										<li>
											Zip code <span>002843</span>
										</li>
										<li>
											Country <span>France</span>
										</li>
									</ul>
								</div>
								<div class='col-md-6'>
									<p>
										<img src='img/tourist_guide_pic.jpg' alt='Image' class='img-fluid styled profile_pic' />
									</p>
								</div>
							</div>

							<div class='divider'></div>

							<div class='row'>
								<div class='col-md-12'>
									<h4>Edit profile</h4>
								</div>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>First name</label>
										<input class='form-control' name='first_name' id='first_name' type='text' />
									</div>
								</div>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>Last name</label>
										<input class='form-control' name='last_name' id='last_name' type='text' />
									</div>
								</div>
							</div>

							<div class='row'>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>Phone number</label>
										<input class='form-control' name='email_2' id='email_2' type='text' />
									</div>
								</div>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>
											Date of birth <small>(dd/mm/yyyy)</small>
										</label>
										<input class='form-control' name='email' id='email' type='text' />
									</div>
								</div>
							</div>

							<hr />
							<div class='row'>
								<div class='col-md-12'>
									<h4>Edit address</h4>
								</div>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>Street address</label>
										<input class='form-control' name='first_name' id='first_name' type='text' />
									</div>
								</div>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>City/Town</label>
										<input class='form-control' name='last_name' id='last_name' type='text' />
									</div>
								</div>
							</div>

							<div class='row'>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>Zip code</label>
										<input class='form-control' name='email' id='email' type='text' />
									</div>
								</div>
								<div class='col-md-6'>
									<div class='form-group'>
										<label>Country</label>
										<select id='country' class='form-control' name='country'>
											<option value=''>Select...</option>
										</select>
									</div>
								</div>

								<hr />
								<h4>Upload profile photo</h4>
								<div class='form-inline upload_1'>
									<div class='form-group'>
										<input type='file' name='files[]' id='js-upload-files' multiple />
									</div>
									<button type='submit' class='btn_1 green' id='js-upload-submit'>
										Upload file
									</button>
								</div>

								<hr />
								<button type='submit' class='btn_1 green'>
									Update Profile
								</button>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
