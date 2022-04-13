import React, { useState, useRef, useContext } from 'react'
import LogOut from './LogOut'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik } from 'formik';
import axios from 'axios';
import { valueContext } from './AuthenticationContext';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;


export default function Login({ data, database }) {
	const { userLogin, setUserlogin, isLogin, setIsLogin } = useContext(valueContext);
	const [show, setshow] = useState(false)
	const [erroPass,erropassword] = useState("")
	const [erroEmail,erroSetemail] = useState("")
	const pass = useRef();

	const showpassword = () => {
		setshow(!show)
		pass.current.type = show ? 'password' : 'text';
	}


	return (
		<>
			<Formik
				initialValues={{ email: data.email, password: data.password }}
				validate={values => {
					let errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address';
					}
					if (!values.password) {
						errors.password = 'Required';
					}
					else if (values.password.length < 3) {
						errors.password = "password is short"
					}
					return errors;
				}}

				onSubmit={values => {
					let errors = {};
					const url = 'http://localhost:3001/users';
					axios.get(url)
						.then(function (response) {
							// console.log(response.data)
							let userData = response.data.find((user) => user.email === values.email)
							if (userData) {
								if (userData.password !== values.password) {
									erropassword("پسورد وارد شده اشتباه است")
								} else {
									setUserlogin({ values, email: userData.email, password: userData.password, firstName: userData.firstName });
									setIsLogin(true);
									console.log("خوش اومدید")
								}
							} else {
								erroSetemail('ایمیل وارد شده  وجود ندارد')							}
						})
						.catch(function (error) {
							console.log(error);
						});
					return errors
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,

				}
				) => (
					<>

						<h3 className='text-center text-white py-3'>خوش آمدید</h3>
						<form onSubmit={handleSubmit}>
							<div className="field">
								<input
									type="email"
									name="email"
									className='w-100 p-1'
									placeholder="پست الکترونیک"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
							</div>
							<p className="error">
								{errors.email && touched.email && errors.email}
							</p>
							<p>{erroEmail}</p>
							<div className="field">
								<input
									type="password"
									name="password"
									ref={pass}
									placeholder="کلمه عبور"
									className='w-100 position-relative mt-4 p-1 mb-1'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								{show ? <i className='show-pass' onClick={showpassword}>{Eye}</i> : <i className='show-pass' onClick={showpassword}>{EyeSlash}</i>}
							</div>
							<p className="error">
								{errors.password && touched.password && errors.password}
							</p >
							<p>{erroPass}</p>
							<a href="#" >فراموش کردید؟</a>
							<button type="submit" disabled={isSubmitting} className='w-100 log text-white border-0 py-1 mt-1'>
								ورود
							</button>
						</form>
					</>
				)}
			</Formik>
			{isLogin ? <LogOut /> : ""}
		</>)
}