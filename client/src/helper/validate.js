import toast from "react-hot-toast";
import {authenticate} from "./helper"


//validate login page username
export async function usernameValidate(values){

    
    const errors = usernameVerify({}, values);

    if(values.username){
        //check user exist or not
        const {status} = await authenticate(values.username);

        if(status !== 200){
            errors.exist = toast.error("User does not exist")
        }
    }

    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

//validate profile page
export async function profileValidation(values){
    const errors = emailverify({}, values);
    return errors;
}

//validate reset password
export async function resetPasswordValidation(values){
    const errors = passwordValidate({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match ..!");
    }

    return errors;
}

//validate register form
export async function registerValidation(values){
    const error = usernameValidate({}, values);
    passwordValidate(error, values)
    emailverify(error, values)

    return error;
}

//validate password
function passwordVerify(errors = {}, values){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required");
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password ...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more then 4 character long .")
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character !");
    }

    return errors;
}


// validate username
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("username required");
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid username....!")
    }

    return error;
}

// validate email
function emailverify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email required ..!")
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[a-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}