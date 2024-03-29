import axios from "axios";
import {jwtDecode} from  "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

// to get username from token
export async function getUsername(){
    const token = localStorage.getItem("token");
    if(!token) return Promise.reject("cannot find token");

    let decode = jwtDecode(token);
    return decode;
}

// authenticate function
export async function authenticate(username){
    try{
        return await axios.post("/api/authenticate", {username})
    }catch(error){
        return {error: "Username doesnt exist..."}
    }
}

//get user details
export async function getUser({username}){
    try{
        const {data} = await axios.get(`/api/user/${username}`)

        return {data};
    }catch(err){
        return {error: "password doesnt match"}
    }
}

//register user function
export async function registerUser(credential){
    
    try{
        console.log(credential);
        const {data : {msg}, status} = await axios.post(`/api/register`, credential);
        console.log("test")
        console.log("status is");
        let {username, email} = credential;

        

        if(status === 201){
            await axios.post("/api/registerMail", {username, userEmail: email, text : msg})
        }

        return Promise.resolve(msg)

    }catch(err){
        return Promise.reject({err})
    }
}

// login function 
export async function verifyPassword({username, password}){
    try{
        if(username){
            const {data} = await axios.post('/api/login', {username, password})

            return Promise.resolve({data});
        }

    }catch(err){
        return Promise.reject({error: "Password doesnt match..."})
    }
}

//update user function
export async function updateUser(response){
    try{
        console.log(response);
        const token = localStorage.getItem("token");
        const data = await axios.put("/api/updateuser", response, {headers: {"Authorization": `Bearer ${token}`}});

        return Promise.resolve({data});
    }catch(err){
        return Promise.reject({error: "could't update Profile.."})
    }
}

//generate OTP
export async function generateOTP(username){
    try{
        const {data: {code}, status} = await axios.get('/api/generateOTP', {params: {username}});

        if(status === 201){
            let {data: {email}} = await getUser({username});

            let text = `your password recovery OTP is ${code}. Verify and recovery your password.`;
            await axios.post('/api/registerMail', {username, userEmail: email, text, subject: "Password recovery OTP"})
        }

        return Promise.resolve(code);
    }catch(err){
        return Promise.reject({err})
    }
}

// verify OTP

export async function verifyOTP({username, code}){

    console.log(code, "from verifyOTP");
    try{
        const {data, status} = await axios.get("/api/verifyOTP", {params: {username, code}})
        return {data, status}
    }catch(err){
        return Promise.reject(err)
    }
}

// reset password

export async function resetPassword({username, password}){
    try{
        const {data, status} = await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({data, status});
    }catch(error){
        return Promise.reject({error})
    }
}