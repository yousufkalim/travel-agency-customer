import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../auth';

import API from '../../services/api';

function ForgotPassword(props) {
	const [loading, setLoading] = useState(false);
	const [error, setErrror] = useState({ type: '', message: '' });
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (auth.isAuthenticated()) {
			props.history.push('/dashboard');
		}
	}, []);

	const onSubmitLoginForm = (e) => {
		e.preventDefault();

		if (!email) {
			setErrror({ type: 'danger', message: 'Please enter email to reset your password!' });
		} else {
			setLoading(true);
			API.forgotPassword({ email })
				.then((res) => {
					console.log(res);
					setErrror({
						type: 'success',
						message: 'Reset password link has been sent to your email. Please check email',
					});
					setEmail('');
					setLoading(false);
				})
				.catch(({ response }) => {
					console.log(response.data.error);
					setErrror({ type: 'danger', message: response.data.error });
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
								<img src={`${window.location.origin}/img/logo_sticky.png`} width='160' height='34' />
							</div>
							<hr />
							{error.message && <div className={`alert alert-${error.type} text-center`}>{error.message}</div>}
							<form noValidate onSubmit={onSubmitLoginForm}>
								<div class='form-group'>
									<label>Email</label>
									<input
										type='email'
										class=' form-control'
										placeholder='Enter your email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<button class='btn_full' type='submit' disabled={loading}>
									Forgot Password {loading && <i class='icon-spinner'></i>}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ForgotPassword;
