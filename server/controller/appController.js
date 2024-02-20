

export async function register(req, res){

}

export async function login(req, res){
    res.json("get user")
}

export async function getUser(req, res){
    res.json("get user")
}

export async function updateUser(req, res){
    res.json("update user")
}

export async function generateOTP(req, res){
    // this is kind of get request
    res.json("generateOTP user")
}

export async function verifyOTP(req, res){
    //this is also get request
    res.json("get user")
}

export async function createResetSession(req, res){
    // this is also get request
    res.json("get user")
}

export async function resetPassword(req, res){
    // this is put request
    res.json("get user")
}