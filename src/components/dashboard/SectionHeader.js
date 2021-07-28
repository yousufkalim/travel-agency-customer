import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
}

export default function SectionHeader() {
	const [user, setUser] = useState({});
	useEffect(() => {
		const token = Cookies.get('AUTH-TOKEN');
		if (token) {
			var user = parseJwt(token);
			setUser(user);
		}
	}, []);
	return (
		<section
			style={{
				background: `url(http://www.ansonika.com/citytours/img/slide_hero_2.jpg)`,
			}}
		>
			<div class='parallax-content-1'>
				<div class='animated fadeInDown'>
					<h1>Hello {user.fullName}!</h1>
					<p>Welcome to your dashboard</p>
				</div>
			</div>
		</section>
	);
}
