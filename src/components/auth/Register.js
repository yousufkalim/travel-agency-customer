import axios from 'axios';
import { Alert } from 'bootstrap';
import React, { Component } from 'react';

import API from '../../services/api';

export default class Register extends Component {
	constructor() {
		super();
		this.state = {
			fullName: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			errors: '',
			success: false,
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

		if (!newUser.fullName || !newUser.email || !newUser.phone || !newUser.password) {
			this.setState({ errors: 'All field are required!' });
		} else if (newUser.password !== newUser.confirmPassword) {
			this.setState({ errors: 'Password do not match' });
		} else {
			API.register(newUser)
				.then((res) => {
					console.log(res);
					this.setState({ success: true });
				})
				.catch(({ response }) => {
					console.log(response.data.error);
					this.setState({ errors: response.data.error });
				});
		}
	}
	render() {
		return (
			<section id='hero' className='login'>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-xl-4 col-lg-5 col-md-6 col-sm-8'>
							{this.state.success ? (
								<div id='login'>
									<h4>Your account has been created</h4>
									<p>Please check your email and verify your account</p>
								</div>
							) : (
								<div id='login'>
									<div className='text-center'>
										<img
											src={`${window.location.origin}/img/logo_sticky.png`}
											alt='Image'
											data-retina='true'
										/>
									</div>
									<hr />
									{this.state.errors && <div className='alert alert-danger'>{this.state.errors}</div>}
									<form noValidate onSubmit={this.onSubmit}>
										<div className='form-group'>
											<label>Full Name</label>
											<input
												type='text'
												className='form-control'
												placeholder='Full Name'
												name='fullName'
												value={this.state.fullName}
												onChange={this.onChange}
											/>
										</div>
										<div className='form-group'>
											<label>Email</label>
											<input
												type='email'
												className=' form-control'
												placeholder='Email'
												name='email'
												value={this.state.email}
												onChange={this.onChange}
											/>
										</div>
										<div className='form-group'>
											<label>Phone</label>
											<input
												type='text'
												className=' form-control'
												placeholder='Phone'
												name='phone'
												value={this.state.phone}
												onChange={this.onChange}
											/>
										</div>
										<div className='form-group'>
											<label>Password</label>
											<input
												type='password'
												className=' form-control'
												id='password1'
												placeholder='Password'
												name='password'
												value={this.state.password}
												onChange={this.onChange}
											/>
										</div>
										<div className='form-group'>
											<label>Confirm password</label>
											<input
												type='password'
												className=' form-control'
												id='password2'
												placeholder='Confirm password'
												name='confirmPassword'
												value={this.state.confirmPassword}
												onChange={this.onChange}
											/>
										</div>
										<div id='pass-info' className='clearfix'></div>
										{this.state.errors && <p className='text-danger text-center'>{this.state.errors.msg}</p>}
										<button type='submit' className='btn_full'>
											Create an account
										</button>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		);
	}
}
