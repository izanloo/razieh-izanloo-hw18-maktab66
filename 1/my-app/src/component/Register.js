import React, { useState, useEffect } from 'react';
import { useFormik, Field } from 'formik';
import axios from 'axios';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 3) {
    errors.password = " password is short"
  }
  if (!values.tag || values.tag.length === 0) {
    errors.tag = 'Required';
  }
  if (!values.ostan || values.ostan.length === 0) {
    errors.ostan = 'Required';
  }
  return errors;
};

export default function Register() {
  let [dataApi, setDataApi] = useState("")

  const fetchData = () => {
    fetch('./iranstates.json')
      .then(res => res.json())
      .then(response => setDataApi(response))
  }
  useEffect(() => { fetchData() }, [])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tag: '',
      ostan: ''
    },
    validate,
    onSubmit: values => {
      const url = 'http://localhost:3001/users';
      axios.post(url, { 'email': values.email, 'password': values.password ,'firstName': values.firstName })
        .then(resp => { console.log("data user", resp.data); })
        .catch(error => { console.log("error", error) })
    },
  });

  return (
    <>
      <h3 className='text-center text-white py-3'>رایگان ثبت نام کنید</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-md-flex">
          <input
            id="firstName"
            name="firstName"
            type="text"
            className='w-100  w-md-50 p-1 '
            placeholder='نام'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            className='w-100 w-md-50 p-1 '
            placeholder='نام خانوادگی'
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </div>

        <input
          id="email"
          name="email"
          type="email"
          className='w-100 p-1 my-3 '
          placeholder="پست الکترونیک"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <input
          id="password"
          name="password"
          type="password"
          className='w-100 p-1 '
          placeholder="کلمه عبور"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <select onChange={formik.handleChange} name='tag' className="my-3 p1 w-100">
          <option value="" disabled selected> تحصیلات </option>
          <option value="1">دیپلم </option>
          <option value="2">لیسانس</option>
          <option value="3">فوق لیسانس </option>
          <option value="4">دکتری  </option>
        </select>
        {formik.touched.tag && formik.errors.tag ? (
          <div>{formik.errors.tag}</div>
        ) : null}
        {formik.values.tag === "1" || formik.values.tag === "" ? "" :
          <input type="text" className='w-100 p-1' placeholder='شهر محل تحصیل'></input>
        }
        <label>شهر محل سکونت</label>
        <select name='ostan' className='w-100 my-3' onChange={formik.handleChange}>
          <option >استان</option>
          {Object.keys(dataApi).map((item, i) => (
            <option key={i} >
              {item}
            </option>
          ))
          }
        </select>
        {formik.touched.ostan && formik.errors.ostan ? (
          <div>{formik.errors.ostan}</div>
        ) : null}
        <select className='w-100'>
          {dataApi[formik.values.ostan]?.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </select>
        <button type="submit" className='w-100 log text-white border-0 py-1 mt-3'>ثبت نام</button>
      </form>
    </>

  );
};