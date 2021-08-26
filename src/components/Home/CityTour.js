import { Link } from 'react-router-dom';
import AddToWish from './Trip/AddToWish';
import Rating from './Trip/Rating';

export default function CityTour({ trip }) {
	return (
		<div class='container margin_60'>
			<div class='main_title'>
				<h2>
					Paris <span>Top</span> Tours
				</h2>
				<p>Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.</p>
			</div>

			<div class='row add_bottom_30'>
				{trip.map((trip) => (
					<div class='item col-md-4'>
						<div class='tour_container'>
							<div class='ribbon_3 popular'>
								<span>Popular</span>
							</div>
							<div class='img_container'>
								<a href={`/tour/${trip.city}/${trip._id}`}>
									<img
										src={`http://api.crmviagens.com/uploads/${trip.gallery[0]}`}
										class='img-fluid'
										alt='Trip Banner'
									/>
									<div class='badge_save'>
										Save<strong>20%</strong>
									</div>
									<div class='short_info'>
										<i class='icon_set_1_icon-44'></i>Historic Buildings
										<span class='price'>
											<sup>$</sup>
											{trip.adultPrice}
										</span>
									</div>
								</a>
							</div>
							<div class='tour_title'>
								<h3>
									<strong>{trip.name}</strong> tour
								</h3>
								<Rating value={4} count={50} />
								<AddToWish />
							</div>
						</div>
					</div>
				))}
			</div>

			<p class='text-center add_bottom_30'>
				<a href='all_tours_list.html' class='btn_1'>
					View all Tours
				</a>
			</p>
		</div>
	);
}
