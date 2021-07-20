import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../auth';

const api = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
});
function Login(props) {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (auth.isAuthenticated()) {
			props.history.push('/dashboard');
		}
	}, []);
	const onChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const onSubmitLoginForm = (e) => {
		e.preventDefault();

		if (!input.email || !input.password) {
			alert('Please enter email and password!');
		} else {
			setLoading(true);
			api.post('/auth/login', input)
				.then((res) => {
					setLoading(false);
					const token = res.data.token;
					Cookies.set('AUTH-TOKEN', token, { expires: 30 });
					auth.login(() => props.history.push('/dashboard'));
				})
				.catch(({ response }) => {
					console.log(response);
					alert('Wrong email and password!');
					setLoading(false);
				});
		}
	};
	return (
		<section id='hero' class='login'>
			<div class='container'>
				<div class='row justify-content-center'>
					<div class='col-xl-4 col-lg-5 col-md-6 col-sm-8'>
						<div id='login'>
							<div class='text-center'>
								<img src='img/logo_sticky.png' alt='Logo' data-retina='true' />
							</div>
							<hr />
							<form onInvalid onSubmit={onSubmitLoginForm}>
								{/* <a href='#0' class='social_bt facebook'>
									Login with Facebook
								</a>
								<a href='#0' class='social_bt google'>
									Login with Google
								</a>
								<div class='divider'>
									<span>Or</span>
								</div> */}
								<div class='form-group'>
									<label>Email</label>
									<input
										type='email'
										class=' form-control '
										placeholder='Email'
										name='email'
										value={input.email}
										onChange={onChange}
									/>
								</div>
								<div class='form-group'>
									<label>Password</label>
									<input
										type='password'
										class=' form-control'
										placeholder='Password'
										name='password'
										value={input.password}
										onChange={onChange}
									/>
								</div>
								<p class='small'>
									<a href='#'>Forgot Password?</a>
								</p>

								<button class='btn_full' type='submit' disabled={loading}>
									Sign in {loading && <i class='icon-spinner'></i>}
								</button>
								<Link to='/auth/register' class='btn_full_outline'>
									Register
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
