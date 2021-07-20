import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';

import Header from './components/layout/Header';
import Homepage from './components/Home';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard';
import SingleTour from './components/singleTour';
import ScrollToTop from './ScrollToTop';
import { ProtectedRoute } from './protectedRoute';

function App() {
	console.log(window.location.origin);

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Header />
			<main>
				<Switch>
					<Route path='/' component={Homepage} exact />
					<Route path='/auth/login' component={Login} />
					<Route path='/auth/register' component={Register} />
					<ProtectedRoute path='/dashboard' component={Dashboard} />
					<Route path='/tour/:city/:tripid' component={SingleTour} />
					<Footer />
				</Switch>
			</main>
		</BrowserRouter>
	);
}

export default App;
