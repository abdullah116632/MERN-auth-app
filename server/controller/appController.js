import dotenv from "dotenv";
dotenv.config();
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// middleware for verify user
export async function verifyUser(req, res, next){
  try{
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existence 
    let exist = await UserModel.findOne({username});

    if(!exist){
      return res.status(404).send({error: "cant find user!"})
    }

    next()

  }catch(error){
    return res.status(404).send({errror: "Authentication Error"})
  }
}

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    if (!username || !password || !email) {
      throw Error("please fill up all the field");
    }

    // Check if username already exists
    const existUsername = await UserModel.findOne({ username });
    if (existUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    // Check if email already exists
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserModel({
      username,
      password: hashPassword,
      profile: profile || "",
      email,
    });

    // Save the user to the database
    const result = await user.save();

    // Send success response
    return res.status(201).send({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message);
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt.compare(password, user.password).then((passwordCheck) => {
          if (!passwordCheck)
            return res.status(400).send({ error: "Wrong pssword" });

          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );

          return res.status(200).send({
            msg: "login successfull...!",
            username: user.username,
            token,
          });
        });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not fouund" });
      });
  } catch (err) {
    return res.status(500).send({ error });
  }
}

export async function getUser(req, res) {
  res.json("get user");
}

export async function updateUser(req, res) {
  res.json("update user");
}

export async function generateOTP(req, res) {
  // this is kind of get request
  res.json("generateOTP user");
}

export async function verifyOTP(req, res) {
  //this is also get request
  res.json("get user");
}

export async function createResetSession(req, res) {
  // this is also get request
  res.json("get user");
}

export async function resetPassword(req, res) {
  // this is put request
  res.json("get user");
}
