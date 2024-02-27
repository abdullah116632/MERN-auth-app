import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import converToBase64 from '../helper/convert';

import styles from "../styles/Username.module.css";

export default function Register() {

  const [file, serFile] = useState();

    const formik = useFormik({
        initialValues : {
          email: "demos@gmail.com",
          username: "example123",
          password : ""
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
          values = await Object.assign(values, {profile: file || ""})
            console.log(values)
        }
    })

    // formik doesnt support file upload so we need to create this handler
    const onUpload = async (e) => {
      const base64 = await converToBase64(e.target.files[0]);
      serFile(base64);
    }

  return (
    <div className="container mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass} style={{width: "35%", height: "80%", paddingTop: "1em"}}>

                <div className="title flex flex-col items-center">
                    <h4 className="text-5xl font-bold">Register</h4>
                    <span className="py-2 text-xl w-2/3 text-center text-gray-500">
                        Happy to join you!
                    </span>
                </div>

                <form className="py-0.5" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                      <label htmlFor='profile'>
                      <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                      </label>
                        
                        <input onChange={onUpload} type="file" id="profile" name='profile'/>
                    </div>

                    <div className="textbox flex flex-col items-center gap-3">
                        <input {...formik.getFieldProps("email")} type='email' className={styles.textbox} placeholder='Email*' />
                        <input {...formik.getFieldProps("username")} type='text' className={styles.textbox} placeholder='Username*' />
                        <input {...formik.getFieldProps("password")} type='password' className={styles.textbox} placeholder='Password*' />
                        <button type='submit' className={styles.btn}>Sign In</button>
                    </div>

                    <div className="text-center py-1">
                        <span className="text-gray-500">Already Register? <Link className="text-red-500" to='/'> login now</Link> </span>
                    </div>
                </form>

            </div>
        </div>
    </div>
  );
}

