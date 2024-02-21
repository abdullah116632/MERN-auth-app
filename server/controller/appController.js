import UserModel from "../model/user.model"

export async function register(req, res){
    try{
        const {username, password, profile, email} = req.body;

        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({username}, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({error: "please use unique username"})

                resolve();
            })
        })

        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({email}, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({error: "please use unique email"})

                resolve();
            })
        })

        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    
                }
            }).catch(error => {
                return res.status(500).send({
                    error: "Enable to hash password"
                })
            })
    }catch(error){
        return res.status(500).send(error)
    }
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