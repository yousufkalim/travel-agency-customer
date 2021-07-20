import axios from 'axios';
import React, { Component } from 'react';

const api = axios.create({
	// baseURL: 'http://localhost:5000/api/v1',
	baseURL: 'http://api.crmviagens.com/api/v1',
});
export default class Register extends Component {
	constructor() {
		super();
		this.state = {
			fullName: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			fullName: this.state.fullName,
			email: this.state.email,
			phone: this.state.phone,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
		};

		if (newUser.password !== newUser.confirmPassword) {
			alert('Conform password do not match');
		} else {
			api.post('/auth/register/customer', newUser)
				.then((res) => {
					console.log(res);
				})
				.catch(({ response }) => {
					console.log(response.data.error);
					this.setState({ errors: { msg: response.data.error } });
				});
		}
	}
	render() {
		return (
			<section id='hero' class='login'>
				<div class='container'>
					<div class='row justify-content-center'>
						<div class='col-xl-4 col-lg-5 col-md-6 col-sm-8'>
							<div id='login'>
								<div class='text-center'>
									<img src='img/logo_sticky.png' alt='Image' data-retina='true' />
								</div>
								<hr />
								<form noValidate onSubmit={this.onSubmit}>
									<div class='form-group'>
										<label>Full Name</label>
										<input
											type='text'
											class='form-control'
											placeholder='Full Name'
											name='fullName'
											value={this.state.fullName}
											onChange={this.onChange}
										/>
									</div>
									<div class='form-group'>
										<label>Email</label>
										<input
											type='email'
											class=' form-control'
											placeholder='Email'
											name='email'
											value={this.state.email}
											onChange={this.onChange}
										/>
									</div>
									<div class='form-group'>
										<label>Phone</label>
										<input
											type='text'
											class=' form-control'
											placeholder='Phone'
											name='phone'
											value={this.state.phone}
											onChange={this.onChange}
										/>
									</div>
									<div class='form-group'>
										<label>Password</label>
										<input
											type='password'
											class=' form-control'
											id='password1'
											placeholder='Password'
											name='password'
											value={this.state.password}
											onChange={this.onChange}
										/>
									</div>
									<div class='form-group'>
										<label>Confirm password</label>
										<input
											type='password'
											class=' form-control'
											id='password2'
											placeholder='Confirm password'
											name='confirmPassword'
											value={this.state.confirmPassword}
											onChange={this.onChange}
										/>
									</div>
									<div id='pass-info' class='clearfix'></div>
									{this.state.errors && <p className='text-danger text-center'>{this.state.errors.msg}</p>}
									<button type='submit' class='btn_full'>
										Create an account
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
