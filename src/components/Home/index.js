import { useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import About from './About';
import CityTour from './CityTour';
import Grid from './Grid';
import Hero from './Hero';
import LatestBlog from './LatestBlog';

import API from '../../services/api';

export default function Homepage() {
	const [trip, setTrip] = useState([]);

	useEffect(async () => {
		const res = await API.getAllTrip();
		const { data } = res.data;
		setTrip(data);
	}, []);

	return (
		<>
			<Hero />
			<Grid />

			<CityTour trip={trip} />

			<About />

			<LatestBlog />
		</>
	);
}
