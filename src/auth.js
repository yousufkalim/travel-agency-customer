import Cookies from 'js-cookie';

class Auth {
	constructor() {
		this.authenticated = false;
	}

	login(cb) {
		this.authenticated = true;
		cb();
	}

	logout(cb) {
		this.authenticated = false;
		Cookies.remove('AUTH-TOKEN');
		cb();
	}

	isAuthenticated() {
		var token = Cookies.get('AUTH-TOKEN');
		if (token && token !== undefined) {
			return (this.authenticated = true);
		} else {
			return this.authenticated;
		}
	}
}

export default new Auth();
