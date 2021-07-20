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
		var user = parseJwt(Cookies.get('AUTH-TOKEN'));
		setUser(user);
	});
	return (
		<section
			class='parallax-window'
			data-parallax='scroll'
			data-image-src='img/admin_top.jpg'
			data-natural-width='1400'
			data-natural-height='470'
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
