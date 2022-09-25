import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
	const emailInputRef = useRef()
	const passwordInputRed = useRef()
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false)

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault()

		const enteredEmail = emailInputRef.current.value
		const enteredPassword = passwordInputRed.current.value

		// optimal: Add validation
		setIsLoading(true)
		let url;
		if (isLogin) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBBMJ6o3AyqcZQm5Fz5vhc4rzvgqqklWz4';
		} else {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBBMJ6o3AyqcZQm5Fz5vhc4rzvgqqklWz4'
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					passsword: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
			).then(res => {
				setIsLoading(false)
				if (res.ok) {
					return res.json()
				} else {
					return res.json().then(data => {
						let errorMessage = 'Authenication failed!'
						// if (data && data.error && data.error.message) {
						// 	errorMessage = data.error.message
						// }
						throw new Error(errorMessage)
					})
				}
			}).then(data => {
				console.log(data);
			})
				.catch(err => {
					alert(err.Message)
				})
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input
						type='email'
						id='email'
						required
						ref={emailInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRed
						} />
				</div>
				<div className={classes.actions}>
					{!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
					{isLoading && <p>Sending request...</p>}
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
