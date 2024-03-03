import dotenv from "dotenv";
dotenv.config();
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

// middleware for verify user
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    console.log(username);

    // check the user existence
    let exist = await UserModel.findOne({ username });

    if (!exist) {
      return res.status(404).send({ error: "cant find user!" });
    }

    next();
  } catch (error) {
    return res.status(404).send({ errror: "Authentication Error" });
  }
}

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    console.log(req.body);

    

    if (!username || !password || !email) {
      throw Error("please fill up all the field");
    }

    
    // Check if username already exists
    const existUsername = await UserModel.findOne({ username });
    console.log(existUsername);
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
    if (!password || !username) {
      return res
        .status(400)
        .send({ msg: "please inter username password both" });
    }
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
  const { username } = req.params;

  console.log(username);

  try {
    if (!username) return res.status(501).send({ error: "Invalid username" });

    const user = await UserModel.findOne({ username });

    if (!user) return res.status(501).send({ error: "cannot find the user" });

    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send(rest);
  } catch (error) {
    return res.status(404).send({ error: "cannot find user data" });
  }
}

export async function updateUser(req, res) {
  try {
    // const id = req.query.id;

    console.log(req.user);

    const id = req.user.userId;

    console.log(id);

    if (id) {
      const body = req.body;

      const updatedUser = await UserModel.updateOne({ _id: id }, body);

      return res.status(201).send({ msg: "Record updated...!" });
    }
  } catch (error) {
    return res.status(401).json({ error });
  }
}

export async function generateOTP(req, res) {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  }); //hare we are generating 6 degit otp
  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) { 
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: "verify successfully" });
  }

  return res.status(404).send({ error: "Invalid OTP" });
}

export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "access granted" });
  }

  return res.status(440).send({ error: "session expired" });
}

export async function resetPassword(req, res) {
  try {
    if(!req.app.locals.resetSession){
      return res.status(201).send({msg: "session expired"});
    }
    const { username, password } = req.body;

    if (!password) {
      return res.status(400).send({ error: "please Inter password" });
    }

    const user = await UserModel.findOne({ username });

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.updateOne(
      { username: user.username },
      { password: hashedPassword }
    );

    req.app.locals.resetSession = false;

    return res.status(201).send({ msg: "Record Updated" });

  } catch (error) {
    return res.status(401).send({ error });
  }
}
