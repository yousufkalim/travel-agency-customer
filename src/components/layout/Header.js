import { Link } from 'react-router-dom';
import Topbar from './Topbar';

function Header() {
	return (
		<header style={{}}>
			<Topbar />
			<div className='container'>
				<div className='row'>
					<div className='col-3'>
						<div id='logo_home'>
							<h1>
								<Link to='/'>City Tours travel template</Link>
							</h1>
						</div>
					</div>
					<nav className='col-9'>
						<a className='cmn-toggle-switch cmn-toggle-switch__htx open_close' href='javascript:void(0);'>
							<span>Menu mobile</span>
						</a>
						<div className='main-menu'>
							<div id='header_menu'>
								<img src='img/logo_sticky.png' width='160' height='34' alt='City tours' data-retina='true' />
							</div>
							<a href='#' className='open_close' id='close_in'>
								<i className='icon_set_1_icon-77'></i>
							</a>
							<ul>
								<li>
									<Link to='/'>Home</Link>
								</li>

								<li className='submenu'>
									<a href='javascript:void(0);' className='show-submenu'>
										Tours <i className='icon-down-open-mini'></i>
									</a>
									<ul>
										<li>
											<a href='all_tours_list.html'>All tours list</a>
										</li>
										<li>
											<a href='all_tours_grid.html'>All tours grid</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<ul id='top_tools'>
							<li>
								<a href='javascript:void(0);' className='search-overlay-menu-btn'>
									<i className='icon_search'></i>
								</a>
							</li>
							<li>
								<div className='dropdown dropdown-cart'>
									<a href='#' data-toggle='dropdown' className='cart_bt'>
										<i className='icon_bag_alt'></i>
										<strong>3</strong>
									</a>
									<ul className='dropdown-menu' id='cart_items'>
										<li>
											<div className='image'>
												<img src='img/thumb_cart_1.jpg' alt='image' />
											</div>
											<strong>
												<a href='#'>Louvre museum</a>1x $36.00{' '}
											</strong>
											<a href='#' className='action'>
												<i className='icon-trash'></i>
											</a>
										</li>
										<li>
											<div className='image'>
												<img src='img/thumb_cart_2.jpg' alt='image' />
											</div>
											<strong>
												<a href='#'>Versailles tour</a>2x $36.00{' '}
											</strong>
											<a href='#' className='action'>
												<i className='icon-trash'></i>
											</a>
										</li>
										<li>
											<div className='image'>
												<img src='img/thumb_cart_3.jpg' alt='image' />
											</div>
											<strong>
												<a href='#'>Versailles tour</a>1x $36.00{' '}
											</strong>
											<a href='#' className='action'>
												<i className='icon-trash'></i>
											</a>
										</li>
										<li>
											<div>
												Total: <span>$120.00</span>
											</div>
											<a href='cart.html' className='button_drop'>
												Go to cart
											</a>
											<a href='payment.html' className='button_drop outline'>
												Check out
											</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
