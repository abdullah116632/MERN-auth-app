import toast from "react-hot-toast";

//validate login page username
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

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
    }else if(values.username.includes("")){
        error.username = toast.error("Invalid username....!")
    }

    return error;
}