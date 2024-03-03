import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import converToBase64 from "../helper/convert";
import useFetch from '../hooks/fetch.hook';
import { updateUser } from "../helper/helper";


import styles from "../styles/Username.module.css";
import extand from "../styles/Profile.module.css";

export default function Profile() {
  const [file, serFile] = useState();
  const [{isLoading, apiData, serverError}] = useFetch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address  || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || apiData?.profile || "" });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "updating...",
        success: <b>Update Success</b>,
        error: <b>Could not Update</b>
      })
      console.log(values);
    },
  });

  // formik doesnt support file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]);
    serFile(base64);
  };

  //logout handler function 
  function userlogOut(){
    localStorage.removeItem("token")
    navigate("/")
    
  }

  if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extand.glass}`}
          style={{ width: "45%", paddingTop: "2em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className={`${styles.profile_img} ${extand.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <div className="name flex w-3/4 gap-4">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  className={`${styles.textbox} ${extand.textbox}`}
                  placeholder="First name*"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  className={`${styles.textbox} ${extand.textbox}`}
                  placeholder="Last name*"
                />
              </div>
              <div className="name flex w-3/4 gap-4">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  className={`${styles.textbox} ${extand.textbox}`}
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  className={`${styles.textbox} ${extand.textbox}`}
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                type="text"
                className={`${styles.textbox} ${extand.textbox}`}
                placeholder="Address"
              />
              <button type="submit" className={styles.btn}>
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <Link className="text-red-500" to="/" onClick={userlogOut}>
                  {" "}
                  logout
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
