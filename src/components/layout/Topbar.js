import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';

import auth from '../../auth';

const Topbar = (props) => {
	const handleSingOut = () => {
		auth.logout(() => {
			Cookies.remove('AUTH-TOKEN');
			props.history.push('/auth/login');
		});
	};
	return (
		<div id='top_line'>
			<div class='container'>
				<div class='row'>
					<div class='col-6'>
						<i class='icon-phone'></i>
						<strong>0045 043204434</strong>
					</div>
					<div class='col-6'>
						<ul id='top_links'>
							<li>
								{auth.isAuthenticated() ? (
									<Link to='#' id='access_link' onClick={handleSingOut}>
										Sign Out
									</Link>
								) : (
									<Link to='/auth/login' id='access_link'>
										Sign in
									</Link>
								)}
							</li>
							{auth.isAuthenticated() && (
								<li>
									<Link to='/dashboard' id='access_link'>
										Account
									</Link>
								</li>
							)}
							<li>
								<Link to='/wishlist' id='wishlist_link'>
									Wishlist
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Topbar);
