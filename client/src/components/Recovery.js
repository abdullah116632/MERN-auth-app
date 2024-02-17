import React from "react";
import { Toaster } from "react-hot-toast";


import styles from "../styles/Username.module.css";

export default function Recovery() {
  

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recovery password.
            </span>
          </div>

          <form className="py-20">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit otp sent to your email address.
                </span>
                <input
                  type="password"
                  className={styles.textbox}
                  placeholder="OTP"
                />
              </div>

              <button type="submit" className={styles.btn}>
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Acn't get OTP?
                <button className="text-red-500">
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
